import Link from "next/link";
import AddToCart from "../AddToCart";

const ProductCard = ({ product }) => {
  return (
    <div className="group relative">
      <Link href={`/products/${product.id}`}>
        <div className="min-h-60 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
          <img
            src={`${process.env.NEXT_PUBLIC_API_HOST}${product.attributes.image.data?.attributes.url}`}
            alt={product.attributes.image.data?.attributes.name}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="my-2 flex justify-between">
          <div>
            <h3 className="text-base text-gray-700">
              {/* <span aria-hidden="true" className="absolute inset-0" /> */}
              {product.attributes.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500 capitalize">
              {product.attributes.category}
            </p>
          </div>
          <p className="text-sm font-medium text-gray-900">
            <span>$</span>
            {product.attributes.price}
          </p>
        </div>
      </Link>

      <AddToCart product={product} handleCart={handleCart} />
    </div>
  );
};

export default ProductCard;
