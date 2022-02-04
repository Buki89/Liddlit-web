import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { VFC } from "react";
import styled from "styled-components";
import EditDeletePostButtons from "../components/EditDeletePostButtons";
import UpdootSection from "../components/UpdootSection";
import { useMeQuery, usePostsQuery } from "../generated/graphql";

const Container = styled("div")`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  display: flex;
  padding: 1rem;
`;

const PostsListContainer: VFC = () => {
  const {
    data: posts,
    error,
    loading,
    fetchMore,
    variables,
  } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  const { data: meData } = useMeQuery();

  if (meData?.me && !loading && !posts) {
    return (
      <div>
        <div>you got query failed</div>
        <div>{error?.message}</div>
      </div>
    );
  }
  return (
    <>
      {meData?.me && !posts ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={4}>
          {!posts
            ? null
            : posts.posts.posts.map((post) =>
                !post ? null : (
                  <Container key={post.id}>
                    <UpdootSection post={post} />
                    <Box flex={1}>
                      <NextLink href="/post/[id]" as={`/post/${post.id}`}>
                        <Link>
                          <Heading fontSize="xl">{post.title}</Heading>
                        </Link>
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
      )}
      {posts && posts.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    posts.posts.posts[posts.posts.posts.length - 1].createdAt,
                },
              });
            }}
            isLoading={loading}
            margin="auto "
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </>
  );
};

export default PostsListContainer;
