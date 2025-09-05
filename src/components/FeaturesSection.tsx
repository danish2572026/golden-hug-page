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
  Smartphone,
  AlertTriangle,
  Activity,
  Moon,
  UserX
} from "lucide-react";
import completeHealthImage from "@/assets/complete-health-monitoring.jpg";

const healthFeatures = [
  {
    icon: Heart,
    title: "Heart Rate Monitor",
    description: "Continuous heart rate tracking with real-time alerts for irregular patterns and family notifications.",
    price: "Watch included - $299/month",
    color: "text-primary"
  },
  {
    icon: Activity,
    title: "Blood Pressure Monitor",
    description: "Automated BP readings with trend analysis and medication reminders for optimal health management.",
    price: "BP Cuff included - $249/month",
    color: "text-accent-foreground"
  },
  {
    icon: Moon,
    title: "Sleep Tracking",
    description: "Advanced sleep pattern analysis with quality scores and personalized improvement recommendations.",
    price: "Sleep Sensor - $199/month",
    color: "text-secondary"
  },
  {
    icon: UserX,
    title: "Fall Detection",
    description: "Intelligent fall detection system with instant emergency alerts and GPS location sharing.",
    price: "Emergency Response - $149/month",
    color: "text-emergency"
  }
];

const emergencyServices = [
  {
    icon: Phone,
    title: "Hospital Coordination",
    description: "Direct communication with nearby hospitals, medical history sharing, and appointment scheduling.",
    color: "text-primary"
  },
  {
    icon: Ambulance,
    title: "Ambulance Services",
    description: "Immediate ambulance dispatch with pre-shared medical information and GPS location.",
    color: "text-emergency"
  },
  {
    icon: Building2,
    title: "Insurance Support",
    description: "Direct insurance claim filing, pre-authorization handling, and coverage verification.",
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

        <div className="relative min-h-[80vh] rounded-3xl overflow-hidden">
          {/* Full Background Image */}
          <div className="absolute inset-0">
            <img 
              src={completeHealthImage} 
              alt="Complete Health Monitoring System with Heart Rate, BP, Sleep Tracking, and Fall Detection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70"></div>
          </div>

          {/* Overlaid Health Features */}
          <div className="relative z-10 p-8 lg:p-16 h-full flex flex-col justify-center">
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
              {healthFeatures.map((feature, index) => (
                <Card key={index} className="border-none shadow-hero bg-card/90 backdrop-blur-md hover:bg-card/95 transition-all duration-300 hover:scale-105">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-feature rounded-xl">
                        <feature.icon className={`h-7 w-7 ${feature.color}`} />
                      </div>
                      <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">{feature.description}</p>
                    <div className="pt-3 border-t border-border/50">
                      <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {feature.price}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

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