import {
  Container,
  Flex,
  Link as ChakraLink,
  VStack,
  Text,
} from "@chakra-ui/react";

import {
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/alert";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

const ResetPassword = () => {
  const navigate = useNavigate();
  const search: any = useSearch({ from: "/password/reset" });

  const code = search.code as string | undefined;
  const exp = search.exp ? Number(search.exp) : undefined;
  console.log("this is the code", code);
  console.log("this is the exp", exp);

  console.log(code);

  const now = Date.now();
  const linkIsValid = code && exp && exp > now;
  return (
    <Flex minH="100vh" justify="center">
      <Container mx="auto" maxW="md" py={12} px={6} textAlign="center">
        {linkIsValid ? (
          <ResetPasswordForm code={code} />
        ) : (
          <VStack align="center">
            <Alert status="error" w="fit-content" borderRadius={12}>
              <AlertIcon />
              Invalid Link
            </Alert>
            <Text color="gray.400">The link is either invalid or expired.</Text>
            <ChakraLink onClick={() => navigate({ to: "/password/forgot" })}>
              Request a new password reset link
            </ChakraLink>
          </VStack>
        )}
      </Container>
    </Flex>
  );
};

export { ResetPassword };
