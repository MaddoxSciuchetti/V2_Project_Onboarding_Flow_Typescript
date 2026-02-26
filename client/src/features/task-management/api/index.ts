import API from '@/config/apiClient';
import { api_Response, insertHistoryDataType } from '../types/index.type';
import { User } from 'shared_prisma_types';
import { SuccessResponse } from '@/types/api';
import { Mappingform } from '@/types/form-data';

export const formattedData = async (
  id: number,
  param: string
): Promise<api_Response> => {
  const response = await API.get<api_Response, api_Response>(
    `offboarding/user/${id}?param1=${param}`
  );
  return response;
};

export const insertHistoryData = async (
  result: insertHistoryDataType,
  user: User
) => {
  console.log('testing');
  console.log(result, user);
  const response = await API.post(`offboarding/editHisoryData`, {
    result,
    user,
  });
  return response;
};

export const editData = async (formData: Mappingform) => {
  const response = await API.put<SuccessResponse, SuccessResponse>(
    'offboarding/editdata',
    formData
  );

  return response;
};
