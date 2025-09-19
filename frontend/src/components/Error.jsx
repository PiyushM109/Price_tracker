import { useRouteError, Link } from "react-router-dom";
import { Button } from "./ui/button";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-dark-800 rounded-full p-4 w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2">Oops! Something went wrong</h1>
        <p className="text-gray-400 mb-6">
          We&apos;re sorry, but an unexpected error has occurred. Our team has been notified and is working to fix the issue.
        </p>
        
        <div className="bg-dark-800 rounded-lg p-4 mb-6 text-left">
          <h2 className="text-red-400 font-semibold mb-2 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Error Details
          </h2>
          <p className="text-sm text-gray-300">
            {error.statusText || error.message}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={() => window.location.reload()} 
            className="flex items-center justify-center"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reload Page
          </Button>
          
          <Button 
            variant="outline" 
            className="border-dark-700 text-white hover:bg-dark-800 flex items-center justify-center"
            asChild
          >
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
        
        <p className="text-gray-500 text-sm mt-8">
          If the problem persists, please contact our support team.
        </p>
      </div>
    </div>
  );
}