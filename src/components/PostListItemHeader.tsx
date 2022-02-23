import { Box, Link, Typography } from "@mui/material";
import { format } from "date-fns";
import NextLink from "next/link";
import React, { FC } from "react";

type PostListItemHeaderProps = {
  creator: string;
  community: string;
  createdAt: string;
};

const PostListItemHeader: FC<PostListItemHeaderProps> = ({
  creator,
  community,
  createdAt,
}) => {
  return (
    <Box display="flex" fontSize="0.875rem" color="#787c7e" m="0.25rem 0.5rem">
      <NextLink href={`c/${community}/`}>
        <Link
          fontWeight={700}
          mr="0.5rem"
          color="#000"
        >{`c/${community}`}</Link>
      </NextLink>
      <Typography mr={1}>Posted by</Typography>
      <NextLink href={`user/${creator}`}>
        <Link mr="0.5rem">{`u/${creator}/`}</Link>
      </NextLink>
      <Typography>{format(new Date(createdAt), "LLL d")}</Typography>
    </Box>
  );
};

export default PostListItemHeader;
