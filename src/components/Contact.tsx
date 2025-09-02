import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-care" />,
      title: "Phone",
      details: "(555) 123-CARE",
      subtitle: "Available 24/7"
    },
    {
      icon: <Mail className="w-6 h-6 text-trust" />,
      title: "Email",
      details: "info@seniorcare.com",
      subtitle: "Quick response guaranteed"
    },
    {
      icon: <MapPin className="w-6 h-6 text-care" />,
      title: "Service Area",
      details: "Metro Area",
      subtitle: "Free consultations"
    },
    {
      icon: <Clock className="w-6 h-6 text-trust" />,
      title: "Hours",
      details: "24/7 Care",
      subtitle: "Always here for you"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Contact us today for a free consultation and learn how we can help provide the best care for your loved ones.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-card transition-all duration-300 border-0 bg-gradient-card">
              <div className="flex justify-center mb-3">
                {info.icon}
              </div>
              <h3 className="font-semibold text-foreground mb-1">
                {info.title}
              </h3>
              <p className="text-lg font-medium text-foreground mb-1">
                {info.details}
              </p>
              <p className="text-sm text-muted-foreground">
                {info.subtitle}
              </p>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button size="lg" variant="care" className="text-lg px-12 py-6">
            Schedule Free Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;