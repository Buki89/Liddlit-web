import React, { FC, useCallback } from "react";
import styled from "styled-components";
import { SortVariants } from "../containers/PostsSortVariants";

const Container = styled("div")<{ active: boolean }>`
  color: ${({ active }) => (active ? "#1379d3" : "#878a8c")};
  background-color: ${({ active }) => (active ? "#f6f7f8" : "#fff")};
  display: flex;
  align-items: center;
  border-radius: 1.25rem;
  padding: 0.5rem;
  margin-right: 1rem;
  user-select: none;
  :hover {
    background-color: #e5e6e7;
  }
`;

const Label = styled("p")<{ active: boolean }>`
  margin: 0 1rem;
  font-weight: 600;
`;

type SortBadgeProps = {
  label: SortVariants;
  active: boolean;
  icon: React.ReactNode;
  onClick: (variant: SortVariants) => void;
};

const SortBadge: FC<SortBadgeProps> = ({ label, icon, active, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(label);
  }, [label, onClick]);

  return (
    <Container active={active} onClick={handleClick}>
      {icon}
      <Label active={active}>{label}</Label>
    </Container>
  );
};

export default SortBadge;
