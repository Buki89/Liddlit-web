import React, { FC } from "react";
import styled from "styled-components";
import {
  Button as ButtonBase,
  ButtonProps as ButtonBaseProps,
} from "@chakra-ui/react";

type Variant = "primary" | "secondary";

const StyledButton = styled(ButtonBase)<{ $variant: Variant }>`
  background-color: ${({ $variant }) =>
    $variant === "primary" ? "#1379d3" : "#fff"};
  border-radius: 2rem;
  color: ${({ $variant }) => ($variant === "primary" ? "#fff" : "#147ad3")};
  padding: 0.5rem 1rem;
  font-weight: 700;
  border: 1px solid #1379d3;
  text-align: center;
  :hover {
    background-color: ${({ $variant }) =>
      $variant === "primary" ? "#1884d6" : "#f5fafd"};
    text-decoration: none;
  }
  :focus,
  :active {
    box-shadow: none;
  }
`;

type ButtonProps = {
  customVariant: Variant;
} & ButtonBaseProps;

const Button: FC<ButtonProps> = ({
  children,
  customVariant,
  isFullWidth,
  ...rest
}) => {
  return (
    <StyledButton {...rest} $variant={customVariant}>
      {children}
    </StyledButton>
  );
};

export default Button;
