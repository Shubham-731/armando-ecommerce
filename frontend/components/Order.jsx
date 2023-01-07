import Link from "next/link";

const Order = ({ data }) => {
  return (
    <div className="p-4 flex items-center gap-3 md:gap-6 w-full">
      <div className="relative w-1/2">
        <img src={data.image} alt={data.productName} className="w-full" />
      </div>

      <div className="space-y-2 relative w-3/4">
        <h4 className="font-semibold text-xl capitalize">{data.productName}</h4>
        <p className="text-sm md:text-base leading-4 text-gray-500 capitalize">
          {data.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-blue-600 font-semibold text-sm md:text-base">
            <Link href={`/products/backlit-keyboard`}>View Product</Link>
          </span>
          <span className="text-blue-600 font-semibold text-sm md:text-base">
            <Link href={`/orders/backlit-keyboard`}>View Order Details</Link>
          </span>
        </div>

        <div className="flex w-full items-center justify-between border-t pt-2">
          <p className="font-bold text-green-700 text-lg capitalize">
            {data.status}
          </p>
          <p className="font-semibold text-lg">
            Amount: <span className="text-pink-500">${data.price}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Order;
