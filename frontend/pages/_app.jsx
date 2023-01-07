import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0);

  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
  }, []);

  return (
    <>
      <ToastContainer />
      <LoadingBar
        color="#d32f2f"
        progress={progress}
        height={3}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
      {Component.getLayout ? (
        <Component {...pageProps} />
      ) : (
        <>
          <Navbar progress={progress} />
          <main>
            <Component {...pageProps} />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
