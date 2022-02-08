import { Box } from "@chakra-ui/react";
import React, { FC } from "react";

type WrapperProps = {
  variant?: "small" | "regular";
};

const Wrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <Box mt={4} mx="auto" w="100%">
      {children}
    </Box>
  );
};

export default Wrapper;
