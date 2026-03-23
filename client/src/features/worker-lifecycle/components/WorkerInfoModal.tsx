import ModalOverlay from '@/components/modal/ModalOverlay';
import MediumWrapper from '@/components/modal/modalSizes/MediumWrapper';
import { Check, X } from 'lucide-react';
import { MouseEvent, useState } from 'react';
import { workerInfos } from '../consts/worker-info.consts';
import useWorkerInfo from '../hooks/useWorkerInfo';
import { FormType } from '../types/index.types';
import WorkerInfoHeader from './WorkerInfoHeader';

type WorkerInfoModalProps = {
  isOpen: boolean;
  workerId: number;
  lifecycleType: FormType;
  onClose: () => void;
};

const WorkerInfoModal = ({
  isOpen,
  workerId,
  lifecycleType,
  onClose,
}: WorkerInfoModalProps) => {
  const { isError, isLoading, workerInfo } = useWorkerInfo(
    isOpen,
    workerId,
    lifecycleType
  );

  const [uniqueInput, setUniqueInput] = useState<number>();
  const [inputState, setInputState] = useState<boolean>();
  const [inputValue, setInputValue] = useState<string>();

  const handleSubmit = (label: string) => {
    if (!workerInfo || !inputValue) return;
    const item = workerInfos(workerInfo).filter(
      (value) => value.label === label
    );
    console.log(item);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay size={'max-w-2xl'} handleToggle={onClose}>
      <MediumWrapper>
        <div
          className="flex w-full flex-col gap-3 text-left"
          onClick={() => setInputState(false)}
        >
          <WorkerInfoHeader isLoading={isLoading} isError={isError} />
          {workerInfo ? (
            <div className="grid grid-cols-2 gap-2 text-md ">
              {workerInfos(workerInfo).map((item, idx) => (
                <>
                  <span
                    key={`${item.label}-label`}
                    className={item.className ?? 'text-muted-foreground'}
                  >
                    {item.label}
                  </span>
                  {uniqueInput === idx && inputState ? (
                    <span className="flex">
                      <input
                        placeholder={`${item.value}`}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className=""
                        onClick={(e: MouseEvent<HTMLInputElement>) =>
                          e.stopPropagation()
                        }
                      />
                      <X
                        className="cursor-pointer"
                        onClick={() => setInputState(false)}
                      />
                      <Check
                        className="cursor-pointer"
                        onClick={() => handleSubmit(item.label)}
                      />
                    </span>
                  ) : (
                    <span
                      className="truncate"
                      key={`${item.label}-value`}
                      onClick={(e: MouseEvent<HTMLSpanElement>) => {
                        e.stopPropagation();
                        setInputState(true);
                        setUniqueInput(idx);
                      }}
                    >
                      {item.value ?? '-'}
                    </span>
                  )}
                </>
              ))}
            </div>
          ) : null}
        </div>
      </MediumWrapper>
    </ModalOverlay>
  );
};

export default WorkerInfoModal;
