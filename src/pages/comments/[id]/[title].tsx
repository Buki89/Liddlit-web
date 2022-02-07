import { Heading } from "@chakra-ui/react";
import React, { VFC } from "react";
import styled from "styled-components";
import EditDeletePostButtons from "../../../components/EditDeletePostButtons";
import Layout from "../../../components/Layout";
import { useMeQuery } from "../../../generated/graphql";
import { useGetPostFromUrl } from "../../../utils/useGetPostFromUrl";

const Container = styled("div")`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
`;

const Post: VFC = () => {
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
      <Container>
        <Heading>{data.post.title}</Heading>
        {data?.post?.text}
        {MeData?.me?.id === data.post.creator.id ? (
          <EditDeletePostButtons
            id={data.post.id}
            creatorId={data.post.creator.id}
          />
        ) : null}
      </Container>
    </Layout>
  );
};

export default Post;
