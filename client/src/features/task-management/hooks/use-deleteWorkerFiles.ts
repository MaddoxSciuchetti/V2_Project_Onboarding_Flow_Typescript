import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteWorkerFile } from '../api/index.api';
import { File_Request } from '../types/index.types';

function useDeleteWorkerFiles(id: number) {
  const queryClient = useQueryClient();
  const { mutate: deleteFiles } = useMutation({
    mutationFn: (fileId: number) => deleteWorkerFile(fileId),
    onMutate: async (fileId) => {
      await queryClient.cancelQueries({ queryKey: ['historyData', id] });

      queryClient.setQueryData<File_Request[]>(
        ['historyData', id],
        (old) => old?.filter((file) => file.id !== fileId) || []
      );
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['historyData', id] });
      console.log('this is the invalidation number');
    },
  });

  return { deleteFiles };
}
export default useDeleteWorkerFiles;
