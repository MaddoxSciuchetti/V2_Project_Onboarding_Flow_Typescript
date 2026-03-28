import { getWorkerById } from '@/features/task-management/api/index.api';
import { LifecycleType } from '@/features/task-management/types/index.types';
import { DescriptionFieldResponse } from '@/types/api.types';
import { queryOptions } from '@tanstack/react-query';
import { getWorkerData } from '../../api';
import { ALL_WORKER_DATA } from '../../consts/query-key.consts';
import { WorkerRecord, WorkerRecordMode } from '../../types/index.types';

export const workerLifecycleQueries = {
  workerData: (mode: WorkerRecordMode = 'active') => {
    return queryOptions<WorkerRecord[]>({
      queryKey: [ALL_WORKER_DATA, mode],
      queryFn: () => getWorkerData(mode),
    });
  },
  workerById: (workerId: string, lifecycleType: LifecycleType) => {
    return queryOptions<DescriptionFieldResponse>({
      queryKey: [ALL_WORKER_DATA, 'detail', workerId, lifecycleType],
      queryFn: () => getWorkerById(workerId, lifecycleType),
    });
  },
};
