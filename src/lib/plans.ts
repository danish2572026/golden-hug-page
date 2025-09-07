import { API_BASE_URL } from "@/utils/helper";

export async function fetchPlans() {
    const res = await fetch(`${API_BASE_URL}/plans/`, {
    headers: {
        "accept": "application/json",
    }
    });
    
    const data = await res.json();

    if (!data.is_success) throw new Error("Failed to fetch dashboard data");
    const formatted = data.data.map((plan) => ({
        ...plan,
        features: plan.features
            ? plan.features.split(",").map((f: string) => f.trim())
            : [],
    }));

    const sorted = formatted.sort((a, b) => Number(a.price) - Number(b.price));

    return {
        ...data,
        data: sorted,
        };
    }