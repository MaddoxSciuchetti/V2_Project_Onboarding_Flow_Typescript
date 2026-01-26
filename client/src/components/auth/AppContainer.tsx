import { Box, Button, Center, Spinner } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import UserMenu from "./UserMenu";
import React from "react";
import { useNavigate } from "@tanstack/react-router";

interface Props {
  children: React.ReactNode;
}

const AppContainer = ({ children }: Props) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  return isLoading ? (
    <Center w="100vw" h="90vh" flexDir="column">
      <Spinner mb={4} />
    </Center>
  ) : user ? (
    <Box p={4} minH="100vh">
      <UserMenu />
      {children}
      <Outlet />
    </Box>
  ) : (
    <Button onClick={() => navigate({ to: "/login" })}>Here</Button>
  );
};
export default AppContainer;
