import { Stack } from "@chakra-ui/react";
import React, { FC } from "react";
import { MeQuery, Post } from "../generated/graphql";
import PostListItem from "./PostListItem";

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
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} me={meData?.me} />
      ))}
    </Stack>
  );
};

export default PostsList;
