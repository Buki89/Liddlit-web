import { Box, Typography } from "@mui/material";
import NextLink from "next/link";
import React, { FC } from "react";
import styled, { keyframes } from "styled-components";
import { Post, User } from "../generated/graphql";
import PostListItemFooter from "./PostListItemFooter";
import PostListItemHeader from "./PostListItemHeader";
import VoteSection from "./VoteSection";

const rotate = keyframes`
  from {
    /* transform: scale(0); */
		opacity: 0;
  }

  to {
    /* transform: scale(1); */
		opacity: 1;	
  }
`;

const Container = styled("div")`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  display: flex;
  animation: ${rotate} 0.5s linear;
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
    <NextLink
      href="/comments/[id]/[title]"
      as={`/comments/${post.id}/${post.title.toLowerCase()}/`}
    >
      <Container key={post.id}>
        <VoteSection post={post} />
        <div>
          <PostListItemHeader
            createdAt={post.createdAt}
            creator={post.creator.username}
            community={post.community.name}
          />
          <Box flex={1} px="0.5rem">
            <Typography fontSize="1.125rem" fontWeight={600}>
              {post.title}
            </Typography>
            <Typography fontSize="0.875rem">{post.text}</Typography>
          </Box>
          <PostListItemFooter post={post} me={me} />
        </div>
      </Container>
    </NextLink>
  );
};

export default PostListItem;
