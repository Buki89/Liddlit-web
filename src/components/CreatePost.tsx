import { Avatar, Box } from "@chakra-ui/react";
import React, { FC } from "react";
import styled from "styled-components";
import { IoImageOutline } from "react-icons/io5";
import { BsLink45Deg } from "react-icons/bs";
import Link from "next/link";

const Container = styled("div")`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  display: flex;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  align-items: center;
`;

const CreatePostLink = styled("a")`
  background-color: #f6f7f8;
  border: 1px solid #edeff1;
  border-radius: 0.25rem;
  color: #7b7b7b;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  flex: 1;
  :hover {
    background-color: #fff;
    border: 1px solid #0079d3;
    cursor: text;
  }
`;

type CreatePostProps = {
  avatarUrl?: string;
  userName: string;
};

const CreatePost: FC<CreatePostProps> = ({ avatarUrl, userName }) => (
  <Container>
    <Link href="/user-profile" passHref={true}>
      <Avatar src={avatarUrl} size="sm" />
    </Link>
    <Link href="/create-post" passHref={true}>
      <CreatePostLink>Create Post</CreatePostLink>
    </Link>
    <Box mx="1rem">
      <IoImageOutline fontSize="1.75rem" color="#878a8c" />
    </Box>
    <BsLink45Deg fontSize="1.75rem" color="#878a8c" />
  </Container>
);

export default CreatePost;
