import queryClient from '@/config/query.client';
import { mutationOptions } from '@tanstack/react-query';
import { createTask } from '../../api/tasks.api';
import { FETCHDESCRIPTION } from '../../consts/query.consts';

export const taskMutations = {
  createTask: () =>
    mutationOptions<unknown, Error, unknown>({
      mutationFn: (payload: unknown) => createTask(payload),
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: [FETCHDESCRIPTION] });
      },
    }),
};
