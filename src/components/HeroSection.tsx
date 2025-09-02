import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Heart, Phone } from "lucide-react";
import heroImage1 from "@/assets/hero-senior1.png";
import heroImage2 from "@/assets/hero-senior2.jpg";

interface HeroSectionProps {
  isLoggedIn?: boolean;
  hasOrderedWatch?: boolean;
  onGetStarted?: () => void;
  onOrderStatus?: () => void;
}

export function HeroSection({ 
  isLoggedIn = false, 
  hasOrderedWatch = false, 
  onGetStarted, 
  onOrderStatus 
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage1}
          alt="Happy senior wearing SeniorCare health watch"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-white">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Peace of Mind for
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
                  Your Loved Ones
                </span>
              </h1>
              <p className="text-xl leading-relaxed max-w-lg text-gray-200">
                Advanced health monitoring with instant emergency response, 
                real-time family notifications, and comprehensive care services.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-white/10 backdrop-blur-md rounded-lg shadow-soft">
                <Heart className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">24/7 Health Monitoring</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/10 backdrop-blur-md rounded-lg shadow-soft">
                <Phone className="h-6 w-6 text-emergency" />
                <span className="text-sm font-medium">Instant Emergency</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/10 backdrop-blur-md rounded-lg shadow-soft">
                <Shield className="h-6 w-6 text-accent-foreground" />
                <span className="text-sm font-medium">Family Connected</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {!isLoggedIn ? (
                <>
                  <Button onClick={onGetStarted} variant="hero" size="lg" className="text-lg">
                    Get Started Today
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg text-gray-800">
                    Watch Demo
                  </Button>
                </>
              ) : hasOrderedWatch ? (
                <>
                  <Button onClick={onOrderStatus} variant="hero" size="lg" className="text-lg">
                    Order Status
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg text-gray-800">
                    Watch Demo
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={onGetStarted} variant="hero" size="lg" className="text-lg">
                    Get Started Today
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg text-gray-800">
                    Watch Demo
                  </Button>
                </>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent-foreground rounded-full"></div>
                <span>FDA Approved</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emergency rounded-full"></div>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Emergency Alert - Top Right */}
      <div className="absolute top-6 right-6 lg:top-8 lg:right-8">
        <div className="bg-emergency text-emergency-foreground p-3 rounded-lg shadow-card animate-pulse">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emergency-foreground rounded-full"></div>
            <span className="text-xs font-medium">Emergency Alert Sent</span>
          </div>
        </div>
      </div>
    </section>
  );
}
