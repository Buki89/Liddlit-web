import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { FC } from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { errorToMap } from "../utils/toErrorMap";

type registerProps = {};

const Register: FC<registerProps> = () => {
  const [register] = useRegisterMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "", email: "" }}
        onSubmit={async (values, { setErrors }) => {
          const responce = await register({
            variables: {
              options: values,
            },
          });
          if (responce?.data?.register?.errors) {
            // setErrors(errorToMap(responce.data.register.errors));
          } else if (responce?.data?.register?.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              label="username"
              placehodler="username"
            />
            <Box mt={4}>
              <InputField name="email" label="Email" placehodler="email" />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                label="password"
                placehodler="Password"
                type="password"
              />
            </Box>
            <Button type="submit">register</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
