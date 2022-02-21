import { Flex, Text } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { BsFileText, BsLink45Deg } from "react-icons/bs";
import { IoImageOutline } from "react-icons/io5";
import { RiListOrdered } from "react-icons/ri";
import styled from "styled-components";
import { PostVariant } from "../types";

const Item = styled("div")<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
  width: 185px;
  font-weight: 600;
  border: 1px solid #edeff1;
  background-color: #fff;
  color: ${({ active }) => (active ? "#0079d3" : "#878a8c")};
  border-bottom: ${({ active }) => active && "2px solid #0079d3"};
  cursor: pointer;
  :hover {
    background-color: #f2f8fd;
  }
  :first-child {
    border-radius: 0.5rem 0 0 0;
  }
  :last-child {
    border-radius: 0 0.5rem 0 0;
  }
`;

type SelectPostVariantProps = {};

const RadioPostVariant: FC<SelectPostVariantProps> = () => {
  const [activeItem, setActiveItem] = useState<PostVariant>(PostVariant.post);

  const handleClick = (value: PostVariant) => () => {
    setActiveItem(value);
  };
  return (
    <Flex>
      <Item
        active={activeItem === PostVariant.post}
        onClick={handleClick(PostVariant.post)}
      >
        <BsFileText size="1.5rem" />
        <Text ml="0.45rem">{PostVariant.post}</Text>
      </Item>
      <Item
        active={activeItem === PostVariant.media}
        onClick={handleClick(PostVariant.media)}
      >
        <IoImageOutline size="1.5rem" />
        <Text ml="0.45rem">{PostVariant.media}</Text>
      </Item>
      <Item
        active={activeItem === PostVariant.link}
        onClick={handleClick(PostVariant.link)}
      >
        <BsLink45Deg size="1.5rem" />
        <Text ml="0.45rem">{PostVariant.link}</Text>
      </Item>
      <Item
        active={activeItem === PostVariant.poll}
        onClick={handleClick(PostVariant.poll)}
      >
        <RiListOrdered size="1.5rem" />
        <Text ml="0.45rem">{PostVariant.poll}</Text>
      </Item>
    </Flex>
  );
};

export default RadioPostVariant;
