import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { FC } from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { Text } from "@chakra-ui/react";
import { useApolloClient } from "@apollo/client";
import styled from "styled-components";
import Logo from "./Logo";

const Container = styled("div")`
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #ccc;
`;

const NavBar: FC = () => {
  const apolloClient = useApolloClient();
  const { data } = useMeQuery({
    skip: isServer(),
  });
  const [logout, { loading: logoutFetching }] = useLogoutMutation();

  return (
    <Container>
      <Flex flex={1} justifyContent="space-between" m="auto">
        <Box>
          <NextLink href="/">
            <Link>
              <Heading>
                <Logo />
              </Heading>
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
    </Container>
  );
};

export default NavBar;
