import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import React, { FC } from "react";
import {
  PostSnippetFragment,
  useVoteMutation,
  VoteMutation,
} from "../generated/graphql";
import { Text } from "@chakra-ui/react";
import { ApolloCache, gql } from "@apollo/client";

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
    const newPoints =
      (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
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

type UpdootSectionProps = {
  post: PostSnippetFragment;
};

const UpdootSection: FC<UpdootSectionProps> = ({ post }) => {
  const [vote] = useVoteMutation();
  return (
    <Flex flexDirection="column" alignItems="center" mr={4}>
      <IconButton
        onClick={async () => {
          await vote({
            variables: {
              postId: post.id,
              value: 1,
            },
            update: (cache) => updateAfterVote(1, post.id, cache),
          });
        }}
        colorScheme={post.voteStatus === 1 ? "green" : undefined}
        variant="solid"
        aria-label="up-vote"
        icon={<ChevronUpIcon w={10} h={10} />}
      />
      <Box my={2}>
        <Text fontSize="1.5rem">{post.points}</Text>
      </Box>
      <IconButton
        onClick={async () => {
          await vote({
            variables: {
              postId: post.id,
              value: -1,
            },
            update: (cache) => updateAfterVote(-1, post.id, cache),
          });
        }}
        colorScheme={post.voteStatus === -1 ? "red" : undefined}
        variant="solid"
        aria-label="down-vote"
        icon={<ChevronDownIcon w={10} h={10} />}
      />
    </Flex>
  );
};

export default UpdootSection;
