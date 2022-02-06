import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { FC } from "react";
import styled from "styled-components";
import { Post, User } from "../generated/graphql";
import EditDeletePostButtons from "./EditDeletePostButtons";
import VoteSection from "./VoteSection";

const Container = styled("div")`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  display: flex;
  :hover {
    border-color: #898989;
  }
`;

type PostListItemProps = {
  post: Post;
  me?: Pick<User, "__typename" | "id" | "username"> | null;
};

const PostListItem: FC<PostListItemProps> = ({ post, me }) => {
  if (!post) {
    return null;
  }

  return (
    <Container key={post.id}>
      <VoteSection post={post} />
      <Box flex={1} p="0.5rem">
        <NextLink href="/post/[id]" as={`/post/${post.id}`}>
          <Heading fontSize="xl">{post.title}</Heading>
        </NextLink>
        <Text>Posted by {post.creator.username}</Text>
        <Flex align="center">
          <Text flex={1} mt={4}>
            {post.textSnippet}
          </Text>
          {me?.id === post.creator.id ? (
            <EditDeletePostButtons id={post.id} creatorId={post.creator.id} />
          ) : null}
        </Flex>
      </Box>
    </Container>
  );
};

export default PostListItem;
