import axios from "axios";

import ProductCard from "../components/Cards/ProductCard";

export default function Home({ products, cart, addToCart }) {
  return (
    <section>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">
            Customers also purchased
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard
                product={product}
                key={product.id}
                cart={cart}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  try {
    const serverUrl = `${process.env.NEXT_PUBLIC_API_HOST}/api/products?populate=*`;
    const { data } = await axios.get(serverUrl, {
      headers: {
        "content-type": "application/json",
      },
    });

    if (data) {
      return {
        props: {
          products: data.data,
        },
      };
    }

    return {
      props: {
        products: [],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        products: [],
      },
    };
  }
}
