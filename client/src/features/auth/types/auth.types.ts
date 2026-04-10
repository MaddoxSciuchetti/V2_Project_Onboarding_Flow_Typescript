import { User } from '@/features/user-profile/types/auth.type';

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userAgent?: string;
};

export type RegisterResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type RegisterOrgRequest = RegisterRequest & {
  orgName: string;
  orgDescription?: string;
  orgEmail?: string;
  orgPhoneNumber?: string;
  orgWebsiteUrl?: string;
  orgCountry?: string;
  orgIndustry?: string;
  orgSize?: '1-10' | '11-50' | '51-200' | '201-500' | '500+';
  ipAddress?: string;
};

export type RegisterOrgResponse = {
  user: User;
  organization: {
    id: string;
    name: string;
    slug: string;
  };
};

export type LoginRequest = Omit<
  RegisterRequest,
  'confirmPassword' | 'firstName' | 'lastName'
>;

export type LoginResponse = Omit<RegisterResponse, 'user'>;

export type Verify = {
  code: string;
};

export type TresetPassword = {
  verificationCode: string;
  password: string;
};
