import { Flex, Button } from "@chakra-ui/react";
import React, { VFC, useCallback } from "react";
import { Post } from "../generated/graphql";

type FetchMoreButtonProps = {
  loading: boolean;
  fetchMore: any;
  posts?: Post[];
  limit?: number;
};

const FetchMoreButton: VFC<FetchMoreButtonProps> = ({
  loading,
  fetchMore,
  posts,
  limit,
}) => {
  const handleFetchMore = useCallback(() => {
    fetchMore({
      variables: {
        limit,
        cursor: posts && posts[posts.length - 1].createdAt,
      },
    });
  }, [limit, fetchMore, posts]);

  return (
    <Flex>
      <Button
        onClick={handleFetchMore}
        isLoading={loading}
        margin="auto "
        my={8}
      >
        load more
      </Button>
    </Flex>
  );
};

export default FetchMoreButton;
