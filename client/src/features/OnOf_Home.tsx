import SearchHeader from '@/components/SearchHeader';
import HandwerkerTable from '@/components/HandwerkerTable';
import useAuth from '@/hooks/useAuth';
import HomeModal from '@/components/home/HomeModal';
import useHome from '@/hooks/use-home';
import IsLoading from '@/components/alerts/IsLoading';
import IsError from '@/components/alerts/IsError';
import IsSuccess from '@/components/alerts/IsSuccess';

function OnOf_Home() {
  const { user, isLoading, isError } = useAuth();
  const {
    isEmpty,
    deleteTaskMutation,
    error,
    filtered,
    handleNavigate,
    modal,
    createEmployeeMutation,
    search,
    setSearch,
    toggleModal,
  } = useHome();

  if (isLoading) {
    return <IsLoading />;
  }

  if (isError || !user) {
    return <IsError />;
  }

  if (error) return <IsError message={error.message} />;
  if (isEmpty) return <IsSuccess />;

  return (
    <div className="rounded-2xl overflow-x-auto w-full h-full p-6 shadow-gray-200 shadow-lg overflow-auto">
      <SearchHeader
        toggleModal={toggleModal}
        search={search}
        setSearch={setSearch}
      />
      <HandwerkerTable
        filtered={filtered}
        onRemove={deleteTaskMutation.mutate}
        gotopage={handleNavigate}
      />
      <HomeModal
        modal={modal}
        toggleModal={toggleModal}
        createEmployeeMutation={createEmployeeMutation}
      />
    </div>
  );
}

export default OnOf_Home;
