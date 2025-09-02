import { Heart, Home, Users, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: <Heart className="w-8 h-8 text-care" />,
      title: "Personal Care",
      description: "Assistance with daily activities including bathing, dressing, grooming, and medication management."
    },
    {
      icon: <Home className="w-8 h-8 text-trust" />,
      title: "In-Home Care",
      description: "Professional care services provided in the comfort and familiarity of your own home."
    },
    {
      icon: <Users className="w-8 h-8 text-care" />,
      title: "Companionship",
      description: "Social interaction, conversation, and emotional support to enhance quality of life."
    },
    {
      icon: <Clock className="w-8 h-8 text-trust" />,
      title: "24/7 Support",
      description: "Round-the-clock care and monitoring to ensure safety and peace of mind."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our Care Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive senior care solutions tailored to meet individual needs and preferences.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-card transition-all duration-300 border-0 bg-gradient-card">
              <div className="flex justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;