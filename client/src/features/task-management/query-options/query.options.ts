import { getProfilePhoto } from '@/features/user-profile/api/index.api';
import { queryOptions } from '@tanstack/react-query';
import { ProfilePicture } from '../consts/query.conts';

export const workerQueries = {
  getFoto: () =>
    queryOptions<string>({
      queryKey: [ProfilePicture] as const,
      queryFn: getProfilePhoto,
    }),
};
