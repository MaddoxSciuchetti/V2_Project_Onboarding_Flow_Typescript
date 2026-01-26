import { logout } from "@/lib/api";
import { Avatar, Menu } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

const UserMenu = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: signOut } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      navigate({ to: "/login" });
    },
  });

  return (
    <Menu.Root lazyMount>
      <Menu.Trigger asChild>
        <Avatar.Root
          position="absolute"
          left="1.5rem"
          bottom="1.5rem"
          cursor="pointer"
        >
          <Avatar.Image src="#" />
          <Avatar.Fallback>U</Avatar.Fallback>
        </Avatar.Root>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="profile" onClick={() => navigate({ to: "/" })}>
            Profile
          </Menu.Item>
          <Menu.Item
            value="settings"
            onClick={() => navigate({ to: "/settings" })}
          >
            Settings
          </Menu.Item>
          <Menu.Item value="logout" onClick={() => signOut()}>
            Logout
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};

export default UserMenu;
