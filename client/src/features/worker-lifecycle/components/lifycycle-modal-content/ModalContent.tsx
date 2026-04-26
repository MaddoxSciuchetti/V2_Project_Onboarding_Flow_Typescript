import { AddWorker } from '@/features/worker-lifecycle/schemas/zod.schemas';
import { useState } from 'react';
import RadioSelect from './RadioSelect';
import { WorkerForm } from './WorkerForm';

type ModalContentProps = {
  toggleModal?: () => void;
};

const ModalContent = ({ toggleModal }: ModalContentProps) => {
  const [selectedOption, setSelectedOption] = useState<
    AddWorker['type'] | null
  >(null);

  if (selectedOption === null) {
    return (
      <RadioSelect
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption as never}
      />
    );
  }

  return (
    <WorkerForm
      setSelectedOption={setSelectedOption}
      type={selectedOption}
      toggleModal={toggleModal ?? (() => {})}
    />
  );
};

export default ModalContent;
