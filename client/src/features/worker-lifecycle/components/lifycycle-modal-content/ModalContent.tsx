import MediumWrapper from '@/components/modal/modalSizes/MediumWrapper';
import { LifecycleType } from '@/features/task-management/types/index.types';
import { useState } from 'react';
import RadioSelect from './RadioSelect';
import { WorkerForm } from './WorkerForm';

type ModalProps = {
  toggleModal: () => void;
  className?: string;
};

const ModalContent = ({ toggleModal }: ModalProps) => {
  const [selectedOption, setSelectedOption] = useState<LifecycleType | null>(
    null
  );

  return (
    <MediumWrapper>
      <div className="h-full w-xl max-w-xl">
        {selectedOption === null ? (
          <RadioSelect
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        ) : (
          <WorkerForm
            setSelectedOption={setSelectedOption}
            type={selectedOption}
            toggleModal={toggleModal}
          />
        )}
      </div>
    </MediumWrapper>
  );
};

export default ModalContent;
