const ProductCard = ({ product }) => {
  return (
    <div className="m-4 p-1 w-[300px] h-[400px] bg-white rounded-xl drop-shadow-sm hover:cursor-pointer">
      <img
        className="w-[80%] h-[50%] mx-auto my-3 rounded-2xl drop-shadow-sm"
        alt="Product Image"
        src={product?.image}
      />
      <h3 className="mx-2 font-serif  text-black">{product?.title}</h3>
      <div className="mx-2 flex justify-between">
        <h3 className="my-1 font-serif font-semibold text-sm text-black">
          Current : {product?.currency}
          {product?.currPrice == null
            ? product?.originalPrice
            : product?.currPrice}
        </h3>
        <h3 className="my-1 font-serif font-semibold text-sm text-black">
          Lowest : {product?.currency}
          {product?.lowestPrice}
        </h3>
      </div>
    </div>
  );
};
export default ProductCard;
