import { Box, Modal } from "@mui/material";
import { Form, Formik } from "formik";
import React, { VFC } from "react";
import { useCreateCommunityMutation } from "../generated/graphql";
import Button from "./Button";
import InputField from "./InputField";

type CreateCommunityModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateCommunityModal: VFC<CreateCommunityModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [createCommunity] = useCreateCommunityMutation();

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box>
        Create a community
        <Formik
          initialValues={{ name: "" }}
          onSubmit={async (values) => {
            const { errors } = await createCommunity({
              variables: { name: values.name },
            });
            console.log("errors", errors);
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="name" label="Name" placehodler="name" />
              <Button customVariant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" customVariant="primary">
                Create Community
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default CreateCommunityModal;
