import { ApolloCache, gql } from "@apollo/client";
import {
  Box,
  Flex,
  IconButton as IconButtonBase,
  Text,
} from "@chakra-ui/react";
import React, { FC, useCallback } from "react";
import styled from "styled-components";
import {
  PostSnippetFragment,
  useVoteMutation,
  VoteMutation,
} from "../generated/graphql";
import ArrowIcon from "../icons/ArrowIcon";

const IconButton = styled(IconButtonBase)`
  background-color: transparent;
  :active,
  :focus {
    box-shadow: none;
  }
`;

const updateAfterVote = (
  value: number,
  postId: number,
  cache: ApolloCache<VoteMutation>
) => {
  const data = cache.readFragment<{
    id: number;
    points: number;
    voteStatus: number | null;
  }>({
    id: "Post:" + postId,
    fragment: gql`
      fragment _ on Post {
        id
        points
        voteStatus
      }
    `,
  });

  if (data) {
    if (data.voteStatus === value) {
      return;
    }
    const newPoints = data.points + (!data.voteStatus ? 1 : 2) * value;
    cache.writeFragment({
      id: "Post:" + postId,
      fragment: gql`
        fragment __ on Post {
          points
          voteStatus
        }
      `,
      data: { points: newPoints, voteStatus: value },
    });
  }
};

const getColor = (voteStatus?: number | null) => {
  if (voteStatus === 1) {
    return "#f94502";
  }
  if (voteStatus === -1) {
    return "#7193ff";
  }
  return "#000";
};

type VoteSectionProps = {
  post: PostSnippetFragment;
};

const VoteSection: FC<VoteSectionProps> = ({ post }) => {
  const [vote] = useVoteMutation();

  const { id, voteStatus } = post;

  const handleUpVote = useCallback(
    async (e) => {
      e.stopPropagation();
      if (voteStatus === 1) {
        await vote({
          variables: {
            postId: id,
            value: 0,
          },
          update: (cache) => updateAfterVote(-1, id, cache),
        });
      } else {
        await vote({
          variables: {
            postId: id,
            value: 1,
          },
          update: (cache) => updateAfterVote(1, id, cache),
        });
      }
    },
    [vote, id, voteStatus]
  );

  const handleDownVote = useCallback(
    async (e) => {
      e.stopPropagation();

      if (voteStatus === -1) {
        await vote({
          variables: {
            postId: id,
            value: 0,
          },
          update: (cache) => updateAfterVote(1, id, cache),
        });
      } else {
        await vote({
          variables: {
            postId: id,
            value: -1,
          },
          update: (cache) => updateAfterVote(-1, id, cache),
        });
      }
    },
    [vote, id, voteStatus]
  );

  const color = getColor(post.voteStatus);

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      backgroundColor="#f8f9fa"
      p="0.25rem"
      borderRadius="0.25rem 0 0 0.25rem"
    >
      <IconButton
        onClick={handleUpVote}
        variant="solid"
        aria-label="up-vote"
        icon={<ArrowIcon voted={post.voteStatus === 1} />}
        size="xs"
      />
      <Box>
        <Text fontSize="0.875rem" my="-0.25rem" fontWeight={600} color={color}>
          {post.points}
        </Text>
      </Box>
      <IconButton
        onClick={handleDownVote}
        variant="solid"
        aria-label="down-vote"
        icon={<ArrowIcon rotated={true} voted={post.voteStatus === -1} />}
        size="xs"
      />
    </Flex>
  );
};

export default VoteSection;
