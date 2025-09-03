import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Phone, 
  Users, 
  Shield, 
  Ambulance, 
  Building2,
  Clock,
  Watch,
  AlertTriangle,
  UserCheck,
  Activity
} from "lucide-react";
import healthTechImage from "@/assets/health-tech-hd.jpg";

const healthFeatures = [
  {
    icon: Watch,
    title: "Smart Watch with SOS Button",
    description: "Accurate smartwatch designed for seniors with a dedicated SOS button on the side for instant emergency alerts.",
    color: "text-primary"
  },
  {
    icon: Heart,
    title: "24/7 Health Monitoring",
    description: "Continuous monitoring of heart rate, blood pressure, activity levels, and vital signs with real-time family notifications.",
    color: "text-primary"
  },
  {
    icon: Activity,
    title: "Automatic Fall Detection",
    description: "Advanced sensors detect falls automatically and instantly notify our emergency team and your children.",
    color: "text-accent-foreground"
  },
  {
    icon: AlertTriangle,
    title: "One-Touch Emergency Alert",
    description: "Press the SOS button to immediately alert our emergency response team and your family members.",
    color: "text-emergency"
  }
];

const emergencyServices = [
  {
    icon: UserCheck,
    title: "Instant Emergency Response",
    description: "When SOS is pressed or fall is detected, our emergency team immediately assesses the situation and contacts you and your family.",
    color: "text-primary"
  },
  {
    icon: Ambulance,
    title: "Ambulance Dispatch & Coordination", 
    description: "We handle ambulance dispatch, coordinate with paramedics, and ensure they have your medical information before arrival.",
    color: "text-emergency"
  },
  {
    icon: Building2,
    title: "Insurance Claims Management",
    description: "We take care of filing insurance claims for emergency services, so you and your family can focus on recovery.",
    color: "text-accent-foreground"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Health Monitoring Features */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Complete Health <span className="text-primary">Monitoring</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced technology that keeps families connected and seniors safe
          </p>
        </div>
      </div>

      {/* Full-width Image with Right-side Features */}
      <div className="relative w-full h-[80vh] mb-20">
        {/* Background Image - Full Width */}
        <img 
          src={healthTechImage} 
          alt="Senior Smart Watch with Health Dashboard Integration"
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-l from-background/95 via-background/60 to-transparent"></div>
        
        {/* Features Overlay - Positioned on Right Side */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-full max-w-lg space-y-4 animate-fade-in">
          {healthFeatures.map((feature, index) => (
            <Card key={index} className="border-none shadow-hero bg-card/95 backdrop-blur-sm hover:shadow-card transition-all duration-300 hover-scale">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-feature rounded-lg">
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg text-foreground">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8">

        {/* Emergency Services */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Comprehensive <span className="text-emergency">Emergency Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional support when it matters most - we handle everything
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {emergencyServices.map((service, index) => (
            <Card key={index} className="text-center border-none shadow-card bg-card hover:shadow-hero transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="mx-auto p-4 bg-gradient-feature rounded-2xl w-16 h-16 flex items-center justify-center mb-4">
                  <service.icon className={`h-8 w-8 ${service.color}`} />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Response Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {[
            { number: "< 2min", label: "Emergency Response", icon: Clock },
            { number: "24/7", label: "Support Available", icon: Phone },
            { number: "50,000+", label: "Families Protected", icon: Users },
            { number: "99.9%", label: "Uptime Guarantee", icon: Shield }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}