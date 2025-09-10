import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Activity, 
  Moon, 
  AlertTriangle,
  Droplets,
  Timer
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import watchImage from "@/assets/senior-watch.jpg";
import dashboardImage from "@/assets/health-dashboard.jpg";

const watchFeatures = [
  {
    icon: Heart,
    title: "Heart Rate Monitoring",
    description: "Continuous 24/7 heart rate tracking with family notifications for any irregularities.",
    color: "text-primary"
  },
  {
    icon: Droplets,
    title: "Blood Pressure Tracking",
    description: "Real-time blood pressure monitoring with automatic alerts to healthcare providers.",
    color: "text-accent-foreground"
  },
  {
    icon: Activity,
    title: "Activity & Fitness",
    description: "Daily steps, calories burned, and activity goals with progress sharing.",
    color: "text-primary"
  },
  {
    icon: Moon,
    title: "Sleep Quality Analysis",
    description: "Comprehensive sleep pattern tracking with health insights and recommendations.",
    color: "text-accent-foreground"
  },
  {
    icon: AlertTriangle,
    title: "Fall Detection & SOS",
    description: "Automatic fall detection with instant emergency alerts and GPS location sharing.",
    color: "text-emergency"
  },
  {
    icon: Timer,
    title: "Medication Reminders",
    description: "Smart medication scheduling with family notifications for missed doses.",
    color: "text-primary"
  }
];


export function SmartWatchSection() {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate('/buy-now');
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-background via-background to-secondary/5 overflow-hidden">
      {/* Background Dashboard Image - Soft and Faded */}
      <div className="absolute inset-0 opacity-[0.03]">
        <img 
          src={dashboardImage} 
          alt="Health Dashboard Background"
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Foreground Watch Image - Corner Positioned */}
      <div className="absolute bottom-8 left-8 lg:bottom-16 lg:left-16 z-10 opacity-20 lg:opacity-30">
        <img 
          src={watchImage} 
          alt="SeniorCare Smart Watch"
          className="w-32 h-32 lg:w-48 lg:h-48 object-contain drop-shadow-2xl"
        />
      </div>

      <div className="relative container mx-auto px-6 lg:px-8">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Advanced <span className="text-primary">Smart Watch</span> Health Monitoring with Complete <span className="text-emergency">Health Care & Emergency Support</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive health tracking technology designed specifically for seniors, with seamless family connectivity and emergency response
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {watchFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="group border-none shadow-soft bg-card/80 backdrop-blur-sm hover:shadow-hero transition-all duration-500 hover:-translate-y-2 rounded-2xl overflow-hidden"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-3xl w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className={`h-10 w-10 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Experience peace of mind with comprehensive health monitoring and instant emergency response - all on your wrist
          </p>
          <Button 
            onClick={handleBuyNow}
            size="lg" 
            className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold px-10 py-4 rounded-2xl shadow-hero hover:shadow-hero-hover transition-all duration-500 hover:scale-105 text-lg"
          >
            Get Your Smart Watch
          </Button>
        </div>
      </div>
    </section>
  );
}
