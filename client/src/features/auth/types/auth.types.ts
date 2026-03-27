import { User } from '@/features/user-profile/types/auth.type';
import { CreateAccountParams } from '../../../../../server/src/services/auth.serviceV2';

export type CreateAccountResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type LoginRequest = Omit<
  CreateAccountParams,
  'confirmPassword' | 'firstName' | 'lastName'
>;

export type LoginResponse = Omit<CreateAccountResponse, 'user'>;

export type Verify = {
  code: string;
};

export type ResetPassword = {
  verificationCode: string;
  password: string;
};
