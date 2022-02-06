import React, { useCallback, useState, VFC } from "react";
import { Box as Container, Divider } from "@chakra-ui/react";
import { VscChevronDown } from "react-icons/vsc";
import styled from "styled-components";
import { ViewVariant } from "../types";
import {
  CardIcon,
  ClassicIcon,
  CompactIcon,
  getViewVariantIcon,
} from "../utils/getViewIconVariant";
import ViewVariantItem from "./ViewVariantItem";

const Badge = styled("div")`
  color: #878a8c;
  background-color: #fff;
  display: flex;
  align-items: center;
  border-radius: 1.25rem;
  padding: 0.5rem;
  :hover {
    background-color: #e5e6e7;
  }
`;

const Menu = styled("div")<{ open: boolean }>`
  display: ${({ open }) => (open ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  border: 1px solid #edeff1;
  border-radius: 0.5rem;
  top: 2rem;
  right: -1.5rem;
  background-color: #fff;
`;

const isActive = (
  itemVariant: ViewVariant,
  currentVariant: ViewVariant
): string => {
  return itemVariant === currentVariant ? "#1379d3" : "#878a8c";
};

const SelectViewVariant: VFC = () => {
  const [viewVariant, setViewVariant] = useState<ViewVariant>(ViewVariant.card);
  const [open, setOpen] = useState<boolean>(false);

  const CurrentViewIcon = getViewVariantIcon(viewVariant);

  const openMenu = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleClick = useCallback(
    (value: ViewVariant) => {
      setViewVariant(value);
      setOpen(!open);
    },
    [open]
  );

  return (
    <Container
      position="relative"
      display="flex"
      flex="1"
      justifyContent="flex-end"
    >
      <Badge onClick={openMenu}>
        {CurrentViewIcon}
        <VscChevronDown color="#878a8c" />
      </Badge>
      <Menu open={open}>
        <ViewVariantItem
          viewVariant={ViewVariant.card}
          icon={<CardIcon color={isActive(ViewVariant.card, viewVariant)} />}
          onClick={handleClick}
          active={ViewVariant.card === viewVariant}
        />
        <Divider />
        <ViewVariantItem
          viewVariant={ViewVariant.classic}
          icon={
            <ClassicIcon color={isActive(ViewVariant.classic, viewVariant)} />
          }
          onClick={handleClick}
          active={ViewVariant.classic === viewVariant}
        />
        <Divider />
        <ViewVariantItem
          viewVariant={ViewVariant.compact}
          icon={
            <CompactIcon color={isActive(ViewVariant.compact, viewVariant)} />
          }
          onClick={handleClick}
          active={ViewVariant.compact === viewVariant}
        />
      </Menu>
    </Container>
  );
};

export default SelectViewVariant;
