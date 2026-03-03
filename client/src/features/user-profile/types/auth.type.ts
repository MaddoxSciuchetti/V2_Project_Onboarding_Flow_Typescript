import { USER_PERMISSION } from '@/types/helper.types';

export type User = {
  id: string;
  email: string;
  verified: boolean;
  user_permission: USER_PERMISSION;
  createdAt: Date;
  updatedAt: Date;
  vorname: string;
  nachname: string;
  cloud_url: string;
  presignedUrl?: string;
};

export type Auth = {
  user: User | undefined;
  isLoading: boolean;
  isError: boolean;
};
