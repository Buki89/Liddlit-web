import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { VFC } from "react";
import CreatePost from "../components/CreatePost";
import HomeWidget from "../components/HomeWidget";
import PostsActionBar from "../components/PostSActionBar";
import PostsList from "../components/PostsList";
import { useMeQuery } from "../generated/graphql";

const Dashboard: VFC = () => {
  const { data, loading } = useMeQuery();
  const router = useRouter();

  if (loading && !data?.me) {
    return <p>loading...</p>;
  }

  if (!loading && !data?.me) {
    router.push("/login");
  }

  return (
    <Flex justifyContent="center">
      <Box width="40rem" mr={6}>
        <CreatePost />
        <PostsActionBar />
        <PostsList meData={data} />
      </Box>
      <HomeWidget />
    </Flex>
  );
};

export default Dashboard;
