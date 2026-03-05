import queryClient from '@/config/query.client';
import { SuccessResponse } from '@/types/api.types';
import { mutationOptions } from '@tanstack/react-query';
import { deleteWorkerFile } from '../../api/index.api';
import { File_Request } from '../../types/index.types';

export const workerMutations = {
  deleteWorker: (id: number) => {
    return mutationOptions<Pick<SuccessResponse, 'success'>, Error, number>({
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
  },
};
