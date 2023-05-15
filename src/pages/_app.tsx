// pages/_app.tsx
import "react-toastify/dist/ReactToastify.css";
import "../app/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { CountdownProvider } from "@/components/ui/CountdownContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CountdownProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </CountdownProvider>
    </>
  );
}
export default MyApp;
