import { Card, CardContent } from "@/components/ui/card";
import { 
  Heart, 
  Activity, 
  Moon, 
  AlertTriangle,
  Droplets,
  Timer
} from "lucide-react";
import smartWatchImage from "@/assets/smart-watch-product.jpg";

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
    <section className="py-16 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-90"></div>
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Smart Watch <span className="text-primary">Features</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Advanced health monitoring technology on your wrist
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Smart Watch Image */}
          <div className="flex justify-center">
            <div className="relative">
              <img 
                src={smartWatchImage} 
                alt="SeniorCare Smart Watch" 
                className="w-80 h-80 object-contain rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-6">
            {watchFeatures.map((feature, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-700 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                <CardContent className="p-4 text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="p-3 bg-primary/20 rounded-full">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            All features included with your SeniorCare watch
          </p>
        </div>
      </div>
    </section>
  );
}