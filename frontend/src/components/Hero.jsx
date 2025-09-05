import { useState } from "react";
import scrapeAndStoreProduct from "../../lib/actions";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import TypingText from "./TypingText";

const Hero = () => {
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
      if(product){
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
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div 
          className="lg:w-1/2 text-center lg:text-left slide-in-left"
        >
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
          >
            Track Amazon Prices <span className=" text-transparent bg-clip-text text-white">Like a Pro</span>
          </h1>
          
          <p 
            className="text-lg md:text-xl mb-8 text-gray-300"
          >
            <TypingText 
              text="Never overpay for your favorite products. Get real-time price tracking, alerts, and history for any Amazon item." 
              speed={30}
            />
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <div className="flex-1">
              <Input
                value={searchProduct}
                onChange={(e) => setSearchProduct(e.target.value)}
                placeholder="Paste Amazon product URL here..."
                className="bg-dark-800/50 border-dark-700 text-white placeholder:text-gray-400 h-12 backdrop-blur-sm"
              />
            </div>
            <Button
              className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 h-12 glow hover:glow-lg"
              disabled={searchProduct === "" || isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? "Tracking..." : "Track Price"}
            </Button>
          </div>
          
          <div 
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <div className="flex items-center gap-2 bg-dark-800/50 px-4 py-2 rounded-full backdrop-blur-sm border border-dark-700">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Real-time tracking</span>
            </div>
            <div className="flex items-center gap-2 bg-dark-800/50 px-4 py-2 rounded-full backdrop-blur-sm border border-dark-700">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Price alerts</span>
            </div>
            <div className="flex items-center gap-2 bg-dark-800/50 px-4 py-2 rounded-full backdrop-blur-sm border border-dark-700">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Price history</span>
            </div>
          </div>
        </div>
        
        {/* Right Content - Illustration */}
        <div 
          className="lg:w-1/2 flex justify-center slide-in-right"
        >
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-primary-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="relative bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700 shadow-2xl">
              <div className="bg-gradient-to-br from-dark-700 to-dark-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-dark-600 border-2 border-dashed border-dark-500 rounded-xl w-16 h-16 flex items-center justify-center">
                    <div className="bg-gradient-to-br from-primary-400 to-secondary-400 w-10 h-10 rounded-lg"></div>
                  </div>
                  <div>
                    <div className="h-4 bg-dark-600 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-dark-600 rounded w-24"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="h-3 bg-dark-600 rounded w-16 mb-1"></div>
                    <div className="h-6 bg-gradient-to-r from-green-500 to-emerald-400 rounded w-24"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 w-8 bg-dark-600 rounded-full"></div>
                    <div className="h-8 w-8 bg-dark-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div 
              className="absolute -top-6 -right-6 bg-dark-800/80 backdrop-blur-sm rounded-full p-4 shadow-lg border border-dark-700"
            >
              <div className="text-green-500 font-bold">-25%</div>
            </div>
            
            <div 
              className="absolute -bottom-6 -left-6 bg-dark-800/80 backdrop-blur-sm rounded-full p-4 shadow-lg border border-dark-700"
            >
              <div className="text-blue-500 font-bold">Alert</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats section */}
      <div 
        className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        <div className="text-center bg-dark-800/30 p-6 rounded-xl backdrop-blur-sm border border-dark-700 hover:border-primary-500 transition-all duration-300">
          <div className="text-3xl font-bold text-primary-400 mb-2">10K+</div>
          <div className="text-gray-400">Products Tracked</div>
        </div>
        <div className="text-center bg-dark-800/30 p-6 rounded-xl backdrop-blur-sm border border-dark-700 hover:border-primary-500 transition-all duration-300">
          <div className="text-3xl font-bold text-primary-400 mb-2">50K+</div>
          <div className="text-gray-400">Price Alerts</div>
        </div>
        <div className="text-center bg-dark-800/30 p-6 rounded-xl backdrop-blur-sm border border-dark-700 hover:border-primary-500 transition-all duration-300">
          <div className="text-3xl font-bold text-primary-400 mb-2">99.9%</div>
          <div className="text-gray-400">Accuracy</div>
        </div>
        <div className="text-center bg-dark-800/30 p-6 rounded-xl backdrop-blur-sm border border-dark-700 hover:border-primary-500 transition-all duration-300">
          <div className="text-3xl font-bold text-primary-400 mb-2">24/7</div>
          <div className="text-gray-400">Monitoring</div>
        </div>
      </div>
    </div>
  );
};

export default Hero;