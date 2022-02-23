import { Box, Button, Link } from "@mui/material";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { errorToMap } from "../utils/toErrorMap";

type registerProps = {};

const Login: FC<registerProps> = () => {
  const [login] = useLoginMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const responce = await login({
            variables: {
              password: values.password,
              usernameOrEmail: values.password,
            },
          });
          // if (responce.data?.login.errors) {
          //   setErrors(errorToMap(responce.data.login.errors));
          // } else if (responce.data?.login.user) {
          //   if (typeof router.query.next === "string") {
          //     router.push(router.query.next);
          //   } else {
          //     router.push("/");
          //   }
          // }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              label="Username or email"
              placehodler="username or Email"
            />
            <Box mt={4}>
              <InputField
                name="password"
                label="password"
                placehodler="Password"
                type="password"
              />
            </Box>
            <Box display="flex" mt={2}>
              <NextLink href="/forgot-password">
                <Link ml="auto">forgot password?</Link>
              </NextLink>
            </Box>
            <Button type="submit">login</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
