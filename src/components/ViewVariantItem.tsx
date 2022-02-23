import { Typography } from "@mui/material";
import React, { useCallback, VFC } from "react";
import styled from "styled-components";
import { ViewVariant } from "../types";

const ItemContainer = styled("div")`
  display: flex;
  user-select: none;
  padding: 0.25rem;
  :hover {
    background-color: #e9f5fc;
  }
`;

type ViewVariantItemProps = {
  viewVariant: ViewVariant;
  icon: JSX.Element;
  active: boolean;
  onClick: (variant: ViewVariant) => void;
};

const ViewVariantItem: VFC<ViewVariantItemProps> = ({
  viewVariant,
  icon,
  active,
  onClick,
}) => {
  const handleClick = useCallback(
    () => onClick(viewVariant),
    [viewVariant, onClick]
  );

  return (
    <ItemContainer onClick={handleClick}>
      {icon}
      <Typography color={active ? "#1379d3" : "#878a8c"}>
        {viewVariant}
      </Typography>
    </ItemContainer>
  );
};

export default ViewVariantItem;
