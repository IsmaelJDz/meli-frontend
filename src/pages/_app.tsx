import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import NProgress from "nprogress";
import Router from "next/router";

import { HomeProvider } from "@/context/HomeProvider";

const queryClient = new QueryClient();

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <HomeProvider>
          <ToastContainer
            pauseOnFocusLoss={false}
            hideProgressBar={false}
            newestOnTop={false}
            position="top-right"
            autoClose={3000}
            closeOnClick
            limit={1}
            rtl={false}
            draggable
            pauseOnHover
          />
          <Component {...pageProps} />
        </HomeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
