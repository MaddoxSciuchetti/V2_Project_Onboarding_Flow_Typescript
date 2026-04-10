import API from '@/config/apiClient';
import { CreateWorker } from '@/features/employee-overview/schemas/schema';
import { WorkerRecord } from '../types/index.types';

type WorkerRecordResponse = {
  success: boolean;
  data: WorkerRecord[];
};

export const getWorkerData = async (): Promise<WorkerRecord[]> => {
  const response = await API.get<WorkerRecordResponse, WorkerRecordResponse>(
    `/worker`,
    { params: { includeArchived: true } }
  );
  return response.data;
};

export const archiveWorkerById = async (workerId: string): Promise<void> => {
  await API.patch(`worker/${workerId}/archive`, {});
};

export const unarchiveWorkerById = async (workerId: string): Promise<void> => {
  await API.patch(`worker/${workerId}/unarchive`, {});
};

export const deleteWorkerById = async (workerId: string): Promise<void> => {
  await API.delete(`worker/${workerId}`);
};

export const addWorker = async (data: CreateWorker): Promise<WorkerRecord> => {
  const response = await API.post<WorkerRecord, WorkerRecord>('/worker', data);
  return response;
};
