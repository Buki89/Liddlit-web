import { Stack, Box, Heading, Flex, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { MeQuery, Post } from "../generated/graphql";
import EditDeletePostButtons from "./EditDeletePostButtons";
import UpdootSection from "./UpdootSection";
import NextLink from "next/link";
import styled from "styled-components";

const Container = styled("div")`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  display: flex;
  padding: 1rem;
`;

type PostsListProps = {
  posts: Post[] | undefined;
  meData: MeQuery | undefined;
};

const PostsList: FC<PostsListProps> = ({ posts, meData }) => {
  if (!posts) {
    return <p>no post yet</p>;
  }

  return (
    <Stack spacing={4}>
      {posts.map((post) =>
        !post ? null : (
          <Container key={post.id}>
            <UpdootSection post={post} />
            <Box flex={1}>
              <NextLink href="/post/[id]" as={`/post/${post.id}`}>
                <Heading fontSize="xl">{post.title}</Heading>
              </NextLink>
              <Text>Posted by {post.creator.username}</Text>
              <Flex align="center">
                <Text flex={1} mt={4}>
                  {post.textSnippet}
                </Text>
                {meData?.me?.id === post.creator.id ? (
                  <EditDeletePostButtons
                    id={post.id}
                    creatorId={post.creator.id}
                  />
                ) : null}
              </Flex>
            </Box>
          </Container>
        )
      )}
    </Stack>
  );
};

export default PostsList;
