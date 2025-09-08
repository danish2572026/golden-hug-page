import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import WatchWithPlanTab from "@/components/WatchWithPlanTab";
import PlanOnlyTab from "@/components/PlanOnlyTab";
import heroImage1 from "@/assets/hero-senior1.png";

export default function BuyNow() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleWatchWithPlanCheckout = (items: any[]) => {
    setLoading(true);
    // Here you would typically navigate to checkout or open payment modal
    toast.success("Proceeding to checkout with watch and plan selection...");
    console.log("Watch with plan items:", items);
    setTimeout(() => setLoading(false), 1000);
  };

  const handlePlanOnlyCheckout = (items: any[]) => {
    setLoading(true);
    // Here you would typically navigate to checkout or open payment modal
    toast.success("Proceeding to checkout with plan-only selection...");
    console.log("Plan only items:", items);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage1}
          alt="SeniorCare health monitoring background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30" />
      </div>

      <Helmet>
        <title>Buy SeniorCare Health Monitor - Smart Watch for Seniors</title>
        <meta name="description" content="Purchase your SeniorCare health monitoring smartwatch with advanced features including heart rate monitoring, fall detection, and emergency alerts. Choose from flexible service plans." />
        <meta name="keywords" content="senior smartwatch, health monitor, elderly care, fall detection, heart rate monitor, buy smartwatch" />
      </Helmet>
      
      {/* Header */}
      <div className="relative bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <h1 className="text-2xl font-bold text-white">Buy SeniorCare</h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="relative container mx-auto px-6 py-8">
        <Tabs defaultValue="watch-plan" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-2xl grid-cols-2 bg-white/20 backdrop-blur-md border border-white/30">
              <TabsTrigger 
                value="watch-plan" 
                className="text-sm font-medium text-white data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Watch with One Month Free Plan
              </TabsTrigger>
              <TabsTrigger 
                value="plan-only" 
                className="text-sm font-medium text-white data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Buy Only Plan
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="watch-plan" className="mt-0">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-semibold text-white mb-2">Watch with Service Plan</h2>
              <p className="text-gray-200">
                Get your smartwatch with a monitoring plan. Each watch requires a plan selection.
              </p>
            </div>
            <WatchWithPlanTab onProceedToCheckout={handleWatchWithPlanCheckout} />
          </TabsContent>

          <TabsContent value="plan-only" className="mt-0">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-semibold text-white mb-2">Service Plans Only</h2>
              <p className="text-gray-200">
                Purchase monitoring plans for your existing devices or future use.
              </p>
            </div>
            <PlanOnlyTab onProceedToCheckout={handlePlanOnlyCheckout} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}