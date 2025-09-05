import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import GetAllProducts from "../components/GetAllProducts";
import ReviewsSection from "../components/ReviewsSection";
import TypingText from "../components/TypingText";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen  flex flex-col justify-center"
      >
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col w-full items-center justify-between gap-12">
            {/* Left Content */}
            <div className="text-center ">
              <h1 className="text-8xl font-bold mb-4 text-white uppercase">
                Track Prices{" "}
              </h1>
              {/* <h1 className="text-6xl font-bold  text-white mb-4 uppercase">
                Like a Pro
              </h1> */}

              <p className="text-lg md:text-xl mb-8 text-gray-300">
                <TypingText
                  text="Never overpay for your favorite products. Get real-time price tracking, alerts, and history for any Amazon item."
                  speed={30}
                />
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center ">
                <Button
                  variant="outline"
                  className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 h-12 border-dark-700 text-white hover:bg-dark-800"
                  onClick={() => navigate("/login")}
                >
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 h-12 border-dark-700 text-white hover:bg-dark-800"
                  onClick={() => navigate("/products")}
                >
                  View Products
                </Button>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex items-center gap-2 bg-dark-800/50 px-4 py-2 rounded-full backdrop-blur-sm border border-dark-700">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">
                    Real-time tracking
                  </span>
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
          </div>

          {/* Stats section */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center bg-dark-800/30 p-6 rounded-xl backdrop-blur-sm border border-dark-700 hover:border-primary-500 transition-all duration-300">
              <div className="text-3xl font-bold text-primary-400 mb-2">
                1K+
              </div>
              <div className="text-gray-400">Products Tracked</div>
            </div>
            <div className="text-center bg-dark-800/30 p-6 rounded-xl backdrop-blur-sm border border-dark-700 hover:border-primary-500 transition-all duration-300">
              <div className="text-3xl font-bold text-primary-400 mb-2">
                2K+
              </div>
              <div className="text-gray-400">Price Alerts</div>
            </div>
            <div className="text-center bg-dark-800/30 p-6 rounded-xl backdrop-blur-sm border border-dark-700 hover:border-primary-500 transition-all duration-300">
              <div className="text-3xl font-bold text-primary-400 mb-2">
                99.9%
              </div>
              <div className="text-gray-400">Accuracy</div>
            </div>
            <div className="text-center bg-dark-800/30 p-6 rounded-xl backdrop-blur-sm border border-dark-700 hover:border-primary-500 transition-all duration-300">
              <div className="text-3xl font-bold text-primary-400 mb-2">
                24/7
              </div>
              <div className="text-gray-400">Monitoring</div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="py-16 bg-dark-800/30 backdrop-blur-sm"
      >
        <div className="container">
          <ReviewsSection />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="py-16"
      >
        <GetAllProducts />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="py-16 bg-gradient-to-r from-dark-800/50 to-dark-900/50 backdrop-blur-sm"
      >
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Never Miss a Deal Again
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of savvy shoppers who save money by tracking Amazon
            prices with our powerful tool.
          </p>
          <Button
            className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate("/login")}
          >
            Start Tracking Now
          </Button>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
