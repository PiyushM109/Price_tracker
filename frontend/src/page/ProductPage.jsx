import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
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
import TypingText from "../components/TypingText";

const ProductPage = () => {
  const [productInfo, setProductInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const { prodId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    fetch("http://localhost:3000/auth/user", { credentials: "include" })
      .then((res) => res.json())
      .then((userData) => {
        if (userData._id) {
          setUser(userData);
        }
        // Fetch product data
        return axios.get(`http://localhost:3000/product/${prodId}`);
      })
      .then((response) => {
        setProductInfo(response.data);
        setLoading(false);
      })
      .catch((_) => {
        setError("Failed to load product details. Please try again later.");
        setLoading(false);
      });
  }, [prodId]);

  if (loading) {
    return (
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="h-96 w-full rounded-xl" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-4">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-24" />
            </div>
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
        </div>

        <div className="mt-8">
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <Alert variant="destructive" className="bg-red-900/20 border-red-500">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!productInfo) {
    return (
      <div className="container py-8">
        <Alert className="bg-dark-800 border-dark-700">
          <AlertTitle>Product not found</AlertTitle>
          <AlertDescription>
            The product you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Calculate price difference
  const priceDiff = productInfo.originalPrice - productInfo.currPrice;
  const discountPercent = (
    (priceDiff / productInfo.originalPrice) *
    100
  ).toFixed(0);

  return (
    <div className="container py-8">
      <Button
        variant="ghost"
        className="mb-6 text-gray-400 hover:text-white flex items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
              {user && (
                <Button
                  variant="outline"
                  className="border-dark-700 text-white hover:bg-dark-800 px-6 py-3 rounded-lg text-base backdrop-blur-sm"
                >
                  <Bell className="mr-2 h-5 w-5" />
                  Set Alert
                </Button>
              )}
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

            {!user && (
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4 text-white">
                  Track This Product
                </h2>
                <p className="text-gray-300 mb-4">
                  <TypingText
                    text="Sign in to get notified when the price drops or the product goes on sale. Start tracking to never miss a deal!"
                    speed={30}
                  />
                </p>
                <Button
                  className="w-full py-6 text-lg rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
                  onClick={() => navigate("/login")}
                >
                  <Bell className="mr-2 h-5 w-5" />
                  Sign In to Track This Product
                </Button>
              </div>
            )}
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
    </div>
  );
};

export default ProductPage;
