import API from '@/config/apiClient';
import { CreateWorker } from '@/features/worker-lifecycle/schemas/zod.schemas';
import { WorkerRecord, WorkerRecordMode } from '../types/index.types';

type WorkerRecordResponse = {
  success: boolean;
  data: WorkerRecord[];
};

export const getWorkerData = async (
  _mode: WorkerRecordMode = 'active'
): Promise<WorkerRecord[]> => {
  const response = await API.get<WorkerRecordResponse, WorkerRecordResponse>(
    `/worker`
  );
  return response.data;
};

export const archiveWorkerById = async (
  taskId: string
): Promise<WorkerRecord> => {
  return API.put<unknown, WorkerRecord>(`/worker/archiveWorker/${taskId}`, {});
};

export const unarchiveWorkerById = async (
  taskId: string
): Promise<WorkerRecord> => {
  return API.put<unknown, WorkerRecord>(
    `/worker/unarchiveWorker/${taskId}`,
    {}
  );
};

export const deleteWorkerById = async (
  taskId: string
): Promise<WorkerRecord> => {
  const response = await API.delete<WorkerRecord, WorkerRecord>(
    `/worker/deleteWorker/${taskId}`
  );
  return response;
};

export const addWorker = async (data: CreateWorker): Promise<WorkerRecord> => {
  const response = await API.post<WorkerRecord, WorkerRecord>('/worker', data);
  return response;
};
