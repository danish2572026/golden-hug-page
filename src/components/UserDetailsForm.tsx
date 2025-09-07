import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin, Package } from "lucide-react";
import { toast } from "sonner";
import { fetchUserDetails, UserDetails, Plan, Address } from "@/lib/users";
import { getUserEmail } from "@/utils/storage";

interface UserDetailsFormProps {
  selectedPlan: Plan;
  allPlans: Plan[];
  onSubmit: (details: UserDetails) => void;
  onClose: () => void;
}

export function UserDetailsForm({
  selectedPlan,
  allPlans,
  onSubmit,
  onClose,
}: UserDetailsFormProps) {
  const [formData, setFormData] = useState({
    address: {
      full_name: "",
      phone: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "India",
    },
    selectedPlanId: selectedPlan.id,
  });

  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const email = getUserEmail();

  useEffect(() => {
    async function loadUserDetails() {
      try {
        const userDetails = await fetchUserDetails(email);
        console.log("asdasd", userDetails);
        if (userDetails.addresses?.length > 0) {
          setSavedAddresses(userDetails.addresses);
          setSelectedAddress(userDetails.addresses[0].id); // default to first
        }
      } catch (err) {
        console.error("Failed to load user details", err);
      }
    }
    loadUserDetails();
  }, [email]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const handleSubmit = () => {
  const chosenPlan =
    allPlans.find((plan) => plan.id === formData.selectedPlanId) ||
    selectedPlan;

  // Ensure finalAddress always matches Address type
  const finalAddress: Address =
    savedAddresses.length > 0 && selectedAddress
      ? savedAddresses.find((a) => a.id === selectedAddress)!
      : {
          ...formData.address,
          id: "new",          // default placeholder for new address
          relation: "self",   // default relation
        };

    if (
      !finalAddress.full_name ||
      !finalAddress.phone ||
      !finalAddress.address_line1 ||
      !finalAddress.city ||
      !finalAddress.state ||
      !finalAddress.postal_code ||
      !finalAddress.country
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const userDetails: UserDetails = {
      address: finalAddress,
      selectedPlan: chosenPlan,
    };

    onSubmit(userDetails);
  };

  return (
    <div className="space-y-6">
      {/* Plan Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Package className="h-5 w-5" /> Your Selected Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="font-semibold">{selectedPlan.name}</h3>
          <p className="text-sm text-muted-foreground">
            {selectedPlan.description}
          </p>
          <span className="text-2xl font-bold text-primary">
            ₹{selectedPlan.price}
          </span>
        </CardContent>
      </Card>

      {/* Address Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5" /> Delivery Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {savedAddresses.length > 0 ? (
            <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
              {savedAddresses.map((addr) => (
                <div key={addr.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={addr.id} id={`addr-${addr.id}`} />
                  <Label htmlFor={`addr-${addr.id}`}>
                    {addr.full_name}, {addr.phone}, {addr.address_line1},{" "}
                    {addr.city}, {addr.state}, {addr.postal_code},{" "}
                    {addr.country}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <>
              <Input
                placeholder="Full Name"
                value={formData.address.full_name}
                onChange={(e) => handleChange("full_name", e.target.value)}
              />
              <Input
                placeholder="Phone"
                value={formData.address.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              <Input
                placeholder="Address Line 1"
                value={formData.address.address_line1}
                onChange={(e) => handleChange("address_line1", e.target.value)}
              />
              <Input
                placeholder="Address Line 2"
                value={formData.address.address_line2}
                onChange={(e) => handleChange("address_line2", e.target.value)}
              />
              <Input
                placeholder="City"
                value={formData.address.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
              <Input
                placeholder="State"
                value={formData.address.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />
              <Input
                placeholder="Postal Code"
                value={formData.address.postal_code}
                onChange={(e) => handleChange("postal_code", e.target.value)}
              />
              <Input
                placeholder="Country"
                value={formData.address.country}
                onChange={(e) => handleChange("country", e.target.value)}
              />
            </>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className="flex-1 bg-primary hover:bg-primary/90"
        >
          Continue to Verification
        </Button>
      </div>
    </div>
  );
}
