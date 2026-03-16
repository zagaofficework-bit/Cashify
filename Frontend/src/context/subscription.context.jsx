import { createContext, useContext, useState } from "react";
import {
  getPlans,
  subscribe,
  getMySubscription,
  upgradePlan,
} from "../services/subscription.api";

const SubscriptionContext = createContext();

export const useSubscriptionContext = () => useContext(SubscriptionContext);

export const SubscriptionProvider = ({ children }) => {

  const [plans,        setPlans]        = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState(null);
  const [successMsg,   setSuccessMsg]   = useState(null);

  // ─── Helpers ──────────────────────────────────────────────────────────────

  const handleError = (err) => {
    setError(err?.response?.data?.message || err.message || "Something went wrong");
    setLoading(false);
  };

  const clearMessages = () => {
    setError(null);
    setSuccessMsg(null);
  };

  // ─── Actions ──────────────────────────────────────────────────────────────

  const fetchPlans = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getPlans();
      setPlans(res.plans ?? []);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const subscribePlan = async ({ plan, paymentMethod, paymentId }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await subscribe({ plan, paymentMethod, paymentId });
      setSubscription(res.data ?? null);
      setSuccessMsg(res.message ?? "Subscribed successfully");
      return res;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchMySubscription = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getMySubscription();
      setSubscription(res.data ?? null);
    } catch (err) {
      // 404 just means no subscription yet — not a hard error
      if (err?.response?.status === 404) {
        setSubscription(null);
      } else {
        handleError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const upgrade = async ({ plan, paymentMethod, paymentId }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await upgradePlan({ plan, paymentMethod, paymentId });
      setSubscription(res.data ?? null);
      setSuccessMsg(res.message ?? "Plan upgraded successfully");
      return res;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ──────────────────────────────────────────────────────────────────────────

  return (
    <SubscriptionContext.Provider value={{
      plans,
      subscription,
      loading,
      error,
      successMsg,
      clearMessages,
      fetchPlans,
      subscribePlan,
      fetchMySubscription,
      upgrade,
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};