import { workerMutations } from '@/features/task-management/query-options/mutations/worker.mutations';
import { UpdatePayload } from '@/features/task-management/types/index.types';
import { DescriptionFieldResponse } from '@/types/api.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { WorkerInfoItem } from '../consts/worker-info.consts';
import {
  addWorkerBaseSchema,
  OffboardingValidation,
} from '../schemas/zod.schemas';
import ActiveField from './ActiveField';
import NonActiveField from './NonActiveField';

type WorkerInputProps = {
  item: WorkerInfoItem;
  idx: number;
  workerInfo: DescriptionFieldResponse | undefined;
  workerId: number;
  isInputActive: boolean | undefined;
  setIsInputActive: Dispatch<SetStateAction<boolean | undefined>>;
  uniqueInput: number | undefined;
  setUniqueInput: Dispatch<SetStateAction<number | undefined>>;
};

const WorkerInput = ({
  item,
  idx,
  workerInfo,
  workerId,
  isInputActive,
  setIsInputActive,
  uniqueInput,
  setUniqueInput,
}: WorkerInputProps) => {
  const [inputValue, setInputValue] = useState<string>();
  const key = item.schemaKey;
  const schema = useMemo(() => {
    if (!key) return undefined;

    return key === 'austrittsdatum'
      ? OffboardingValidation.pick({ [key]: true } as Record<
          'austrittsdatum',
          true
        >)
      : addWorkerBaseSchema.pick({ [key]: true } as Record<typeof key, true>);
  }, [key]);

  const {
    handleSubmit: handleFormSubmit,
    formState: { errors },
    setValue,
  } = useForm<Record<string, string>>({
    resolver: schema ? (zodResolver(schema) as never) : undefined,
    mode: 'onChange',
  });

  const { mutate, isPending, variables } = useMutation(
    workerMutations.updateDataPoint(workerId)
  );

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (!key) return;

    setValue(key, value, { shouldValidate: true, shouldDirty: true });
  };

  const handleSubmit = (_item: WorkerInfoItem) => {
    if (!workerInfo) return;
    if (!key) return;

    handleFormSubmit((data) => {
      mutate(data as UpdatePayload);
    })();
  };

  const errorMessage = key
    ? (errors[key]?.message as string | undefined)
    : undefined;

  return (
    <div className="w-full">
      {uniqueInput === idx && isInputActive && item.form ? (
        <ActiveField
          inputValue={inputValue}
          setIsInputActive={setIsInputActive}
          setInputValue={handleInputChange}
          handleSubmit={handleSubmit}
          item={item}
          variables={variables as UpdatePayload}
          isPending={isPending}
        />
      ) : (
        <NonActiveField
          item={item}
          setIsInputActive={setIsInputActive}
          setUniqueInput={setUniqueInput}
          setInputValue={setInputValue}
          isPending={isPending}
          variables={variables as UpdatePayload}
          idx={idx}
        />
      )}
      {errorMessage && (
        <span className="mt-1 block text-(--destructive)">{errorMessage}</span>
      )}
    </div>
  );
};

export default WorkerInput;
