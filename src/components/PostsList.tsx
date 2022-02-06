import { Stack } from "@chakra-ui/react";
import React, { FC } from "react";
import { MeQuery, Post } from "../generated/graphql";
import PostsListItem from "./PostsListItem";

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
        <PostsListItem key={post.id} post={post} me={meData?.me} />
      ))}
    </Stack>
  );
};

export default PostsList;
