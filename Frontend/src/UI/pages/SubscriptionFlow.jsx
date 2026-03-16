import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PaymentPage, PricingPage } from "./PaymentPage";
import { useSubscription } from "../hooks/useSubscription";
import { useAuth } from "../hooks/useAuth";
import { getMe } from "../../services/auth.api";

/**
 * SubscriptionFlow
 *
 * Orchestrates the two-step flow:
 *   1. PricingPage  — user picks a plan
 *   2. PaymentPage  — user pays via Stripe → backend subscribe/upgrade
 *
 * After successful payment the user's role is updated to "seller" by the
 * backend.  We call getMe() from auth context so the UI reflects the new role
 * immediately, then redirect to /add-product.
 */
export default function SubscriptionFlow() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const { subscription, fetchMySubscription, loading } = useSubscription();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "seller") {
      fetchMySubscription();
    }
  }, [user]);

  const handleSuccess = async () => {
    await getMe();
    navigate("/add-product");
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#94a3b8",
          fontSize: 14,
        }}
      >
        Loading…
      </div>
    );
  }

  return (
    <>
      {!selectedPlan ? (
        <PricingPage
          currentSubscription={subscription}
          onSubscribe={(plan) => setSelectedPlan(plan)}
        />
      ) : (
        <PaymentPage
          plan={selectedPlan}
          isUpgrade={user?.role === "seller"}
          onBack={() => setSelectedPlan(null)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}
