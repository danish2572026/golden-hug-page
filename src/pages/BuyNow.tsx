import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import WatchWithPlanTab from "@/components/WatchWithPlanTab";
import PlanOnlyTab from "@/components/PlanOnlyTab";

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      <Helmet>
        <title>Buy SeniorCare Health Monitor - Smart Watch for Seniors</title>
        <meta name="description" content="Purchase your SeniorCare health monitoring smartwatch with advanced features including heart rate monitoring, fall detection, and emergency alerts. Choose from flexible service plans." />
        <meta name="keywords" content="senior smartwatch, health monitor, elderly care, fall detection, heart rate monitor, buy smartwatch" />
      </Helmet>
      
      {/* Header */}
      <div className="bg-card/50 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Buy SeniorCare</h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="watch-plan" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-2xl grid-cols-2 bg-card/80 backdrop-blur-sm border border-border/50">
              <TabsTrigger 
                value="watch-plan" 
                className="text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Watch with One Month Free Plan
              </TabsTrigger>
              <TabsTrigger 
                value="plan-only" 
                className="text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Buy Only Plan
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="watch-plan" className="mt-0">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-semibold text-foreground mb-2">Watch with Service Plan</h2>
              <p className="text-muted-foreground">
                Get your smartwatch with a monitoring plan. Each watch requires a plan selection.
              </p>
            </div>
            <WatchWithPlanTab onProceedToCheckout={handleWatchWithPlanCheckout} />
          </TabsContent>

          <TabsContent value="plan-only" className="mt-0">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-semibold text-foreground mb-2">Service Plans Only</h2>
              <p className="text-muted-foreground">
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