import Link from "next/link";
import Order from "../../components/Order";

const Orders = () => {
  const orders = [
    {
      id: 1,
      image:
        "https://rukminim1.flixcart.com/image/400/400/kv5kfww0/keyboard/gaming-keyboard/l/u/r/cb-gk-22-veritas-tkl-rgb-sonic-spectrum-cosmicbyte-original-imag84y3zqvabfqp.jpeg?q=70",
      productName: "Backlit keyboard",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. In atque nemo
          iure odio id commodi sed porro quia! Sint repellat dolores
          consequuntur porro voluptatibus quas aspernatur vel cumque libero
          adipisci.`,
      status: "pending",
      price: 49,
    },
    {
      id: 3,
      image:
        "https://rukminim1.flixcart.com/image/400/400/kv5kfww0/keyboard/gaming-keyboard/l/u/r/cb-gk-22-veritas-tkl-rgb-sonic-spectrum-cosmicbyte-original-imag84y3zqvabfqp.jpeg?q=70",
      productName: "Backlit keyboard",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. In atque nemo
          iure odio id commodi sed porro quia! Sint repellat dolores
          consequuntur porro voluptatibus quas aspernatur vel cumque libero
          adipisci.`,
      status: "placed",
      price: 49,
    },
    {
      id: 2,
      image:
        "https://rukminim1.flixcart.com/image/400/400/kv5kfww0/keyboard/gaming-keyboard/l/u/r/cb-gk-22-veritas-tkl-rgb-sonic-spectrum-cosmicbyte-original-imag84y3zqvabfqp.jpeg?q=70",
      productName: "Backlit keyboard",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. In atque nemo
          iure odio id commodi sed porro quia! Sint repellat dolores
          consequuntur porro voluptatibus quas aspernatur vel cumque libero
          adipisci.`,
      status: "delivered",
      price: 49,
    },
  ];

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
        {orders.map((data) => {
          return <Order data={data} key={data.id} />;
        })}
      </div>
    </div>
  );
};

export default Orders;
