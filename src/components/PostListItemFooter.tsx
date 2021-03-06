import React, { VFC } from "react";
import { Post, User } from "../generated/graphql";
import { GoComment } from "react-icons/go";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSave } from "react-icons/bi";
import NextLink from "next/link";
import { Box, Button, Link } from "@mui/material";

type PostListItemFooterProps = {
  me?: Pick<User, "__typename" | "id" | "username"> | null;
  post: Post;
};
//TODO: Přidat počet commentů

const PostListItemFooter: VFC<PostListItemFooterProps> = ({ me, post }) => {
  return (
    <Box display="flex" color="#878a8c" mt={2}>
      <NextLink href={`/comments/${post.id}/${post.title}/`}>
        <Button
          startIcon={<GoComment fontSize="1.25rem" />}
          LinkComponent={Link}
        >
          {`${100} Comments`}
        </Button>
      </NextLink>
      <Button startIcon={<BiSave fontSize="1.25rem" />}>Save</Button>
      {me?.id === post?.creator?.id ? (
        <Box display="flex">
          <Button
            startIcon={
              <MdOutlineModeEditOutline fill="#878a8c" fontSize="1.25rem" />
            }
          >
            Edit Post
          </Button>
          <Button startIcon={<AiOutlineDelete fontSize="1.25rem" />}>
            Delete
          </Button>
        </Box>
      ) : null}
    </Box>
  );
};

export default PostListItemFooter;
