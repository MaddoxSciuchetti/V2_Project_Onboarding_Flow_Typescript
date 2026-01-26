import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { login } from "@/lib/api";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isValidEmail } from "@/lib/validEmail";
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

export function LoginComponent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const {
    mutate: signin,
    isError,
    isPending,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate({ to: "/" });
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Flex minH="100vh" align="center" justify="center">
        <Container mx="auto" maxW="md" py={12} px={6} textAlign="center">
          <Heading fontSize="4xl" mb={8}>
            Sign in to your account
          </Heading>
          <Box rounded="lg" bg="gray.700" boxShadow="lg" p={8}>
            {isError && (
              <Box mb={3} color="red.400">
                Invalid email or password
              </Box>
            )}

            <Stack>
              <FormControl id="email">
                <FormLabel className="text-amber-50">Email adress</FormLabel>
                <Input
                  color="white"
                  id="email"
                  type="email"
                  value={email}
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl id="email">
                <FormLabel color={"white"}>Password</FormLabel>
                <Input
                  color="white"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      signin({ email, password });
                    }
                  }}
                />
              </FormControl>

              <ChakraLink
                color={"white"}
                onClick={() => navigate({ to: "/password/forgot" })}
              >
                Forgot Password?
              </ChakraLink>
              <Button type="submit" onClick={() => signin({ email, password })}>
                Login
              </Button>
              <Text fontSize="sm" color="text.muted" className="text-amber-50">
                Don&apos;t have an account?{" "}
                <ChakraLink
                  color={"white"}
                  onClick={() => navigate({ to: "/signup" })}
                >
                  Sign up
                </ChakraLink>
              </Text>
            </Stack>
          </Box>
        </Container>
      </Flex>
    </div>
  );
}
