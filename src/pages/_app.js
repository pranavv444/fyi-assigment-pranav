import "@/styles/globals.css";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
const Layout = dynamic(() => import("@/components/Layout/Layout"), {
  ssr: false,
});
export default function App({ Component, pageProps }) {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
