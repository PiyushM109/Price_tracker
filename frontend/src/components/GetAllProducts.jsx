import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Skeleton } from "./ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle, TrendingUp, Users } from "lucide-react";
import TypingText from "./TypingText";

function GetAllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products sorted by number of users tracking them
    axios
      .get("https://price-tracker-server-cyan.vercel.app/allProduct")
      .then((response) => {
        // Sort products by number of users tracking them (descending)
        const sortedProducts = response.data.sort((a, b) => 
          (b.users ? b.users.length : 0) - (a.users ? a.users.length : 0)
        );
        setProducts(sortedProducts);
        setLoading(false);
      })
      .catch((_) => {
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary-500/10 mb-4">
            <Users className="h-8 w-8 text-primary-400" />
          </div>
          <h2 className="text-3xl font-bold mb-2 text-white">Most Tracked Products</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            <TypingText 
              text="Discover the most popular products tracked by our users" 
              speed={30}
            />
          </p>
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
      <div className="container py-8">
        <Alert variant="destructive" className="bg-red-900/20 border-red-500">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary-500/10 mb-4">
          <Users className="h-8 w-8 text-primary-400" />
        </div>
        <h2 className="text-3xl font-bold mb-2 text-white">Most Tracked Products</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          <TypingText 
            text="Discover the most popular products tracked by our users" 
            speed={30}
          />
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-dark-800 rounded-xl p-8 max-w-md mx-auto">
            <div className="bg-dark-700 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Products Found</h3>
            <p className="text-gray-400 mb-4">
              No products found. Start tracking some products!
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.slice(0, 6).map((product) => (
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GetAllProducts;