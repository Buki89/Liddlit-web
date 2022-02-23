import NextLink from "next/link";
import React, { FC } from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useApolloClient } from "@apollo/client";
import styled from "styled-components";
import Logo from "./Logo";
import { Box, Button, Link, Typography } from "@mui/material";

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
      <Box display="flex" flex={1} justifyContent="space-between" m="auto">
        <Box>
          <NextLink href="/">
            <Link>
              <Typography variant="h2">
                <Logo />
              </Typography>
            </Link>
          </NextLink>
        </Box>
        <Box display="flex" alignItems="center">
          {!data?.me ? (
            <Box>
              <NextLink href="/login">
                <Link color="#fff" mr={2}>
                  login
                </Link>
              </NextLink>
              <NextLink href="register">
                <Link color="#fff">register</Link>
              </NextLink>
            </Box>
          ) : (
            <>
              <Box alignItems="center">
                <Typography variant="body1">{data?.me?.username}</Typography>
                <Button
                  onClick={async () => {
                    await logout();
                    await apolloClient.resetStore();
                  }}
                >
                  logout
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default NavBar;
