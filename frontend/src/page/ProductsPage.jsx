import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { AlertCircle, Plus, Package } from "lucide-react";
import TypingText from "../components/TypingText";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    fetch("http://localhost:3000/auth/user", { credentials: "include" })
      .then((res) => res.json())
      .then((userData) => {
        if (userData._id) {
          setUser(userData);
          // Fetch user's products
          return axios.get("http://localhost:3000/user/products", {
            withCredentials: true,
          });
        } else {
          // Redirect to login if not authenticated
          navigate("/login");
          return null;
        }
      })
      .then((response) => {
        if (response && response.data) {
          setProducts(response.data);
        }
        setLoading(false);
      })
      .catch((_) => {
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="container py-12">
        <div className="flex justify-between items-center mt-8 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              My Tracked Products
            </h1>
            <p className="text-gray-400">
              All products you are currently tracking"
            </p>
          </div>
          <Button
            className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
            onClick={() => navigate("/track")}
          >
            <Plus className="h-4 w-4" />
            Track New Product
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12 min-h-screen">
        <Alert variant="destructive" className="bg-red-900/20 border-red-500">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-12 min-h-screen">
      <div className="flex justify-between items-center mt-8 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">My Tracked Products</h1>
          <p className="text-gray-400">
            All products you are currently tracking
          </p>
        </div>
        <Button
          className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
          onClick={() => navigate("/track")}
        >
          <Plus className="h-4 w-4" />
          Track New Product
        </Button>
      </div>

      {products.length === 0 ? (
        <div className=" text-center py-12 ">
          <div className="bg-dark-800 rounded-xl p-8 max-w-md mx-auto">
            <div className="bg-dark-700 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No Products Tracked
            </h3>
            <p className="text-gray-400 mb-4">
              You haven't tracked any products yet. Start tracking your first
              product!
            </p>
            <Button
              className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
              onClick={() => navigate("/track")}
            >
              Track Your First Product
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
