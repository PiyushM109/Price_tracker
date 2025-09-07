import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import {
  Menu,
  User,
  Home,
  Package,
  Info,
  LogIn,
  LogOut,
  Plus,
} from "lucide-react";
import { getToken, deleteToken } from "../lib/authUtil";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login");
    }
    // Check if user is logged in
    // fetch("/auth/user", { credentials: "include" })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data._id) {
    //       setUser(data);
    //     }
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  const handleLogout = async () => {
    await axios.post(
      "/auth/logout",
      {},
      { headers: { authorization: `bearer ${token}` } }
    );
    deleteToken();
  };

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/products", icon: Package },
    { name: "About", href: "/about", icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-dark-700/50 bg-dark-900/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and Brand */}
        <div
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg p-1.5 group-hover:scale-105 transition-transform duration-300">
            <Package className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">PriceTracker</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.name}
                variant="ghost"
                size="sm"
                onClick={() => navigate(item.href)}
                className="text-gray-300 hover:text-white hover:bg-dark-800/50 rounded-lg px-3 py-2 h-auto transition-all duration-300"
              >
                <Icon className="h-4 w-4 mr-2" />
                {item.name}
              </Button>
            );
          })}

          {user && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/track")}
              className="text-gray-300 hover:text-white hover:bg-dark-800/50 rounded-lg px-3 py-2 h-auto transition-all duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Track Product
            </Button>
          )}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-2">
          {user ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white hover:bg-dark-800/50 rounded-lg transition-all duration-300"
                onClick={() => navigate("/products")}
              >
                <User className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white hover:bg-dark-800/50 rounded-lg transition-all duration-300"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-white hover:bg-dark-800/50 rounded-lg transition-all duration-300"
              onClick={() => navigate("/login")}
            >
              <LogIn className="h-5 w-5" />
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-300 hover:text-white hover:bg-dark-800/50 rounded-lg transition-all duration-300"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-dark-900/90 border-l border-dark-700/50 backdrop-blur-lg w-64"
            >
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className="text-left text-lg font-medium text-gray-300 hover:text-white hover:bg-dark-800/50 justify-start h-12 px-4 transition-all duration-300"
                      onClick={() => {
                        navigate(item.href);
                        setIsOpen(false);
                      }}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </Button>
                  );
                })}

                {user && (
                  <Button
                    variant="ghost"
                    className="text-left text-lg font-medium text-gray-300 hover:text-white hover:bg-dark-800/50 justify-start h-12 px-4 transition-all duration-300"
                    onClick={() => {
                      navigate("/track");
                      setIsOpen(false);
                    }}
                  >
                    <Plus className="h-5 w-5 mr-3" />
                    Track Product
                  </Button>
                )}

                {user ? (
                  <>
                    <Button
                      variant="ghost"
                      className="text-left text-lg font-medium text-gray-300 hover:text-white hover:bg-dark-800/50 justify-start h-12 px-4 transition-all duration-300"
                      onClick={() => {
                        navigate("/products");
                        setIsOpen(false);
                      }}
                    >
                      <User className="h-5 w-5 mr-3" />
                      My Products
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-left text-lg font-medium text-gray-300 hover:text-white hover:bg-dark-800/50 justify-start h-12 px-4 transition-all duration-300"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    className="text-left text-lg font-medium text-gray-300 hover:text-white hover:bg-dark-800/50 justify-start h-12 px-4 transition-all duration-300"
                    onClick={() => {
                      navigate("/login");
                      setIsOpen(false);
                    }}
                  >
                    <LogIn className="h-5 w-5 mr-3" />
                    Login
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
