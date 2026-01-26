import { sendPasswordResetEmail, signup } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import {
  Flex,
  Box,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  Link as ChakraLink,
  Container,
} from "@chakra-ui/react";

import { FormLabel, FormControl } from "@chakra-ui/form-control";
import {
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/alert";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const {
    mutate: sendPasswordReset,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: sendPasswordResetEmail,
  });

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Container mx="auto" maxW="md" py={12} px={6} textAlign="center">
        <Heading fontSize="4xl" mb={8}>
          Reset your password
        </Heading>
        <Box rounded="lg" bg="gray.700" boxShadow="lg" p={8}>
          {isError && (
            <Box mb={3} color="red.400">
              {error.message || "An error occurred"}
            </Box>
          )}
          <Stack>
            {isSuccess ? (
              <Alert status="success" borderRadius={12}>
                <AlertIcon />
                Email sent! Check your inbox for further instructions.
              </Alert>
            ) : (
              <>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  />
                </FormControl>
                <Button onClick={() => sendPasswordReset(email)}>
                  Reset Password
                </Button>
              </>
            )}
            <Text fontSize="sm" color="text.muted">
              Go back to{" "}
              <ChakraLink onClick={() => navigate({ to: "/login" })}>
                Sign in
              </ChakraLink>
              &nbsp;or&nbsp;
              <ChakraLink onClick={() => navigate({ to: "/signup" })}>
                Sign up
              </ChakraLink>
            </Text>
          </Stack>
        </Box>
      </Container>
    </Flex>
  );
};

export { ForgotPassword };
