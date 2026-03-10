import SmallWrapper from '@/components/modal/modalSizes/SmallWrapper';

type ViewEmployeeModalProps = {
  toggleModal: () => void;
};

const ViewEmployeeModal = ({ toggleModal }: ViewEmployeeModalProps) => {
  return (
    <>
      <SmallWrapper className="items-stretch justify-start overflow-hidden ">
        <p>test</p>
      </SmallWrapper>
    </>
  );
};

export default ViewEmployeeModal;
