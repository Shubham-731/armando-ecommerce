import Link from "next/link";

const Order = ({ data, status, amount }) => {
  return (
    <>
      {data.map(({ product }) => {
        return (
          <div
            className="p-4 flex items-center gap-3 md:gap-6 w-full"
            key={product.id}
          >
            <div className="relative w-1/2">
              <img
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_HOST}${product.attributes.image.data.attributes.url}`}
                alt={product.attributes.image.data.attributes.name}
                className="w-full max-h-[400px]"
              />
            </div>

            <div className="space-y-2 relative w-3/4">
              <h4 className="font-semibold text-xl capitalize">
                {product.attributes.title}
              </h4>
              <p className="text-sm md:text-base leading-4 text-gray-500 capitalize">
                {product.attributes.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-blue-600 font-semibold text-sm md:text-base">
                  <Link href={`/products/${product.id}`}>View Product</Link>
                </span>
              </div>

              <div className="flex w-full items-center justify-between border-t pt-2">
                <p className="font-bold text-green-700 text-lg capitalize">
                  {status}
                </p>
                <p className="font-semibold text-lg">
                  Total Amount: <span className="text-pink-500">${amount}</span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Order;
