import { VFC } from "react";
import CreatePost from "../components/CreatePost";
import FetchMoreButton from "../components/FetchMoreButton";
import PostsList from "../components/PostsList";
import { Post, useMeQuery, usePostsQuery } from "../generated/graphql";

const PostsListContainer: VFC = () => {
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  const limit = variables?.limit;

  const posts = data?.posts.posts as Post[] | undefined;

  const { data: meData } = useMeQuery();

  if (!meData?.me) {
    return <p>loading...</p>;
  }

  if (meData?.me && !loading && !data) {
    return (
      <div>
        <div>you got query failed</div>
        <div>{error?.message}</div>
      </div>
    );
  }
  return (
    <>
      <CreatePost userName={meData.me.username} />
      <PostsList posts={posts} meData={meData} />
      <FetchMoreButton
        loading={loading}
        fetchMore={fetchMore}
        posts={posts}
        limit={limit}
      />
    </>
  );
};

export default PostsListContainer;
