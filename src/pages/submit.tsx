import { Box, Typography, Divider } from "@mui/material";
import { NextPage } from "next";
import { useState, useCallback } from "react";
import styled from "styled-components";
import CommunitySelect from "../components/CommunitySelect";
import CreatePostForm from "../components/CreatePostForm";
import Layout from "../components/Layout";
import RadioPostVariant from "../components/RadioPostVariant";

// const Container = styled("div")`
//   background-color: #fff;
//   display: flex;
//   flex-direction: column;
//   border-radius: 0.5rem;
// `;

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
        <Typography variant="h2">Create Post</Typography>
        <Divider />
        <CommunitySelect onChange={handleChange} />
        <Box>
          <RadioPostVariant />
          <CreatePostForm selectedCommunity={selectedCommunity} />
        </Box>
      </Box>
    </Layout>
  );
};

export default Submit;
