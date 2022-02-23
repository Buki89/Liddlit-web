import { Button, Flex, Stack } from "@chakra-ui/react";
import React, { FC, useCallback } from "react";
import { MeQuery, useAllPostsQuery } from "../generated/graphql";
import PostListItem from "./PostListItem";

type PostsListProps = {
  meData: MeQuery | undefined;
};

const PostsList: FC<PostsListProps> = ({ meData }) => {
  const { data, loading, fetchMore } = useAllPostsQuery({
    variables: {
      limit: 2,
      offset: 0,
    },

    notifyOnNetworkStatusChange: true,
  });

  const posts = data?.allPosts?.posts;

  const postsLength = data?.allPosts?.posts?.length;

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      fetchMore({
        variables: {
          offset: postsLength,
        },
      });
    },
    [fetchMore, postsLength]
  );

  if (!posts && loading) {
    return <p>loading</p>;
  }

  if (!posts && !loading) {
    return <p>no post yet</p>;
  }

  return (
    <>
      <Stack spacing={4} mb={4}>
        {posts?.map((post) => {
          if (!post) {
            return null;
          }

          return <PostListItem key={post.title} post={post} me={meData?.me} />;
        })}
      </Stack>
      {data?.allPosts?.hasMore && (
        <Flex>
          <Button
            onClick={handleClick}
            isLoading={loading}
            margin="auto "
            my={8}
            type="button"
          >
            load more
          </Button>
        </Flex>
      )}
    </>
  );
};

export default PostsList;
