import { z } from 'zod';
import { WorkerInfoItem } from '../consts/worker-info.consts';
import {
  workerBaseSchema,
  workerOffboardingSchema,
} from '../schemas/zod.schemas';

type WorkerFieldKey = NonNullable<WorkerInfoItem['schemaKey']>;
export type WorkerFieldSchema = z.ZodType<
  Record<string, unknown>,
  Record<string, unknown>
>;

export const getWorkerFieldSchema = (
  key: WorkerFieldKey
): WorkerFieldSchema => {
  return key === 'exitDate'
    ? (workerOffboardingSchema.pick({ [key]: true } as Record<
        'exitDate',
        true
      >) as WorkerFieldSchema)
    : (workerBaseSchema.pick({ [key]: true } as Record<
        typeof key,
        true
      >) as WorkerFieldSchema);
};
