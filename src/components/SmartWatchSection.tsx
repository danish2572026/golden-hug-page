import { Card, CardContent } from "@/components/ui/card";
import { 
  Heart, 
  Activity, 
  Moon, 
  AlertTriangle,
  Droplets,
  Timer
} from "lucide-react";
import watch from "@/assets/watch.jpg";

const watchFeatures = [
  {
    icon: Heart,
    title: "Heart Rate",
    description: "24/7 monitoring"
  },
  {
    icon: Droplets,
    title: "Blood Pressure",
    description: "Real-time tracking"
  },
  {
    icon: Activity,
    title: "Activity Tracking",
    description: "Steps & calories"
  },
  {
    icon: Moon,
    title: "Sleep Analysis",
    description: "Quality insights"
  },
  {
    icon: AlertTriangle,
    title: "Fall Detection",
    description: "Auto emergency"
  },
  {
    icon: Timer,
    title: "Medication",
    description: "Smart reminders"
  }
];

export function SmartWatchSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-background to-secondary relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-display font-bold mb-6">
            Smart Watch <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced health monitoring technology powered by AI and machine learning
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-x-16 gap-y-12">
          {/* Left: Watch Image */}
          <div className="flex-shrink-0 max-w-[400px] w-full mx-auto lg:mx-0 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <img 
              src={watch} 
              alt="Smart Health Monitoring Watch" 
              className="relative w-full h-auto object-contain animate-float shadow-hero rounded-2xl"
            />
          </div>

          {/* Right: Feature Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 flex-1">
            {watchFeatures.map((feature, index) => (
              <Card key={index} className="group bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6 text-center flex flex-col justify-center h-full">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                      <feature.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-card-foreground mb-2 font-display">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground text-sm bg-gradient-card p-4 rounded-xl border border-border/50 inline-block">
            All features included with your premium health monitoring device
          </p>
        </div>
      </div>
    </section>
  );
}
