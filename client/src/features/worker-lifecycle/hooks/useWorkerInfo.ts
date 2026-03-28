import { LifecycleType } from '@/features/task-management/types/index.types';
import { useQuery } from '@tanstack/react-query';
import { workerLifecycleQueries } from '../query-options/queries/worker-lifycycle.queries';

function useWorkerInfo(
  isOpen: boolean,
  workerId: string,
  lifecycleType: LifecycleType
) {
  const {
    data: workerInfo,
    isLoading,
    isError,
  } = useQuery({
    ...workerLifecycleQueries.workerById(workerId, lifecycleType),
    enabled: isOpen,
  });

  return {
    workerInfo,
    isLoading,
    isError,
  };
}

export default useWorkerInfo;
