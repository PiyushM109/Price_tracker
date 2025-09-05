import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { TrendingDown, ShoppingCart, Eye } from 'lucide-react';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  
  // Calculate price difference
  const priceDiff = product.originalPrice - product.currPrice;
  const discountPercent = ((priceDiff / product.originalPrice) * 100).toFixed(0);
  
  return (
    <div 
      className="cursor-pointer h-full group"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <Card className="h-full flex flex-col bg-dark-800/50 border-dark-700 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden equal-height-card hover:border-primary-500/50 backdrop-blur-sm">
        <div className="relative">
          <div className="h-48 bg-gradient-to-br from-dark-700 to-dark-800 flex items-center justify-center p-4 relative overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="object-contain max-h-40 w-full transition-all duration-500 group-hover:scale-110"
              onError={(e) => {
                e.target.src = '/src/assets/logo.svg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
              <Button 
                variant="secondary" 
                size="sm"
                className="flex items-center gap-1 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(product.url, '_blank');
                }}
              >
                <ShoppingCart className="h-4 w-4" />
                Buy Now
              </Button>
            </div>
          </div>
          {discountPercent > 0 && (
            <Badge 
              variant="success" 
              className="absolute top-4 right-4 font-bold flex items-center gap-1 py-1 px-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
            >
              <TrendingDown className="h-3 w-3" />
              {discountPercent}% OFF
            </Badge>
          )}
        </div>
        
        <CardContent className="flex-grow flex flex-col p-4">
          <h3 className="font-semibold line-clamp-2 text-white flex-grow mb-3 text-sm group-hover:text-primary-300 transition-colors duration-300">
            {product.title}
          </h3>
          
          <div className="flex items-center justify-between mt-auto mb-3">
            <div>
              <p className="font-bold text-primary-400 text-lg">
                {product.currency} {product.currPrice?.toFixed(2)}
              </p>
              {product.originalPrice !== product.currPrice && (
                <p className="line-through text-gray-400 text-sm">
                  {product.currency} {product.originalPrice?.toFixed(2)}
                </p>
              )}
            </div>
            
            <div className="flex flex-col items-end">
              <span className="text-gray-400 text-xs">
                Lowest Price
              </span>
              <p className="font-bold text-green-400">
                {product.currency} {product.lowestPrice?.toFixed(2)}
              </p>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <Badge 
              variant={product.isOutOfStock ? "destructive" : "success"}
              className="text-xs py-0.5 px-2 rounded-full"
            >
              {product.isOutOfStock ? "Out of Stock" : "In Stock"}
            </Badge>
            
            <div className="flex items-center text-gray-400 text-xs">
              <Eye className="h-3 w-3 mr-1" />
              {product.users?.length || 0} tracking
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string,
    title: PropTypes.string,
    currency: PropTypes.string,
    currPrice: PropTypes.number,
    originalPrice: PropTypes.number,
    lowestPrice: PropTypes.number,
    isOutOfStock: PropTypes.bool,
    users: PropTypes.arrayOf(PropTypes.shape({
      email: PropTypes.string
    })),
    url: PropTypes.string
  }).isRequired
};

export default ProductCard;