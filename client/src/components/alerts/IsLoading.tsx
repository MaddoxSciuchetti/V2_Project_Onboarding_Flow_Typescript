import { Spinner } from '../ui/spinner';

const IsLoading = () => {
  return (
    <>
      <div className="outline h-svh w-screen">
        <div className="flex outline">
          <Spinner className="w-8" />
        </div>
      </div>
    </>
  );
};

export default IsLoading;
