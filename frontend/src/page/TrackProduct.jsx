import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { motion } from "framer-motion";
import TypingText from "../components/TypingText";
import scrapeAndStoreProduct from "../../lib/actions";

const TrackProduct = () => {
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
      const product = await scrapeAndStoreProduct(searchProduct);
      if (product) {
        navigate(`/product/${product?._id}`);
      }
    } catch {
      alert("Failed to fetch product. Please try again later.");
    } finally {
      setIsLoading(false);
      setSearchProduct("");
    }
  };

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
                <h3 className="font-semibold text-white mb-2">How it works:</h3>
                <ul className="text-gray-400 space-y-1 text-sm">
                  <li>
                    • Paste any Amazon product URL in the input field above
                  </li>
                  <li>• We'll track the price and notify you of any changes</li>
                  <li>• View price history and set custom alerts</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TrackProduct;
