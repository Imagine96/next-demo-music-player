import "../styles/globals.css";
import ChakraThemeProvider from "../src/components/ChakraProvider";
import Layout from "../src/components/Layout/Layout";
import { StoreProvider } from "easy-peasy";
import { store } from "../src/lib/store";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraThemeProvider>
      <StoreProvider store={store} >
        {Component.authPage
          ? <Component {...pageProps} /> :
          (<Layout>
            <Component {...pageProps} />
          </Layout>)
        }
      </StoreProvider>
    </ChakraThemeProvider>
  );
};

export default MyApp;
