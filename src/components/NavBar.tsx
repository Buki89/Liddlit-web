import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { FC } from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";

const NavBar: FC = () => {
  const apolloClient = useApolloClient();
  const router = useRouter();
  const { data } = useMeQuery({
    skip: isServer(),
  });
  const [logout, { loading: logoutFetching }] = useLogoutMutation();

  return (
    <Flex bg="tan" position="sticky" top={0} zIndex={1} p={4}>
      <Flex maxW="800px" flex={1} justifyContent="space-between" m="auto">
        <Box>
          <NextLink href="/">
            <Link>
              <Heading>LiReddit</Heading>
            </Link>
          </NextLink>
        </Box>
        <Flex alignItems="center">
          {!data?.me ? (
            <Box>
              <NextLink href="/login">
                <Link color="white" mr={2}>
                  login
                </Link>
              </NextLink>
              <NextLink href="register">
                <Link color="white">register</Link>
              </NextLink>
            </Box>
          ) : (
            <>
              <Box mr={5}>
                <NextLink href="/create-post">
                  <Button as={Link}>create post</Button>
                </NextLink>
              </Box>
              <Box alignItems="center">
                <Text>{data?.me?.username}</Text>
                <Button
                  variant="link"
                  onClick={async () => {
                    await logout();
                    await apolloClient.resetStore();
                  }}
                  isLoading={logoutFetching}
                >
                  logout
                </Button>
              </Box>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NavBar;
