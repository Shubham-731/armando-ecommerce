import axios from "axios";
import NotFoundComp from "../../components/NotFoundComp";

const Product = ({ product }) => {
  return (
    <>
      {JSON.stringify(product) === "{}" || product === null ? (
        <NotFoundComp />
      ) : (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-36 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap items-center">
              <img
                alt="ecommerce"
                className="lg:w-[400px] w-full lg:h-[400px] h-64 object-cover object-center rounded"
                src={`${process.env.NEXT_PUBLIC_API_HOST}${product.attributes.image.data.attributes.url}`}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {product.attributes.title}
                </h1>

                <div className="flex items-center justify-between">
                  <p className="text-gray-500 my-2">
                    Stock:{" "}
                    <span className="font-semibold">
                      {product.attributes.stock}
                    </span>
                  </p>
                  <p className="text-gray-500 my-2">
                    Category:{" "}
                    <span className="font-semibold capitalize">
                      {product.attributes.category}
                    </span>
                  </p>
                </div>

                <p className="leading-relaxed">
                  {product.attributes.description}
                </p>
                <div className="border-b-2 border-gray-100 my-5"></div>

                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ${product.attributes.price}
                  </span>
                  <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Product;

export async function getServerSideProps(context) {
  try {
    const serverUrl = `${
      process.env.NEXT_PUBLIC_API_HOST
    }/api/products/${parseInt(context.params.productid)}?populate=*`;

    const { data } = await axios.get(serverUrl, {
      headers: {
        "content-type": "application/json",
      },
    });

    if (data) {
      return {
        props: {
          product: data.data,
        },
      };
    }

    return {
      props: {
        product: {},
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        product: {},
      },
    };
  }
}
