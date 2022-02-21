import { Box, Divider, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import CommunitySelect from "../components/CommunitySelect";
import CreatePostForm from "../components/CreatePostForm";
import Layout from "../components/Layout";
import RadioPostVariant from "../components/RadioPostVariant";
import { useIsAuth } from "../hooks/useIsAuth";

const Container = styled("div")`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
`;

const Submit: NextPage = () => {
  // useIsAuth();

  const [selectedCommunity, setSelectedCommunity] = useState<
    string | undefined
  >(undefined);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement> | undefined) => {
      setSelectedCommunity(e?.target.value);
    },
    []
  );

  return (
    <Layout>
      <Box
        width="46.25rem"
        mr={6}
        display="flex"
        flexDirection="column"
        m="0 auto"
      >
        <Heading size="md">Create Post</Heading>
        <Divider borderColor="#fff" borderWidth="1px" my={4} />
        <CommunitySelect onChange={handleChange} />
        <Container>
          <RadioPostVariant />
          <CreatePostForm selectedCommunity={selectedCommunity} />
        </Container>
      </Box>
    </Layout>
  );
};

export default Submit;
