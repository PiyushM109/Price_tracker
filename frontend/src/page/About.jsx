import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { 
  Package, 
  TrendingDown, 
  Bell, 
  Shield, 
  Zap, 
  Globe,
  Target,
  Award
} from "lucide-react";
import TypingText from "../components/TypingText";

const features = [
  {
    icon: <TrendingDown className="h-8 w-8 text-primary-400" />,
    title: "Real-time Price Tracking",
    description: "Monitor price changes 24/7 and never miss a deal again."
  },
  {
    icon: <Bell className="h-8 w-8 text-primary-400" />,
    title: "Instant Price Alerts",
    description: "Get notified immediately when prices drop or products go on sale."
  },
  {
    icon: <Shield className="h-8 w-8 text-primary-400" />,
    title: "Secure & Private",
    description: "Your data is encrypted and never shared with third parties."
  },
  {
    icon: <Zap className="h-8 w-8 text-primary-400" />,
    title: "Lightning Fast",
    description: "Our optimized platform delivers results in milliseconds."
  }
];

const stats = [
  { value: "10K+", label: "Products Tracked" },
  { value: "50K+", label: "Price Alerts" },
  { value: "99.9%", label: "Accuracy" },
  { value: "24/7", label: "Monitoring" }
];

const team = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    avatar: "AJ"
  },
  {
    name: "Sarah Williams",
    role: "Lead Developer",
    avatar: "SW"
  },
  {
    name: "Michael Chen",
    role: "Product Designer",
    avatar: "MC"
  },
  {
    name: "Emma Rodriguez",
    role: "Marketing Director",
    avatar: "ER"
  }
];

const About = () => {
  return (
    <div className="container py-16">
      {/* Hero Section */}
      <div className="text-center mb-16 mt-3">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 mb-6">
          <Package className="h-12 w-12 text-primary-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          About PriceTracker
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          <TypingText 
            text="We help you save money by tracking Amazon prices and notifying you when they drop. Never overpay for your favorite products again." 
            speed={30}
          />
        </p>
        <Button className="px-8 py-3 text-lg rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600">
          Start Saving Today
        </Button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-dark-800/50 border-dark-700 text-center backdrop-blur-sm hover:border-primary-500/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary-400 mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mission Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-white">
            Our Mission
          </h2>
          <p className="text-gray-300 mb-6">
            At PriceTracker, we believe that everyone deserves to get the best value for their money. 
            Our mission is to empower consumers with the tools they need to make informed purchasing 
            decisions and save money on the products they love.
          </p>
          <p className="text-gray-300 mb-6">
            Founded in 2023, we&apos;ve helped thousands of users save thousands of dollars by tracking 
            prices and providing timely alerts when products go on sale.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center text-gray-300">
              <Target className="h-5 w-5 text-primary-400 mr-2" />
              <span>Customer First</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Award className="h-5 w-5 text-primary-400 mr-2" />
              <span>Quality Focused</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Globe className="h-5 w-5 text-primary-400 mr-2" />
              <span>Global Impact</span>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-dark-800/50 to-dark-900/50 rounded-xl p-8 border border-dark-700/50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-lg p-6 mb-6">
            <div className="text-white text-center">
              <div className="text-4xl font-bold mb-2">$1.2M+</div>
              <div className="text-lg">Saved by our users</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-dark-700/50 rounded-lg p-4 text-center backdrop-blur-sm">
              <div className="text-2xl font-bold text-primary-400 mb-1">98%</div>
              <div className="text-gray-400 text-sm">Satisfaction</div>
            </div>
            <div className="bg-dark-700/50 rounded-lg p-4 text-center backdrop-blur-sm">
              <div className="text-2xl font-bold text-primary-400 mb-1">24h</div>
              <div className="text-gray-400 text-sm">Response Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">
          Why Choose PriceTracker?
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Our platform offers everything you need to become a smart shopper
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-dark-800/50 border-dark-700 hover:border-primary-500/50 transition-all duration-300 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="bg-gradient-to-br from-dark-700/50 to-dark-800/50 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4 backdrop-blur-sm">
                  {feature.icon}
                </div>
                <CardTitle className="text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">
          Meet Our Team
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          The passionate people behind PriceTracker
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <Card key={index} className="bg-dark-800/50 border-dark-700 text-center backdrop-blur-sm hover:border-primary-500/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="bg-gradient-to-br from-primary-500/20 to-secondary-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-semibold text-xl">
                  {member.avatar}
                </div>
                <h3 className="font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-gray-400 text-sm">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-2xl p-8 text-center border border-primary-500/30 backdrop-blur-sm">
        <h2 className="text-3xl font-bold mb-4 text-white">
          Ready to Start Saving?
        </h2>
        <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
          Join thousands of smart shoppers who save money every day with PriceTracker
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-base">
            Get Started Now
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg text-base backdrop-blur-sm">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;