import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { client } from "../apolloClient";
import theme from "../theme";

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default MyApp;
