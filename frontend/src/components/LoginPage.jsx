import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { Package, TrendingUp, Bell, BarChart3 } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = "/auth/google";
  };

  useEffect(() => {
    // Check if user is already logged in
    fetch("/auth/user", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data._id) {
          navigate("/products");
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-900 to-dark-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-dark-800/50 border-dark-700 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg p-3">
                <Package className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Welcome to PriceTracker
            </CardTitle>
            <CardDescription className="text-gray-400">
              Sign in to track Amazon prices and get notified when prices drop
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Button
                onClick={handleGoogleLogin}
                className="w-full bg-white text-gray-900 hover:bg-gray-100 flex items-center justify-center gap-2 py-6 rounded-lg text-base font-medium transition-all duration-300"
              >
                <FcGoogle className="h-5 w-5" />
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-dark-700"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-dark-800 px-2 text-gray-500">
                    Features
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-dark-800/50 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-primary-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-400">Price Tracking</p>
                </div>
                <div className="bg-dark-800/50 p-3 rounded-lg">
                  <Bell className="h-6 w-6 text-primary-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-400">Alerts</p>
                </div>
                <div className="bg-dark-800/50 p-3 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-primary-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-400">Analytics</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-500">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
