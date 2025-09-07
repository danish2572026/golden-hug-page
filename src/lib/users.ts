import { API_BASE_URL } from "@/utils/helper";

export interface Address {
  id?: string;
  full_name: string;
  phone: string;
  relation?: string;
  address_line1: string;
  address_line2?: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
}

export interface UserDetails {
  address: Address;
  selectedPlan: Plan;
}

export async function fetchUserDetails(email: string) {
  const res = await fetch(`${API_BASE_URL}/users/details/${email}'`, {
    headers: {
      "accept": "application/json",
    }
  });
  const data = await res.json();
  console.log(data);
  if (!data.is_success) throw new Error("Failed to fetch dashboard data");

  return data.data;
}