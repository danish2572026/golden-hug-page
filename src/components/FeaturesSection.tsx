import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Heart, 
  Phone, 
  Users, 
  Shield, 
  Ambulance, 
  Building2,
  Clock,
  Smartphone,
  AlertTriangle
} from "lucide-react";
import dashboardImage from "@/assets/health-dashboard.jpg";
import watchImage from "@/assets/senior-watch.jpg";

const allFeatures = [
  {
    icon: Heart,
    title: "Real-Time Health Monitoring",
    description: "Continuous heart rate, blood pressure, and activity tracking with instant family notifications.",
    color: "text-primary"
  },
  {
    icon: Smartphone,
    title: "Family Dashboard",
    description: "Real-time health data access, medication reminders, and daily activity summaries for loved ones.",
    color: "text-accent-foreground"
  },
  {
    icon: AlertTriangle,
    title: "Emergency Button",
    description: "One-touch activation sends instant alerts to family and emergency services with GPS location.",
    color: "text-emergency"
  },
  {
    icon: Phone,
    title: "Hospital Coordination",
    description: "Direct hospital communication, medical history sharing, and appointment scheduling.",
    color: "text-primary"
  },
  {
    icon: Ambulance,
    title: "Ambulance Services",
    description: "Immediate dispatch with pre-shared medical information and precise GPS coordinates.",
    color: "text-emergency"
  },
  {
    icon: Building2,
    title: "Insurance Support",
    description: "Automated claim filing, pre-authorization handling, and coverage verification.",
    color: "text-accent-foreground"
  }
];

export function FeaturesSection() {
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
      <div className="absolute bottom-8 right-8 lg:bottom-16 lg:right-16 z-10 opacity-20 lg:opacity-30">
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
            Advanced technology that keeps families connected and seniors protected with comprehensive health monitoring and emergency services
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {allFeatures.map((feature, index) => (
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

        {/* Trust Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {[
            { number: "< 2min", label: "Emergency Response", icon: Clock },
            { number: "24/7", label: "Support Available", icon: Phone },
            { number: "50,000+", label: "Families Protected", icon: Users },
            { number: "99.9%", label: "Uptime Guarantee", icon: Shield }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}