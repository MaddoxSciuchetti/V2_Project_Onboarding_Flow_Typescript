import queryClient from '@/config/query.client';
import { TASKHISTORY } from '@/features/worker-task-management/consts/query-key.consts';
import { mutationOptions } from '@tanstack/react-query';
import {
  createTask,
  deleteTasks,
  updateTask,
  type UpdateTaskParams,
} from '../../api/tasks.api';
import { FETCHDESCRIPTION } from '../../consts/query.consts';

export const taskMutations = {
  createTask: () =>
    mutationOptions<unknown, Error, unknown>({
      mutationFn: (payload: unknown) => createTask(payload),
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: [FETCHDESCRIPTION] });
      },
    }),

  updateTask: () =>
    mutationOptions<unknown, Error, UpdateTaskParams>({
      mutationFn: ({ taskId, data }) => updateTask({ taskId, data }),
      onSuccess: (_, { taskId }) => {
        void queryClient.invalidateQueries({ queryKey: [FETCHDESCRIPTION] });
        void queryClient.invalidateQueries({
          queryKey: [TASKHISTORY, taskId],
        });
      },
    }),

  deleteTasks: () =>
    mutationOptions<unknown, Error, string[]>({
      mutationFn: (ids: string[]) => deleteTasks(ids),
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: [FETCHDESCRIPTION] });
      },
    }),
};
