import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { Link, useNavigate } from "@tanstack/react-router";

import { FormLabel, FormControl } from "@chakra-ui/form-control";
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import {
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/alert";
import { resetPassword } from "@/lib/api";

const ResetPasswordForm = ({ code }: any) => {
  const [password, setPassword] = useState("");
  const {
    mutate: resetUserPassword,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: resetPassword,
  });

  const navigate = useNavigate();
  return (
    <>
      <Heading fontSize="4xl" mb={8}>
        Change your password
      </Heading>
      <Box rounded="lg" bg="gray.700" boxShadow="lg" p={8}>
        {isError && (
          <Box mb={3} color="red.400">
            {error.message || "An error occurred"}
          </Box>
        )}
        {isSuccess ? (
          <Box>
            <Alert status="success" borderRadius={12} mb={3}>
              <AlertIcon />
              Password updated successfully!
            </Alert>

            <p onClick={() => navigate({ to: "/login" })}>Sign in</p>
          </Box>
        ) : (
          <Stack>
            <FormControl id="password">
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  resetUserPassword({ password, verificationCode: code })
                }
                autoFocus
              />
            </FormControl>
            <Button
              my={2}
              onClick={() =>
                resetUserPassword({
                  password,
                  verificationCode: code,
                })
              }
            >
              Reset Password
            </Button>
          </Stack>
        )}
      </Box>
    </>
  );
};
export default ResetPasswordForm;
