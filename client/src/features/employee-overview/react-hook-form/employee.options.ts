import { zodResolver } from '@hookform/resolvers/zod';
import { UseFormProps } from 'react-hook-form';
import { CreateWorker, createWorkerSchema } from '../schemas/schema';

export const employeeFormOptions = {
  createEmployee: {
    resolver: zodResolver(createWorkerSchema),
    criteriaMode: 'all',
  } satisfies UseFormProps<CreateWorker>,
};
