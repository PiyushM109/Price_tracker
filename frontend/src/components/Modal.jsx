import { useState } from "react";
import { Button } from "./ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Alert, AlertDescription } from "./ui/alert";
import { Bell, Mail, Bookmark, X } from "lucide-react";
import axios from "axios";
import PropTypes from 'prop-types';

export default function Modal({ prodId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setSuccess(false);
    
    const data = {
      userEmail: email,
      prodId: prodId,
    };

    axios
      .post("/data/product/addEmail", data)
      .then((_) => {
        setSuccess(true);
        setMessage("You've been subscribed to price alerts!");
        setEmail("");
        setTimeout(() => {
          closeModal();
        }, 2000);
      })
      .catch((err) => {
        setMessage(err?.response?.data?.message || "Failed to subscribe. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  function closeModal() {
    setIsOpen(false);
    setMessage("");
    setSuccess(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Button
        className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold text-lg shadow-lg transition-transform hover:scale-105"
        onClick={openModal}
      >
        <Bell className="mr-2 h-5 w-5" />
        Track This Product
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-dark-800 border-dark-700 rounded-xl max-w-md">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="flex items-center text-white">
                <Bookmark className="text-primary-400 mr-2 h-5 w-5" />
                <span>Price Alerts</span>
              </DialogTitle>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-400 hover:text-gray-200"
                onClick={closeModal}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <DialogDescription className="text-gray-300">
              Get notified when the price drops or the product goes on sale.
            </DialogDescription>
          </DialogHeader>
          
          <form className="flex flex-col mt-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-gray-300 text-sm font-medium mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10 bg-dark-700 border-dark-600 text-white"
                />
              </div>
            </div>

            {message && (
              <div className="mb-4">
                <Alert 
                  variant={success ? "default" : "destructive"}
                  className={success ? "bg-green-900/20 border-green-500" : "bg-red-900/20 border-red-500"}
                >
                  <AlertDescription>
                    {message}
                  </AlertDescription>
                </Alert>
              </div>
            )}

            <div className="mt-4">
              <Button
                type="submit"
                disabled={isSubmitting || !email}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 font-semibold rounded-lg shadow-md disabled:opacity-50"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe to Alerts"}
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-dark-700">
            <p className="text-gray-500 text-xs">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

Modal.propTypes = {
  prodId: PropTypes.string.isRequired
};