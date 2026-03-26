import { LifecycleType } from '@/features/task-management/types/index.types';
import { DescriptionFieldResponse } from '@/types/api.types';
import { Dispatch, SetStateAction } from 'react';
import { workerInfos } from '../consts/worker-info.consts';
import WorkerDescription from './WorkerDescription';
import WorkerInput from './WorkerInput';

type WorkerInfosProps = {
  workerInfo: DescriptionFieldResponse;
  lifecycleType: LifecycleType;
  workerId: number;
  isInputActive: boolean | undefined;
  setIsInputActive: Dispatch<SetStateAction<boolean | undefined>>;
  uniqueInput: number | undefined;
  setUniqueInput: Dispatch<SetStateAction<number | undefined>>;
};

const WorkerInfos = ({
  workerInfo,
  lifecycleType,
  workerId,
  isInputActive,
  setIsInputActive,
  uniqueInput,
  setUniqueInput,
}: WorkerInfosProps) => {
  const workers = workerInfos(workerInfo).filter(
    (value) =>
      !(lifecycleType === 'Onboarding' && value.schemaKey === 'austrittsdatum')
  );
  return (
    <>
      <div className="w-full">
        {workers.map((item, idx) => (
          <div key={`${item.label}-${idx}`}>
            <div className="group flex items-center justify-between gap-4 py-3.5">
              <WorkerDescription item={item} />
              <div className="w-96 shrink-0">
                <WorkerInput
                  item={item}
                  idx={idx}
                  workerId={workerId}
                  isInputActive={isInputActive}
                  setIsInputActive={setIsInputActive}
                  uniqueInput={uniqueInput}
                  setUniqueInput={setUniqueInput}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WorkerInfos;
