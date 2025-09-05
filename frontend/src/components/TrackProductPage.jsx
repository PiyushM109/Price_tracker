import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { motion } from "framer-motion";
import { Search, Package, TrendingDown, ShoppingCart } from "lucide-react";

const TrackProductPage = () => {
  const [searchProduct, setSearchProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = async () => {
    const isValid = isValidAmazonUrl(searchProduct);
    if (!isValid) {
      setSearchProduct("");
      return alert("Please provide valid product link");
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/scrape?url=${encodeURIComponent(searchProduct)}`,
        { credentials: "include" }
      );
      const product = await response.json();
      if (product && product._id) {
        navigate(`/product/${product._id}`);
      }
    } catch {
      alert("Failed to fetch product. Please try again later.");
    } finally {
      setIsLoading(false);
      setSearchProduct("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="bg-dark-800/50 border-dark-700 rounded-xl shadow-lg backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg p-3">
                <Package className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-white">Track a Product</CardTitle>
            <CardDescription className="text-gray-400 text-lg">
              Paste an Amazon product URL to start tracking its price
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
                    className="bg-dark-800/50 border-dark-700 text-white placeholder:text-gray-400 h-12 text-lg backdrop-blur-sm"
                  />
                </div>
                <Button
                  className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 h-12 text-lg glow hover:glow-lg"
                  disabled={searchProduct === "" || isLoading}
                  onClick={handleSubmit}
                >
                  {isLoading ? "Tracking..." : "Track Price"}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-dark-800/30 p-4 rounded-lg border border-dark-700">
                  <Search className="h-6 w-6 text-primary-400 mb-2" />
                  <h3 className="font-semibold text-white mb-1">Find Product</h3>
                  <p className="text-sm text-gray-400">
                    Paste any Amazon product URL to begin tracking
                  </p>
                </div>
                <div className="bg-dark-800/30 p-4 rounded-lg border border-dark-700">
                  <TrendingDown className="h-6 w-6 text-primary-400 mb-2" />
                  <h3 className="font-semibold text-white mb-1">Track Prices</h3>
                  <p className="text-sm text-gray-400">
                    We'll monitor the price and alert you to drops
                  </p>
                </div>
                <div className="bg-dark-800/30 p-4 rounded-lg border border-dark-700">
                  <ShoppingCart className="h-6 w-6 text-primary-400 mb-2" />
                  <h3 className="font-semibold text-white mb-1">Save Money</h3>
                  <p className="text-sm text-gray-400">
                    Buy at the best price with our notifications
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TrackProductPage;