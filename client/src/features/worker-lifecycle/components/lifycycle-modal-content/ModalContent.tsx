import { cn } from '@/lib/trycatch';
import { useState } from 'react';
import { FormType } from '../../types/index.types';
import { AddWorkerMutation } from '../../types/mutation.types';
import RadioSelect from './RadioSelect';
import { WorkerForm } from './WorkerForm';

type ModalProps = {
  toggleModal: () => void;
  addWorkerMutation: AddWorkerMutation;
  className?: string;
};

const ModalContent = ({
  addWorkerMutation,
  className,
  toggleModal,
}: ModalProps) => {
  const [selectedOption, setSelectedOption] = useState<FormType | null>(null);

  return (
    <div
      className={cn(
        'flex flex-col max-h-100 min-h-120 mt-40 mx-auto text-center items-center z-50 bg-muted rounded-xl  w-2xl',
        className
      )}
    >
      <div className="max-w-xl h-full w-xl my-10">
        {selectedOption === null ? (
          <RadioSelect
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        ) : (
          <WorkerForm
            setSelectedOption={setSelectedOption}
            type={selectedOption}
            success={addWorkerMutation}
            toggleModal={toggleModal}
          />
        )}
      </div>
    </div>
  );
};

export default ModalContent;
