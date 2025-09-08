import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Minus, Plus, Trash2 } from "lucide-react";
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

interface WatchWithPlan {
  id: string;
  watch: WatchProduct;
  selectedPlan: Plan | null;
  quantity: number;
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

interface WatchWithPlanTabProps {
  onProceedToCheckout: (items: WatchWithPlan[]) => void;
}

export default function WatchWithPlanTab({ onProceedToCheckout }: WatchWithPlanTabProps) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [watchItems, setWatchItems] = useState<WatchWithPlan[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPlans();
    // Add first watch item by default
    addWatchItem();
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

  const addWatchItem = () => {
    const newItem: WatchWithPlan = {
      id: Date.now().toString(),
      watch: watchProducts[0], // Default to first watch
      selectedPlan: null,
      quantity: 1
    };
    setWatchItems(prev => [...prev, newItem]);
  };

  const removeWatchItem = (itemId: string) => {
    if (watchItems.length > 1) {
      setWatchItems(prev => prev.filter(item => item.id !== itemId));
    }
  };

  const updateWatchItem = (itemId: string, updates: Partial<WatchWithPlan>) => {
    setWatchItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, ...updates } : item
    ));
  };

  const handleQuantityChange = (itemId: string, change: number) => {
    const item = watchItems.find(i => i.id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity >= 1) {
        updateWatchItem(itemId, { quantity: newQuantity });
      }
    }
  };

  const handlePlanSelect = (itemId: string, planId: string) => {
    const selectedPlan = plans.find(p => p.id === planId);
    if (selectedPlan) {
      updateWatchItem(itemId, { selectedPlan });
    }
  };

  const getTotalPrice = () => {
    return watchItems.reduce((total, item) => {
      const watchPrice = item.watch.price * item.quantity;
      const planPrice = item.selectedPlan ? parseFloat(item.selectedPlan.price) : 0;
      return total + watchPrice + planPrice;
    }, 0);
  };

  const canProceedToCheckout = () => {
    return watchItems.length > 0 && watchItems.every(item => item.selectedPlan !== null);
  };

  const handleProceedToCheckout = () => {
    if (!canProceedToCheckout()) {
      toast.error("Please select a plan for each watch");
      return;
    }
    onProceedToCheckout(watchItems);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left Column - Watch & Plan Selection */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Watch & Plan Selection</h2>
          <Button onClick={addWatchItem} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Another Watch
          </Button>
        </div>

        {watchItems.map((item, index) => (
          <Card key={item.id} className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground">Watch #{index + 1}</CardTitle>
                {watchItems.length > 1 && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeWatchItem(item.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Watch Selection */}
              <div className="p-4 rounded-lg border-2 border-primary bg-primary/10">
                <div className="flex items-center gap-4">
                  <img 
                    src={item.watch.image} 
                    alt={item.watch.name}
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.watch.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.watch.description}</p>
                    <p className="text-lg font-bold text-primary mt-2">${item.watch.price}</p>
                  </div>
                  <Check className="h-5 w-5 text-primary" />
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">Quantity:</span>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleQuantityChange(item.id, -1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Plan Selection */}
              <div className="space-y-3">
                <label className="font-medium text-foreground">Select Plan (Required):</label>
                <Select onValueChange={(value) => handlePlanSelect(item.id, value)}>
                  <SelectTrigger className="w-full bg-background border-border">
                    <SelectValue placeholder="Choose a monitoring plan" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border z-50">
                    {plans.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id} className="cursor-pointer">
                        <div className="flex items-center justify-between w-full">
                          <span>{plan.name}</span>
                          <span className="ml-4 font-semibold text-primary">${plan.price}/{plan.period}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Selected Plan Details */}
                {item.selectedPlan && (
                  <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-foreground">{item.selectedPlan.name}</h4>
                      <Badge variant="secondary">{item.selectedPlan.period}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.selectedPlan.description}</p>
                    <div className="text-lg font-bold text-primary mb-2">${item.selectedPlan.price}/{item.selectedPlan.period}</div>
                    <ul className="space-y-1">
                      {item.selectedPlan.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <Check className="h-3 w-3 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                      {item.selectedPlan.features.length > 3 && (
                        <li className="text-sm text-muted-foreground">
                          +{item.selectedPlan.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Right Column - Order Summary */}
      <div className="space-y-6">
        <Card className="bg-card/80 backdrop-blur-sm border-border/50 sticky top-6">
          <CardHeader>
            <CardTitle className="text-foreground">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {watchItems.map((item, index) => (
              <div key={item.id} className="space-y-2">
                <div className="flex justify-between items-center py-2">
                  <div>
                    <p className="font-medium text-foreground">Watch #{index + 1} - {item.watch.name}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-foreground">${item.watch.price * item.quantity}</p>
                </div>

                {item.selectedPlan && (
                  <div className="flex justify-between items-center py-2 pl-4">
                    <div>
                      <p className="font-medium text-foreground">{item.selectedPlan.name} Plan</p>
                      <p className="text-sm text-muted-foreground">First {item.selectedPlan.period}</p>
                    </div>
                    <p className="font-semibold text-foreground">${item.selectedPlan.price}</p>
                  </div>
                )}
                
                {index < watchItems.length - 1 && <div className="border-t border-border mt-2" />}
              </div>
            ))}

            {watchItems.length > 0 && (
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
                  disabled={!canProceedToCheckout() || loading}
                >
                  {loading ? "Processing..." : "Proceed to Checkout"}
                </Button>
              </>
            )}

            {!canProceedToCheckout() && (
              <p className="text-center text-muted-foreground py-4">
                Select a plan for each watch to continue
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}