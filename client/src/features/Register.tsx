import { signup } from "@/lib/api";
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

export function SignupForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const {
    mutate: createAccount,
    error,
    isError,
    isPending,
  } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      navigate({ to: "/" });
    },
    onError: () => {
      console.log(
        isError ? `this is error ${error.message}` : "nothing received",
      );
    },
  });

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Container mx="auto" maxW="md" py={12} px={6} textAlign="center">
        <Heading fontSize="4xl" mb={6}>
          Create an account
        </Heading>
        <Box rounded="lg" bg="gray.700" boxShadow="lg" p={8}>
          {isError && (
            <Box mb={3} color="red.400">
              {error?.message || "An error occurred"}
            </Box>
          )}
          <Stack>
            <FormControl id="email">
              <FormLabel color={"white"}>Email address</FormLabel>
              <Input
                color="white"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel color={"white"}>Password</FormLabel>
              <Input
                color="white"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Text color="text.muted" fontSize="xs" textAlign="left" mt={2}>
                - Must be at least 6 characters long.
              </Text>
            </FormControl>
            <FormControl id="confirmPassword">
              <FormLabel color="white">Confirm Password</FormLabel>
              <Input
                color="white"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  createAccount({ email, password, confirmPassword })
                }
              />
            </FormControl>
            <Button
              my={2}
              // isLoading={isPending}
              // isDisabled={
              //   !email || password.length < 6 || password !== confirmPassword
              // }
              onClick={() =>
                createAccount({ email, password, confirmPassword })
              }
            >
              Create Account
            </Button>
            <Text fontSize="sm" color="text.muted">
              Already have an account?{" "}
              <ChakraLink
                color="white"
                onClick={() => navigate({ to: "/login" })}
              >
                Sign in
              </ChakraLink>
            </Text>
          </Stack>
        </Box>
      </Container>
    </Flex>
  );
}
