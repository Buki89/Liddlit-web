import { Box } from "@mui/material";
import React, { FC } from "react";

type WrapperProps = {
  variant?: "small" | "regular";
};

const Wrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <Box mt={4} mx="auto" width="100%">
      {children}
    </Box>
  );
};

export default Wrapper;
