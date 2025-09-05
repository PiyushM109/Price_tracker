import PropTypes from 'prop-types';
import { Card, CardContent } from './ui/card';

const PriceCard = ({ tag, icon, price, isLowest = false, isHighest = false }) => {
  let borderColor = "border-gray-700";
  let bgColor = "bg-dark-800";
  let textColor = "text-white";
  
  if (isLowest) {
    borderColor = "border-green-500";
    bgColor = "bg-green-900/10";
    textColor = "text-green-400";
  } else if (isHighest) {
    borderColor = "border-red-500";
    bgColor = "bg-red-900/10";
    textColor = "text-red-400";
  }

  return (
    <Card 
      className={`h-full ${borderColor} border-l-4 ${bgColor} rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-l-8`}
    >
      <CardContent className="p-5">
        <div className="flex items-center mb-3">
          <div className={`p-3 rounded-lg mr-4 ${isLowest ? 'bg-green-900/20' : isHighest ? 'bg-red-900/20' : 'bg-dark-700'}`}>
            {icon}
          </div>
          <span className="font-semibold text-gray-300 text-base">
            {tag}
          </span>
        </div>
        
        <p className={`text-3xl font-bold ${textColor} mt-2`}>
          ₹{price?.toFixed(2)}
        </p>
        
        {isLowest && (
          <p className="text-green-400 font-medium text-sm mt-3">
            Best price ever recorded!
          </p>
        )}
        
        {isHighest && (
          <p className="text-red-400 font-medium text-sm mt-3">
            Highest price ever recorded
          </p>
        )}
      </CardContent>
    </Card>
  );
};

PriceCard.propTypes = {
  tag: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  price: PropTypes.number.isRequired,
  isLowest: PropTypes.bool,
  isHighest: PropTypes.bool
};

export default PriceCard;