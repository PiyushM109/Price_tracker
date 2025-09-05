import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { 
  Package, 
  TrendingDown, 
  Bell, 
  Mail, 
  Github, 
  Twitter, 
  Linkedin,
  Instagram
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#" },
        { name: "How It Works", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "Download", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "GDPR", href: "#" }
      ]
    }
  ];

  return (
    <footer className="bg-dark-900/80 border-t border-dark-800/50 pt-16 pb-8 backdrop-blur-lg">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg p-1.5">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">PriceTracker</span>
            </div>
            <p className="text-gray-400 mb-4">
              Never overpay for your favorite products. Track prices and get alerts when they drop.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.href} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and deals.
            </p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-dark-800/50 border-dark-700 text-white placeholder:text-gray-400 rounded-r-none backdrop-blur-sm"
              />
              <Button className="rounded-l-none bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-dark-800/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} PriceTracker. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-gray-400 text-sm">
              <TrendingDown className="h-4 w-4 mr-1 text-green-500" />
              <span>Save Money</span>
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <Bell className="h-4 w-4 mr-1 text-blue-500" />
              <span>Get Alerts</span>
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <Package className="h-4 w-4 mr-1 text-primary-500" />
              <span>Track Products</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;