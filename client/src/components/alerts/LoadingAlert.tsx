import { Spinner } from '../ui/spinner';

const LoadingAlert = () => {
  return (
    <>
      <div className="flex justify-center items-center ">
        <Spinner className="w-8" />
      </div>
    </>
  );
};

export default LoadingAlert;
