// pages/_app.tsx
import "react-toastify/dist/ReactToastify.css";
import "../app/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}
export default MyApp;
