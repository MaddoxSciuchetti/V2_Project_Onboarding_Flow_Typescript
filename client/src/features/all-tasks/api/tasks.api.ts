import API from '@/config/apiClient';
import { IssueResponse } from '../types/index.types';

export const getTasks = async (): Promise<IssueResponse[]> => {
  return API.get(`/tasks/`);
};
