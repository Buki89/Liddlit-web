import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { FC } from "react";
import InputField from "../../../components/InputField";
import Layout from "../../../components/Layout";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { useGetIntId } from "../../../utils/useGetIntId";

type EditPostProps = {};

const EditPost: FC<EditPostProps> = () => {
  const router = useRouter();
  const intId = useGetIntId();
  const { data, loading } = usePostQuery({
    skip: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [updatePost] = useUpdatePostMutation();

  if (loading) {
    return <Layout>loading...</Layout>;
  }

  if (!data?.Post) {
    return (
      <Layout>
        <div>could not find post</div>
      </Layout>
    );
  }

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: data.Post.title, text: data.Post.text }}
        onSubmit={async ({ text, title }) => {
          await updatePost({ variables: { id: intId, title, text: "" } });
          router.back();
        }}
      >
        {() => (
          <Form>
            <InputField name="title" label="Title" placehodler="title" />
            <Box mt={4}>
              <InputField name="text" label="Body" placehodler="text..." />
            </Box>

            <Button type="submit">update post</Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default EditPost;
