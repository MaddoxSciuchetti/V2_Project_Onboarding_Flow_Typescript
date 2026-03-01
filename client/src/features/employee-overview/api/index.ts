import API from '@/config/apiClient';
import { user } from '@/lib/api';
import { TEmployeeResponse, ZEmployeeData } from '../schemas/schema';

export const deleteEmployeeHandler = async (id: string): Promise<user> => {
  console.log('id in api', id);
  const response = await API.delete<typeof id, user>(
    `/user/deleteEmplyoee/${id}`
  );
  return response;
};

export const specificEmployeeData = async (): Promise<TEmployeeResponse> => {
  const response = await API.get(`/user/specificEmployeeData`);
  console.log(response);
  return ZEmployeeData.parse(response);
};
