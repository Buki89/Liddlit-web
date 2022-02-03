import { Heading } from "@chakra-ui/react";
import React, { FC } from "react";
import EditDeletePostButtons from "../../components/EditDeletePostButtons";
import Layout from "../../components/Layout";
import { useMeQuery } from "../../generated/graphql";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";

type PostProps = {};

const Post: FC<PostProps> = () => {
  const { data, loading } = useGetPostFromUrl();
  const { data: MeData } = useMeQuery();

  if (loading) {
    return <Layout>loading...</Layout>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <div>could not find post</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading>{data.post.title}</Heading>
      {data?.post?.text}
      {MeData?.me?.id === data.post.creator.id ? (
        <EditDeletePostButtons
          id={data.post.id}
          creatorId={data.post.creator.id}
        />
      ) : null}
    </Layout>
  );
};

export default Post;
