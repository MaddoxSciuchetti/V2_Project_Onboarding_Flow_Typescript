import { Box, Button, Center, Spinner } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import UserMenu from "./UserMenu";
import React from "react";
import { useNavigate } from "@tanstack/react-router";

interface Props {
  children: React.ReactNode;
}

const AppContainer = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  return isLoading ? (
    <Center w="100vw" h="90vh" flexDir="column">
      <Spinner mb={4} />
    </Center>
  ) : user ? (
    <Box p={4} minH="100vh">
      <UserMenu />
      <Outlet />
    </Box>
  ) : (
    // insert component for back navigation
    <Button onClick={() => navigate({ to: "/login" })}>Here</Button>
  );
};
export default AppContainer;
