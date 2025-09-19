import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Share,
  Star,
  TrendingDown,
  TrendingUp,
  ArrowDown,
  ArrowUp,
  ShoppingCart,
  AlertCircle,
  Bell,
  RotateCcw,
  ArrowLeft,
} from "lucide-react";
import PriceCard from "../components/PriceCard";
import { motion } from "framer-motion";
import TypingText from "../components/TypingText";
import scrapeAndStoreProduct from "../../lib/actions";
import { getToken } from "../lib/authUtil";
import axios from "axios";

const TrackProduct = () => {
  const [searchProduct, setSearchProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [productInfo, setProductInfo] = useState({});
  const [fetched, setFetched] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const isValidAmazonUrl = (link) => {
    try {
      const parsedUrl = new URL(link);
      const hostname = parsedUrl.hostname;
      if (
        hostname.includes("amazon.com") ||
        hostname.includes("amazon.in") ||
        hostname.includes(".amazon.")
      ) {
        return true;
      }
    } catch {
      return false;
    }
    return false;
  };

  const handleTrackProduct = async () => {
    try {
      setIsLoading(true);
      const token = await getToken();
      const resp = await axios.post(
        "/data/startTracking",
        { product: productInfo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (resp.data.success) {
        setFetched(false);
        setProductInfo({});
        navigate(`/product/${resp.data.product._id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    const isValid = isValidAmazonUrl(searchProduct);
    if (!isValid) {
      setSearchProduct("");
      return alert("Please provide valid product link");
    }
    try {
      setIsLoading(true);
      const product = await scrapeAndStoreProduct(searchProduct);
      if (product) {
        setFetched(true);
        setProductInfo(product);
      }
    } catch {
      alert("Failed to fetch product. Please try again later.");
    } finally {
      setIsLoading(false);
      setSearchProduct("");
    }
  };

  if (fetched) {
    var priceDiff = productInfo.originalPrice - productInfo.currPrice;
    var discountPercent = (
      (priceDiff / productInfo.originalPrice) *
      100
    ).toFixed(0);
  }
  console.log(fetched);
  if (!fetched) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="bg-dark-800/50 border-dark-700 rounded-xl shadow-lg backdrop-blur-sm mt-6">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-white mb-2">
                Track a New Product
              </CardTitle>
              <CardDescription className="text-gray-400 text-lg">
                Enter an Amazon product URL to start tracking its price
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      value={searchProduct}
                      onChange={(e) => setSearchProduct(e.target.value)}
                      placeholder="Paste Amazon product URL here..."
                      className="bg-dark-800/50 border-dark-700 text-white placeholder:text-gray-400 h-12 backdrop-blur-sm text-lg"
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 h-12 border-dark-700 text-white hover:bg-dark-800"
                    disabled={searchProduct === "" || isLoading}
                    onClick={handleSubmit}
                  >
                    {isLoading ? "Tracking..." : "Track Price"}
                  </Button>
                </div>

                <div className="bg-dark-800/30 rounded-lg p-4 border border-dark-700">
                  <h3 className="font-semibold text-white mb-2">
                    How it works:
                  </h3>
                  <ul className="text-gray-400 space-y-1 text-sm">
                    <li>
                      • Paste any Amazon product URL in the input field above
                    </li>
                    <li>
                      • We'll track the price and notify you of any changes
                    </li>
                    <li>• View price history and set custom alerts</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      {/* Product Image */}
      <div className="slide-in-left">
        <Card className="bg-dark-800/50 border-dark-700 rounded-xl shadow-lg overflow-hidden backdrop-blur-sm">
          <div className="p-8 flex justify-center">
            <img
              src={productInfo.image}
              alt={productInfo.title}
              className="max-h-[500px] object-contain transition-all duration-500 hover:scale-105"
              onError={(e) => {
                e.target.src = "/src/assets/logo.svg";
              }}
            />
          </div>
        </Card>
      </div>

      {/* Product Details */}
      <div className="slide-in-right">
        <div className="sticky top-8">
          <h1 className="text-3xl font-bold mb-4 text-white">
            {productInfo.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge
              variant={productInfo.isOutOfStock ? "destructive" : "success"}
              className="py-1 px-3 rounded-full text-sm"
            >
              {productInfo.isOutOfStock ? "Out of Stock" : "In Stock"}
            </Badge>
            {discountPercent > 0 && (
              <Badge
                variant="success"
                className="flex items-center gap-1 py-1 px-3 rounded-full text-sm bg-gradient-to-r from-green-500 to-emerald-500"
              >
                <TrendingDown className="h-3 w-3" />
                {discountPercent}% OFF
              </Badge>
            )}
            <Badge
              variant="outline"
              className="text-gray-300 border-gray-600 py-1 px-3 rounded-full text-sm"
            >
              {productInfo.users?.length || 0} people tracking
            </Badge>
          </div>

          <div className="flex items-baseline gap-4 mb-6">
            <p className="text-3xl font-bold text-primary-400">
              {productInfo.currency} {productInfo.currPrice?.toFixed(2)}
            </p>
            {productInfo.originalPrice !== productInfo.currPrice && (
              <p className="line-through text-gray-400 text-xl">
                {productInfo.currency} {productInfo.originalPrice?.toFixed(2)}
              </p>
            )}
            {discountPercent > 0 && (
              <p className="text-green-500 font-semibold">
                You save {productInfo.currency} {priceDiff.toFixed(2)}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <Button
              className="px-6 py-3 rounded-lg text-base bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
              onClick={() => window.open(productInfo.url, "_blank")}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Buy Now on Amazon
            </Button>
            <Button
              variant="outline"
              className="border-dark-700 text-white hover:bg-dark-800 px-6 py-3 rounded-lg text-base backdrop-blur-sm"
            >
              <Share className="mr-2 h-5 w-5" />
              Share
            </Button>
          </div>

          <Card className="bg-dark-800/50 border-dark-700 rounded-lg mb-8 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 p-2 rounded-full mr-3">
                    <Star className="text-yellow-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      {productInfo.stars || 4.5} out of 5
                    </p>
                    <p className="text-gray-400 text-sm">
                      {productInfo.reviewsCount || 1000} reviews
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-400 hover:text-primary-300"
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-white">
              Track This Product
            </h2>
            <Button
              className="w-full py-6 text-lg rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
              onClick={handleTrackProduct}
            >
              <Bell className="mr-2 h-5 w-5" />
              Track This Product
            </Button>
          </div>
        </div>
      </div>

      {/* Price History Cards */}
      <div className="lg:col-span-2 slide-up">
        <Card className="bg-dark-800/50 border-dark-700 rounded-xl shadow-lg mt-8 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-white flex items-center">
              <TrendingUp className="mr-2 h-6 w-6 text-primary-400" />
              Price Analysis
            </CardTitle>
            <p className="text-gray-400">
              Historical price data and trends for this product
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <PriceCard
                tag="Current Price"
                icon={<TrendingDown className="text-blue-500" />}
                price={productInfo.currPrice}
              />
              <PriceCard
                tag="Average Price"
                icon={<TrendingUp className="text-gray-400" />}
                price={
                  productInfo.averagePrice ||
                  (productInfo.lowestPrice + productInfo.highestPrice) / 2
                }
              />
              <PriceCard
                tag="Lowest Price"
                icon={<ArrowDown className="text-green-500" />}
                price={productInfo.lowestPrice}
                isLowest={true}
              />
              <PriceCard
                tag="Highest Price"
                icon={<ArrowUp className="text-red-500" />}
                price={
                  productInfo.highestPrice > productInfo.originalPrice
                    ? productInfo.highestPrice
                    : productInfo.originalPrice
                }
                isHighest={true}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrackProduct;
