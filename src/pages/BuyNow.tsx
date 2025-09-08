import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Minus, Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchPlans } from "@/lib/plans";
import { toast } from "sonner";
import watch from "@/assets/watch.jpg";

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
}

interface WatchProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

const watchProducts: WatchProduct[] = [
  {
    id: "1",
    name: "SeniorCare Health Monitor",
    price: 299,
    image: watch,
    description: "Advanced health monitoring smartwatch designed for seniors"
  }
];

export default function BuyNow() {
  const navigate = useNavigate();
  const [selectedWatch, setSelectedWatch] = useState<WatchProduct | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const response = await fetchPlans();
      setPlans(response.data);
    } catch (error) {
      toast.error("Failed to load plans");
      console.error("Error loading plans:", error);
    }
  };

  const handleWatchSelect = (product: WatchProduct) => {
    setSelectedWatch(product);
  };

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const getTotalPrice = () => {
    const watchPrice = selectedWatch ? selectedWatch.price * quantity : 0;
    const planPrice = selectedPlan ? parseFloat(selectedPlan.price) : 0;
    return watchPrice + planPrice;
  };

  const handleProceedToCheckout = () => {
    if (!selectedWatch || !selectedPlan) {
      toast.error("Please select both a watch and a plan");
      return;
    }
    
    toast.success("Proceeding to checkout...");
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
            <h1 className="text-2xl font-bold text-foreground">Buy SeniorCare Watch</h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left Column - Product Selection */}
          <div className="space-y-6">
            
            {/* Watch Selection */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Select Watch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {watchProducts.map((product) => (
                  <div 
                    key={product.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      selectedWatch?.id === product.id 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleWatchSelect(product)}
                  >
                    <div className="flex items-center gap-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-20 h-20 object-contain rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                        <p className="text-lg font-bold text-primary mt-2">${product.price}</p>
                      </div>
                      {selectedWatch?.id === product.id && (
                        <Check className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </div>
                ))}

                {/* Quantity Selector */}
                {selectedWatch && (
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="font-medium text-foreground">Quantity:</span>
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{quantity}</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleQuantityChange(1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Plan Selection */}
            {selectedWatch && (
              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Select Service Plan</CardTitle>
                  <p className="text-sm text-muted-foreground">Choose a monitoring plan for your watch</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {plans.map((plan) => (
                    <div 
                      key={plan.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                        selectedPlan?.id === plan.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => handlePlanSelect(plan)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-foreground">{plan.name}</h3>
                            <Badge variant="secondary">{plan.period}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>
                          <ul className="space-y-1">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm">
                                <Check className="h-3 w-3 text-primary flex-shrink-0" />
                                <span className="text-muted-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-2xl font-bold text-primary">${plan.price}</p>
                          <p className="text-sm text-muted-foreground">/{plan.period}</p>
                          {selectedPlan?.id === plan.id && (
                            <Check className="h-5 w-5 text-primary mt-2 ml-auto" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 sticky top-6">
              <CardHeader>
                <CardTitle className="text-foreground">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {selectedWatch && (
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <p className="font-medium text-foreground">{selectedWatch.name}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {quantity}</p>
                    </div>
                    <p className="font-semibold text-foreground">${selectedWatch.price * quantity}</p>
                  </div>
                )}

                {selectedPlan && (
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <p className="font-medium text-foreground">{selectedPlan.name} Plan</p>
                      <p className="text-sm text-muted-foreground">First {selectedPlan.period}</p>
                    </div>
                    <p className="font-semibold text-foreground">${selectedPlan.price}</p>
                  </div>
                )}

                {(selectedWatch || selectedPlan) && (
                  <>
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-bold text-foreground">Total</p>
                        <p className="text-2xl font-bold text-primary">${getTotalPrice()}</p>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
                      onClick={handleProceedToCheckout}
                      disabled={!selectedWatch || !selectedPlan || loading}
                    >
                      {loading ? "Processing..." : "Proceed to Checkout"}
                    </Button>
                  </>
                )}

                {!selectedWatch && (
                  <p className="text-center text-muted-foreground py-8">
                    Select a watch to get started
                  </p>
                )}

                {selectedWatch && !selectedPlan && (
                  <p className="text-center text-muted-foreground py-4">
                    Select a service plan to continue
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}