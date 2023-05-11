// pages/_app.tsx
import "react-toastify/dist/ReactToastify.css";
import "../app/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { Callalertdialog } from "@/components/ui/callalertdialog";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Callalertdialog />
      <Component {...pageProps} />
      <ToastContainer />;
    </>
  );
}
export default MyApp;
