import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import toastOptions from "../utility/toastOptions";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import shortid from "shortid";

export default function Cart({
  open,
  handleClose,
  productsInCart,
  removeProduct,
}) {
  const [cartPrice, setCartPrice] = useState(0);

  const router = useRouter();

  useEffect(() => {
    let price = 0;
    productsInCart.map(({ product }) => {
      price += product.attributes.price;
    });
    setCartPrice(price);
  }, []);

  const handleCheckout = async () => {
    try {
      // Check for JWT
      const JWT = localStorage.getItem("jwt");
      if (!JWT) {
        router.push("/auth/login");
      }

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_API_HOST}/api/orders/pre-transaction`,
        {
          products: productsInCart,
          orderId: `order_${shortid.generate()}`,
          amount: cartPrice,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT}`,
          },
        }
      );

      console.log(data);
      router.push(data);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error.message, toastOptions);
      }
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={handleClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                stokelinecap="round"
                                stokelinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        {productsInCart.length > 0 ? (
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {productsInCart.map(({ product }) => (
                                <li key={product.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_HOST}${product.attributes.image.data.attributes.url}`}
                                      alt={product.attributes.image.data.name}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={`/products/${product.id}`}>
                                            {product.attributes.title}
                                          </a>
                                        </h3>
                                        <p className="ml-4">
                                          ${product.attributes.price}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500 capitalize">
                                        {product.attributes.category}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">Qty: 1</p>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-pink-600 hover:text-pink-500"
                                          onClick={() =>
                                            removeProduct(
                                              product.id,
                                              product.attributes.price
                                            )
                                          }
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>
                          $<span>{cartPrice}</span>
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <button
                          className={`flex items-center justify-center rounded-md border border-transparent bg-pink-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-pink-600 w-full`}
                          onClick={handleCheckout}
                        >
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="font-medium text-pink-600 hover:text-pink-500"
                            onClick={handleClose}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
