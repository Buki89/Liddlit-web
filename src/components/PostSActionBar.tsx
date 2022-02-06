import React, { VFC } from "react";

import styled from "styled-components";
import PostsSortVariants from "../containers/PostsSortVariants";
import SelectViewVariant from "./SelectViewVariant";

const Container = styled("div")`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  display: flex;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  align-items: center;
`;

const PostsActionBar: VFC = () => {
  return (
    <Container>
      <PostsSortVariants />
      <SelectViewVariant />
    </Container>
  );
};

export default PostsActionBar;
