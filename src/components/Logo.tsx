import { Flex } from "@chakra-ui/react";
import React, { VFC } from "react";
import styled from "styled-components";

const Text = styled("p")`
  color: #000;
  font-size: 1.5rem;
  padding-top: 0.5rem;
`;
const Brackets = styled("p")`
  color: #f94502;
  font-size: 2rem;
  :first-child {
    margin-right: -0.25rem;
    margin-left: 0;
  }
  margin-left: -0.25rem;
`;

const Logo: VFC = () => {
  return (
    <Flex alignItems="center">
      <Brackets>{"{"}</Brackets>
      <Text>L</Text>
      <Brackets>{"}"}</Brackets>
      <Text>iddlit</Text>
    </Flex>
  );
};

export default Logo;
