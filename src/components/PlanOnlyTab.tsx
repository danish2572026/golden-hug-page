import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Minus, Plus } from "lucide-react";
import { fetchPlans } from "@/lib/plans";
import { toast } from "sonner";

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
}

interface PlanItem {
  plan: Plan;
  quantity: number;
}

interface PlanOnlyTabProps {
  onProceedToCheckout: (items: PlanItem[]) => void;
}

export default function PlanOnlyTab({ onProceedToCheckout }: PlanOnlyTabProps) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlans, setSelectedPlans] = useState<{ [planId: string]: number }>({});
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

  const handlePlanSelect = (planId: string) => {
    setSelectedPlans(prev => ({
      ...prev,
      [planId]: prev[planId] ? prev[planId] : 1
    }));
  };

  const handleQuantityChange = (planId: string, change: number) => {
    setSelectedPlans(prev => {
      const currentQuantity = prev[planId] || 0;
      const newQuantity = currentQuantity + change;
      
      if (newQuantity <= 0) {
        const { [planId]: removed, ...rest } = prev;
        return rest;
      }
      
      return {
        ...prev,
        [planId]: newQuantity
      };
    });
  };

  const getSelectedPlanItems = (): PlanItem[] => {
    return Object.entries(selectedPlans).map(([planId, quantity]) => {
      const plan = plans.find(p => p.id === planId)!;
      return { plan, quantity };
    });
  };

  const getTotalPrice = () => {
    return Object.entries(selectedPlans).reduce((total, [planId, quantity]) => {
      const plan = plans.find(p => p.id === planId);
      if (plan) {
        return total + (parseFloat(plan.price) * quantity);
      }
      return total;
    }, 0);
  };

  const canProceedToCheckout = () => {
    return Object.keys(selectedPlans).length > 0;
  };

  const handleProceedToCheckout = () => {
    if (!canProceedToCheckout()) {
      toast.error("Please select at least one plan");
      return;
    }
    onProceedToCheckout(getSelectedPlanItems());
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left Column - Plan Selection */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground">Available Plans</h2>

        <div className="space-y-4">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`bg-card/80 backdrop-blur-sm border-border/50 cursor-pointer transition-all duration-300 ${
                selectedPlans[plan.id] 
                  ? 'border-primary bg-primary/10' 
                  : 'hover:border-primary/50'
              }`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground text-lg">{plan.name}</h3>
                      <Badge variant="secondary">{plan.period}</Badge>
                      {selectedPlans[plan.id] && (
                        <Check className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Check className="h-3 w-3 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-right ml-6">
                    <p className="text-3xl font-bold text-primary">${plan.price}</p>
                    <p className="text-sm text-muted-foreground">/{plan.period}</p>
                  </div>
                </div>

                {/* Quantity Selector */}
                {selectedPlans[plan.id] && (
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                    <span className="font-medium text-foreground">Quantity:</span>
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(plan.id, -1);
                        }}
                        disabled={selectedPlans[plan.id] <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{selectedPlans[plan.id]}</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(plan.id, 1);
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Column - Order Summary */}
      <div className="space-y-6">
        <Card className="bg-card/80 backdrop-blur-sm border-border/50 sticky top-6">
          <CardHeader>
            <CardTitle className="text-foreground">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {getSelectedPlanItems().map((item) => (
              <div key={item.plan.id} className="flex justify-between items-center py-2">
                <div>
                  <p className="font-medium text-foreground">{item.plan.name} Plan</p>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity} × ${item.plan.price}/{item.plan.period}
                  </p>
                </div>
                <p className="font-semibold text-foreground">
                  ${(parseFloat(item.plan.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            {canProceedToCheckout() && (
              <>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-foreground">Total</p>
                    <p className="text-2xl font-bold text-primary">${getTotalPrice().toFixed(2)}</p>
                  </div>
                </div>

                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
                  onClick={handleProceedToCheckout}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Proceed to Checkout"}
                </Button>
              </>
            )}

            {!canProceedToCheckout() && (
              <p className="text-center text-muted-foreground py-8">
                Select plans to get started
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}