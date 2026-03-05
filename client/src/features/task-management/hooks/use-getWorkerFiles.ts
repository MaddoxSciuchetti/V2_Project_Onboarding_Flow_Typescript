import { useQuery } from '@tanstack/react-query';
import { getWorkerFiles } from '../api/index.api';
import { File_Request } from '../types/index.types';

function useGetWorkerFiles(id: number) {
  const {
    data: fetchFiles,
    isLoading,
    isFetching,
  } = useQuery<File_Request[]>({
    queryKey: ['historyData', id],
    queryFn: () => getWorkerFiles(id),
  });

  return { fetchFiles, isLoading, isFetching };
}

export default useGetWorkerFiles;
