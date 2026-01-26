import { Button } from "@/components/ui/button";
import { Item } from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import { Maddox_Link } from "@/components/ui/maddox_customs/maddox_link";
import { verifyEmail } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowUpRightIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Container,
  Flex,
  Link as ChakraLink,
  Spinner,
  Text,
  Alert,
  VStack,
} from "@chakra-ui/react";
function VerifyEmail() {
  const code = useParams({ from: "/email/verify/$code" });
  console.log(code);

  const navigate = useNavigate();
  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifyEmail(code),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return (
    <Flex minH="100vh" justify="center" mt={12}>
      <Container mx="auto" maxW="md" py={12} px={6} textAlign="center">
        {isPending ? (
          <Spinner />
        ) : (
          <VStack align="center">
            <Text
              // status={isSuccess ? "success" : "error"}
              w="fit-content"
              borderRadius={12}
            >
              {isSuccess ? "Email Verified!" : "Invalid Link"}
            </Text>
            {isError && (
              <Text color="gray.400">
                The link is either invalid or expired.{" "}
                <ChakraLink onClick={() => navigate({ to: "/" })}>
                  Get a new link
                </ChakraLink>
              </Text>
            )}
            <ChakraLink onClick={() => navigate({ to: "/" })}>
              Back to home
            </ChakraLink>
          </VStack>
        )}
      </Container>
    </Flex>
  );
}

export { VerifyEmail };
