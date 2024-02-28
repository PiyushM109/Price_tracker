import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

function GetAllProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/allProduct")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="w-[100%]">
      <div className="w-10/12 m-auto">
        <h1 className="mx-4 font-serif text-base font-semibold">
          Trending Products🔥
        </h1>
        <div className="m-2 p-2 flex flex-wrap justify-evenly">
          {products.slice(0, 6).map((product) => (
            <Link
            className="link"
            key={product._id}
            to={"/product/" + product._id}
          >
            <ProductCard  product={product}/>
          </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GetAllProducts;
