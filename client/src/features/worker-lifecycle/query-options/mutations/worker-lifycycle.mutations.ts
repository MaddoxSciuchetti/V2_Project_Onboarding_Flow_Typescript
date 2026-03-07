import queryClient from '@/config/query.client';
import { mutationOptions } from '@tanstack/react-query';
import { deleteWorkerById } from '../../api';
import { ALL_WORKER_DATA } from '../../consts/query-key.consts';
import { DeleteUser } from '../../types/index.types';

export const workerLifecycleMutations = {
  deleteWorker: () => {
    return mutationOptions<DeleteUser, Error, number>({
      mutationFn: deleteWorkerById,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [ALL_WORKER_DATA] });
      },
    });
  },
};
