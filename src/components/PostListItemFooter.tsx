import { Button, Flex, Link } from "@chakra-ui/react";
import React, { VFC } from "react";
import { Post, User } from "../generated/graphql";
import { GoComment } from "react-icons/go";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSave } from "react-icons/bi";
import NextLink from "next/link";

type PostListItemFooterProps = {
  me?: Pick<User, "__typename" | "id" | "username"> | null;
  post: Post;
};
//TODO: Přidat počet commentů

const PostListItemFooter: VFC<PostListItemFooterProps> = ({ me, post }) => {
  return (
    <Flex color="#878a8c" mt={2}>
      <NextLink href={`/comments/${post.id}/${post.title}/`}>
        <Button
          size="sm"
          variant="ghost"
          fontSize="0.85rem"
          as={Link}
          leftIcon={<GoComment fontSize="1.25rem" />}
        >
          {`${100} Comments`}
        </Button>
      </NextLink>
      <Button
        size="sm"
        variant="ghost"
        fontSize="0.85rem"
        leftIcon={<BiSave fontSize="1.25rem" />}
      >
        Save
      </Button>
      {me?.id === post?.creator?.id ? (
        <Flex>
          <Button
            size="sm"
            variant="ghost"
            fontSize="0.85rem"
            leftIcon={
              <MdOutlineModeEditOutline fill="#878a8c" fontSize="1.25rem" />
            }
          >
            Edit Post
          </Button>
          <Button
            size="sm"
            variant="ghost"
            fontSize="0.85rem"
            leftIcon={<AiOutlineDelete fontSize="1.25rem" />}
          >
            Delete
          </Button>
        </Flex>
      ) : null}
    </Flex>
  );
};

export default PostListItemFooter;
