import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Verdana','Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  colors: {
    black: "#16161D",
    blue: "#1379d3",
    lighterBlue: "#1884d6",
  },
  fonts,
  breakpoints,

  styles: {
    global: {
      body: {
        bg: "#dae0e6",
        color: "#000",
        fontFamily: "Verdana",
      },
    },
  },
});

export default theme;
