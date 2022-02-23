import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import InputField from "../../components/InputField";
import Wrapper from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";

const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation();
  const [errorToken, setErrorToken] = useState<string>("");
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const responce = await changePassword({
            variables: {
              newPassword: values.newPassword,
              token:
                typeof router.query.token === "string"
                  ? router.query.token
                  : "",
            },
          });
          // if (responce?.data?.changePassword?.errors) {
          //   const errorMap = errorToMap(responce?.data?.changePassword?.errors);
          //   if ("token" in errorMap) {
          //     setErrorToken(errorMap.token);
          //   }
          //   setErrors(errorMap);
          // } else if (responce.data?.changePassword.user) {
          //   router.push("/");
          // }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              label="new password"
              placehodler="New password"
              type="password"
            />
            {errorToken ? (
              <Flex>
                <Box mr={2} color="red">
                  {errorToken}
                </Box>
                <NextLink href="/forgot-password">
                  <Link>click here to get a new one</Link>
                </NextLink>
              </Flex>
            ) : null}
            <Button
              type="submit"
              colorScheme="teal"
              mt={4}
              isLoading={isSubmitting}
            >
              change password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default ChangePassword;
