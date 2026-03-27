import API from '@/config/apiClient';

import { Session_API, SuccessResponse } from '@/types/api.types';

import { User } from '@/features/user-profile/types/auth.type';
import { CreateAccountParams } from '../../../../../server/src/services/auth.serviceV2';
import {
  CreateAccountResponse,
  LoginRequest,
  LoginResponse,
  TresetPassword,
  Verify,
} from '../types/auth.types';

export const signup = async (
  data: CreateAccountParams
): Promise<CreateAccountResponse> => {
  return API.post<CreateAccountParams, CreateAccountResponse>(
    '/auth/v2/register',
    data
  );
};
export const sendPasswordResetEmail = async (
  email: string
): Promise<SuccessResponse<string>> =>
  API.post('/auth/v2/password/forgot', { email });

export const getUser = async (): Promise<User> => {
  return API.get<User, User>('/user');
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  return API.post<LoginRequest, LoginResponse>('/auth/v2/login', data);
};

export const verifyEmail = async (
  verificationCode: Verify
): Promise<string> => {
  return API.get<Verify, string>(
    `/auth/v2/email/verify/${verificationCode.code}`
  );
};

export const getSessions = async (): Promise<Session_API> =>
  API.get('/sessions');
export const deleteSession = async (id: string): Promise<void> =>
  API.delete(`/sessions/${id}`);

export const resetPassword = async ({
  verificationCode,
  password,
}: TresetPassword): Promise<TresetPassword> =>
  API.post('/auth/v2/password/reset', { verificationCode, password });
