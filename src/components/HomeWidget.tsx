import React, { FC, useCallback, useState } from "react";
import styled from "styled-components";
import { Link, Text } from "@chakra-ui/react";
import Button from "./Button";
import NextLink from "next/link";
import CreateCommunityModal from "./CreateCommunityModal";

const Container = styled("div")`
  border: 1px solid #ccc;
  width: 19.5rem;
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.25rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

type HomeWidgetProps = {};

const HomeWidget: FC<HomeWidgetProps> = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <Container>
      <Text fontSize="1rem" fontWeight={500} mb="1rem">
        Home
      </Text>
      <Text fontSize="0.875rem">
        Your personal Liddlit frontpage. Come here to check in with your
        favorite communities.
      </Text>
      <NextLink href={"/submit"} passHref={true}>
        <Button
          as={Link}
          variant="link"
          customVariant="primary"
          isFullWidth={true}
          my={2}
        >
          Create Post
        </Button>
      </NextLink>
      <Button customVariant="secondary" onClick={handleClick}>
        Create Community
      </Button>
      <CreateCommunityModal isOpen={open} onClose={handleClick} />
    </Container>
  );
};

export default HomeWidget;
