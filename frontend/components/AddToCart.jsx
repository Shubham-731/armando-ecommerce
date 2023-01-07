const AddToCart = ({ product, handleCart }) => {
  return (
    <button
      onClick={() => handleCart(product)}
      className="w-full cursor-pointer mt-1 py-2 text-white font-semibold rounded-md bg-pink-500  active:bg-pink-700"
    >
      Add to cart
    </button>
  );
};

export default AddToCart;
