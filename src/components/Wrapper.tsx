import { Box } from "@chakra-ui/react";
import React, { FC } from "react";

type WrapperProps = {
  variant?: "small" | "regular";
};

const Wrapper: FC<WrapperProps> = ({ children, variant }) => {
  return (
    <Box
      mt={8}
      mx="auto"
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
