import { Box, Button, Input, TextareaAutosize } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { VFC } from "react";
import { useCreatePostMutation } from "../generated/graphql";

type CreatePostFormProps = {
  selectedCommunity?: string;
};

const CreatePostForm: VFC<CreatePostFormProps> = ({ selectedCommunity }) => {
  const [createPost, { loading }] = useCreatePostMutation();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      title: "",
      text: "",
    },
    onSubmit: async (values) => {
      const { errors } = await createPost({
        variables: {
          input: { ...values, communityId: parseInt(selectedCommunity!) },
        },
        update: (cache) => {
          cache.evict({ args: { __typename: "Post" } });
        },
      });
      if (!errors) {
        router.push("/");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box display="flex" p={4} flexDirection="column">
        <Input
          placeholder="Title"
          type="text"
          name="title"
          // _focus={{ borderColor: "black" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        <TextareaAutosize
          placeholder="Text (optional)"
          name="text"
          // _focus={{ borderColor: "black" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.text}
        />
        <Button
          type="submit"
          // isLoading={formik.isSubmitting || loading}
          // backgroundColor="blue"
          // _hover={{ backgroundColor: "lighterBlue" }}
          disabled={!formik.values.title || !selectedCommunity}
        >
          Post
        </Button>
      </Box>
    </form>
  );
};

export default CreatePostForm;
