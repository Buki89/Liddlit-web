import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import React, { FC, useState } from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";

type ForgotPasswordProps = {};

const ForgotPassword: FC<ForgotPasswordProps> = () => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword({ variables: { email: values.email } });
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <div>if an account with that email exist, we send you email</div>
          ) : (
            <Form>
              <InputField
                name="email"
                label="email"
                placehodler="Email"
                type="email"
              />
              <Button type="submit">forgot password</Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default ForgotPassword;
