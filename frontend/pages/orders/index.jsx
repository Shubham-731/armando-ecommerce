import Link from "next/link";
import Order from "../../components/Order";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toastOptions from "../../utility/toastOptions";
import { toast } from "react-toastify";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const JWT = localStorage.getItem("jwt");

    if (!JWT) {
      router.push("/");
    }

    // Get orders
    const getOrders = async () => {
      const serverUrl = `${
        process.env.NEXT_PUBLIC_STRAPI_API_HOST
      }/api/orders?filters[email]=${JSON.parse(JWT).user.email}`;

      try {
        const { data } = await axios.get(serverUrl, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${JSON.parse(JWT).jwt}`,
          },
        });

        if (data.data) {
          setOrders(data.data);
        }
      } catch (error) {
        console.log(error);

        if (error.response) {
          toast.error(error.response.data.error.message, toastOptions);
        }
      }
    };

    getOrders();
  }, []);

  return (
    <div className="min-h-screen w-full py-10 px-8 md:px-0 max-w-6xl mx-auto">
      <div className="md:mb-10 mb-5">
        <h2 className="text-2xl font-semibold md:text-3xl">Your Orders</h2>
        <p className="text-sm md:text-base text-gray-500">
          Check the status of recent orders, manage returns and discover similar
          products
        </p>
      </div>

      <div className="flex items-center gap-4 flex-col divide-y divide-slate-300 space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <Order
              data={order.attributes.products}
              key={order.id}
              status={order.attributes.status}
              amount={order.attributes.amount}
            />
          ))
        ) : (
          <div className="my-10 w-full">
            <p className="text-xl font-semibold">No orders yet</p>
            <Link href="/">
              <button className="px-8 py-4 rounded-lg bg-pink-500 hover:bg-pink-600 active:bg-pink-700 text-white my-4 font-semibold">
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
