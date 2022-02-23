import { ApolloProvider } from "@apollo/client";
import { client } from "../apolloClient";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default MyApp;
