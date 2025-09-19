import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";
import TypingText from "./TypingText";

const reviews = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "AJ",
    rating: 5,
    comment:
      "This price tracker has saved me so much money! I've been able to get all my favorite products at the lowest prices.",
    date: "2023-10-15",
  },
  {
    id: 2,
    name: "Sarah Williams",
    avatar: "SW",
    rating: 4,
    comment:
      "Great tool for monitoring price changes. The email alerts are very helpful and timely.",
    date: "2023-09-22",
  },
  {
    id: 3,
    name: "Michael Chen",
    avatar: "MC",
    rating: 5,
    comment:
      "I love how easy it is to use. The interface is clean and the tracking is accurate. Highly recommended!",
    date: "2023-11-05",
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    avatar: "ER",
    rating: 4,
    comment:
      "Very useful for finding deals. The price history graphs are particularly helpful for making purchasing decisions.",
    date: "2023-08-30",
  },
];

const ReviewsSection = () => {
  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">
          What Our Users Say
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our community of smart
          shoppers has to say about PriceTracker.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="group">
            <Card className="bg-dark-800/50 border-dark-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full hover:-translate-y-1 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-primary-600 to-secondary-600 w-10 h-10 rounded-full flex items-center justify-center mr-3 text-white font-semibold">
                    {review.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{review.name}</h3>
                    <p className="text-gray-400 text-sm">{review.date}</p>
                  </div>
                </div>

                <div className="mb-3 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-300 text-sm">
                  &quot;{review.comment}&quot;
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
