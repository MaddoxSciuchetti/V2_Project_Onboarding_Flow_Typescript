import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { logout } from '@/apis/index.apis';
import { PROFILEPICTURE } from '@/constants/querykey.consts';
import { getProfilePhoto } from '@/features/user-profile/api/index.api';
import useAuth from '@/features/user-profile/hooks/useAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

const UserMenu = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data } = useQuery<string>({
    queryKey: [PROFILEPICTURE],
    queryFn: getProfilePhoto,
  });

  const navigate = useNavigate();
  const userInitial = (
    user?.vorname?.[0] ??
    user?.email?.[0] ??
    '?'
  ).toUpperCase();
  const { mutate: signOut } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      navigate({ to: '/login' });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer h-10 w-10 rounded-xl  bg-background">
          <AvatarImage
            className="h-full w-full rounded-xl"
            src={data}
            alt="profile image"
          />
          <AvatarFallback className="rounded-xl bg-background text-lg font-semibold text-foreground">
            {userInitial}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        collisionPadding={16}
        className="w-30 rounded-xl border border-gray-300 bg-gray-100 p-1.5 shadow-md"
      >
        <DropdownMenuItem
          className="cursor-pointer rounded-lg text-sm font-medium text-gray-800 focus:bg-gray-200 focus:text-gray-900"
          onClick={() => navigate({ to: '/profile' })}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1.5 bg-gray-300" />
        <DropdownMenuItem
          className="cursor-pointer rounded-lg text-sm font-medium text-gray-900 focus:bg-gray-200"
          onClick={() => signOut()}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
