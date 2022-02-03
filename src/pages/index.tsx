import { ChevronUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import EditDeletePostButtons from "../components/EditDeletePostButtons";
import Layout from "../components/Layout";
import UpdootSection from "../components/UpdootSection";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
ChevronUpIcon;

const Index = () => {
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  const { data: MeData } = useMeQuery();

  if (MeData?.me && !loading && !data) {
    return (
      <div>
        <div>you got query failed</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  return (
    <Layout variant="regular">
      {MeData?.me && !data ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {!data
            ? null
            : data.posts.posts.map((post) =>
                !post ? null : (
                  <Flex key={post.id} p={5} shadow="md" alignItems="center">
                    <UpdootSection post={post} />
                    <Box flex={1}>
                      <NextLink href="/post/[id]" as={`/post/${post.id}`}>
                        <Link>
                          <Heading fontSize="xl">{post.title}</Heading>
                        </Link>
                      </NextLink>
                      <Text>Posted by {post.creator.username}</Text>
                      <Flex align="center">
                        <Text flex={1} mt={4}>
                          {post.textSnippet}
                        </Text>
                        {MeData?.me?.id === post.creator.id ? (
                          <EditDeletePostButtons
                            id={post.id}
                            creatorId={post.creator.id}
                          />
                        ) : null}
                      </Flex>
                    </Box>
                  </Flex>
                )
              )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                },
              });
            }}
            isLoading={loading}
            margin="auto "
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default Index;
