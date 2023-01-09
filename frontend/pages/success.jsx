import Link from "next/link";
import runFireworks from "../utility/runFireworks";
import { useEffect } from "react";

const Success = () => {
  useEffect(() => {
    runFireworks();

    localStorage.removeItem("cart");
  }, []);

  return (
    <div className="m-10 text-center space-y-8 relative">
      <div className="mx-auto w-full text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-40 h-40 md:w-60 md:h-60 mx-auto text-green-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
          />
        </svg>
      </div>
      <h2 className="text-3xl text-green-600 font-semibold">
        Thank your for ordering!
      </h2>
      <p className="text-2xl font-semibold">Order successful</p>
      <p className="text-gray-500">You've successfully ordered the items.</p>
      <div className="flex items-center gap-4 justify-center">
        <Link href="/">
          <button className="px-8 py-4 rounded-lg bg-pink-500 hover:bg-pink-600 active:bg-pink-700 text-white my-4 font-semibold">
            Continue Shopping
          </button>
        </Link>
        <Link href="/orders">
          <button className="px-8 py-4 rounded-lg bg-pink-500 hover:bg-pink-600 active:bg-pink-700 text-white my-4 font-semibold">
            Your Orders
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
