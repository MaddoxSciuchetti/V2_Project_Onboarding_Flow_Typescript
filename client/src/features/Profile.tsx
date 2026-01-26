import { Center, Heading, Text } from "@chakra-ui/react";
import useAuth from "@/hooks/useAuth";
import { AlertIcon, Alert } from "@chakra-ui/alert";

const Profile = () => {
  const { user, isLoading, isError } = useAuth();
  console.log("this should be the email", user?.email);

  if (isLoading) {
    return (
      <Center mt={16}>
        <Heading>Loading user data</Heading>
      </Center>
    );
  }

  if (isError || !user) {
    return (
      <Center mt={16}>
        <Heading>Error loading user</Heading>
        <Text color="red.500">Please try again later</Text>
      </Center>
    );
  }

  const { email, verified, createdAt } = user;

  return (
    <Center mt={16} flexDir="column">
      <Heading mb={4}>My Account</Heading>
      {!verified && (
        <Alert status="warning" w="fit-content" borderRadius={12} mb={3}>
          <AlertIcon />
          Please verify your email
        </Alert>
      )}
      <Text color="black" mb={2}>
        Email:{" "}
        <Text as="span" color="blac">
          {email}
        </Text>
      </Text>
      <Text color="black">
        Created on{" "}
        <Text as="span" color="black">
          {new Date(createdAt).toLocaleDateString("en-US")}
        </Text>
      </Text>
    </Center>
  );
};
export default Profile;
