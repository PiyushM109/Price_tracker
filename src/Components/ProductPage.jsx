import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import ShareIcon from "@mui/icons-material/Share";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import CommentIcon from "@mui/icons-material/Comment";
import PriceCard from "./PriceCard";
import DiscountIcon from "@mui/icons-material/Discount";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Modal from "./Modal";

const ProductPage = () => {
  const [productInfo, setProductInfo] = useState(null);
  const { prodId } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:3000/product/" + prodId)
      .then((response) => {
        console.log(response.data);
        setProductInfo(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (productInfo == null) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-9/12 bg-white mt-2 m-auto p-4 rounded-lg drop-shadow-md">
      <div className="flex flex-wrap justify-evenly">
        <div className="lg:w-[50%] p-10 rounded-lg drop-shadow-md">
          <img
            className="w-full"
            src={productInfo?.image}
            alt="Product Image"
          />
        </div>
        <div className="lg:w-[50%] py-10 px-5">
          <h1 className="font-bold font-serif my-2 text-xl text-wrap">
            {productInfo.title}
          </h1>
          <a className="bg-slate-50 inline-block my-3 py-1 px-2 rounded-lg hover:cursor-pointer">
            Visit Product
          </a>
          <div className="my-2">
            <div className="bg-pink-50 text-pink-300 text-xs inline-block  px-2 rounded-lg hover:cursor-pointer">
              <FavoriteBorderOutlinedIcon />
              100
            </div>
            <div className="bg-slate-100 text-slate-300 text-xs inline-block mx-2 px-2 rounded-md hover:cursor-pointer">
              <TurnedInNotIcon />
            </div>
            <div className="bg-slate-100 text-slate-300 text-xs inline-block  px-2 rounded-md hover:cursor-pointer">
              <ShareIcon />
            </div>
          </div>
          <hr className="h-1 mt-6 mb-4" />
          <div className="flex flex-nowrap">
            <h1 className="font-bold text-lg mx-2  inline-block">
              {productInfo.currency}
              {productInfo.currPrice}
            </h1>
            <div className="bg-yellow-50 text-yellow-300 text-xs mx-2 inline-block px-1 rounded-md hover:cursor-pointer">
              <StarOutlineIcon className="text-xs" />
              638
            </div>
            <div className="bg-slate-50 text-slate-400 text-xs inline-block mx-2 px-2 rounded-md hover:cursor-pointer">
              <CommentIcon /> 100 reviews
            </div>
          </div>
          <div>
            <h1 className="line-through mx-2  text-slate-500  inline-block">
              {productInfo.currency}
              {productInfo.originalPrice}
            </h1>
            <p className="text-xs ml-8 text-slate-400 inline-block">
              87% recommendation
            </p>
          </div>
          <hr className="h-1 mt-6 mb-4" />
          <div>
            <PriceCard
              tag={"Current Price"}
              icon={<DiscountIcon className="text-blue-400" />}
              price={productInfo.currPrice}
            />
            <PriceCard
              tag={"Average Price"}
              icon={<TrendingUpIcon className="text-slate-400" />}
              price={(productInfo.lowestPrice + productInfo.highestPrice) / 2}
            />
            <PriceCard
              tag={"Lowest Price"}
              icon={<KeyboardDoubleArrowDownIcon className="text-green-400" />}
              price={productInfo.lowestPrice}
            />
            <PriceCard
              tag={"Highest Price"}
              icon={<KeyboardDoubleArrowUpIcon className="text-red-400" />}
              price={productInfo.highestPrice>productInfo.originalPrice ? productInfo.highestPrice : productInfo.originalPrice}
            />
          </div>
          <div><Modal /></div>
        </div>
      </div>
      <hr className="h-2"/>
      <div className="flex justify-center p-2">
        <div className="inline-block bg-black text-white py-2 px-6 rounded-full hover:cursor-pointer hover:bg-slate-800">
        <LocalMallIcon /> Buy Now
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
