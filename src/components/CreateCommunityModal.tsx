import {
  Divider,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={2}>
        <ModalHeader>Create a community</ModalHeader>
        <ModalCloseButton />
        <Divider mb={2} />
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
              <ModalFooter>
                <Button customVariant="secondary" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  customVariant="primary"
                  isLoading={isSubmitting}
                >
                  Create Community
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default CreateCommunityModal;
