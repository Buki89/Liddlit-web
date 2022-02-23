import { Box } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import CreatePost from "../components/CreatePost";
import HomeWidget from "../components/HomeWidget";
import PostsActionBar from "../components/PostSActionBar";
import PostsList from "../components/PostsList";
import { useMeQuery } from "../generated/graphql";

const Dashboard: NextPage = () => {
  const { data, loading } = useMeQuery();
  const router = useRouter();

  if (loading && !data?.me) {
    return <p>loading...</p>;
  }

  if (!loading && !data?.me) {
    router.push("/login");
  }

  return (
    <Box display="flex" justifyContent="center">
      <Box width="40rem" mr={6}>
        <CreatePost />
        <PostsActionBar />
        <PostsList meData={data} />
      </Box>
      <HomeWidget />
    </Box>
  );
};

export default Dashboard;
