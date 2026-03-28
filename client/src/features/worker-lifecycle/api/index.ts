import API from '@/config/apiClient';
import { AddWorker } from '@/features/worker-lifecycle/schemas/zod.schemas';
import {
  DeleteUser,
  ItemUser,
  WorkerRecord,
  WorkerRecordMode,
} from '../types/index.types';

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

export const archiveWorkerById = async (taskId: string): Promise<ItemUser> => {
  return API.put<unknown, ItemUser>(`/worker/archiveWorker/${taskId}`, {});
};

export const unarchiveWorkerById = async (
  taskId: string
): Promise<ItemUser> => {
  return API.put<unknown, ItemUser>(`/worker/unarchiveWorker/${taskId}`, {});
};

export const deleteWorkerById = async (taskId: string): Promise<DeleteUser> => {
  const response = await API.delete<DeleteUser, DeleteUser>(
    `/worker/deleteWorker/${taskId}`
  );
  return response;
};

export const addWorker = async (data: AddWorker): Promise<ItemUser> => {
  const response = await API.post<ItemUser, ItemUser>('/worker/addWorker', {
    data,
  });
  return response;
};
