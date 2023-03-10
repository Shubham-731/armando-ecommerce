import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import toastOptions from "../utility/toastOptions";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0);
  const [cart, setCart] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });

    const productsInCart = localStorage.getItem("cart");
    if (productsInCart) {
      setCart(JSON.parse(productsInCart));
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, []);

  // Add products to cart
  const addToCart = (product) => {
    if (!cart.some((item) => item.product.id === product.id)) {
      let newCart = cart;
      newCart.push({ product });
      setCart(newCart);
      setRefreshKey(Math.random());

      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Product added to cart!", toastOptions);
    } else {
      toast.warning("Product already exists in cart!", toastOptions);
    }
  };

  // Remove the product from cart
  const removeProduct = (productId) => {
    const modifiedCart = cart.filter(({ product }) => product.id !== productId);

    setCart(modifiedCart);
    setRefreshKey(Math.random());

    localStorage.setItem("cart", JSON.stringify(modifiedCart));
  };

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
          <Navbar
            progress={progress}
            cartLen={cart.length}
            productsInCart={cart}
            removeProduct={removeProduct}
            key={refreshKey}
          />
          <main>
            <Component {...pageProps} cart={cart} addToCart={addToCart} />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
