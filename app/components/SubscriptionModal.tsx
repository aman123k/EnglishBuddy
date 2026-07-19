"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useStore } from "../store/store";
import useAuthentication from "../hooks/useAuth";

const SubscriptionModal = () => {
  const { isSubscriptionModalOpen, setSubscriptionModalOpen, setUser } = useStore();
  const { userData } = useAuthentication();
  const [selectedPlan, setSelectedPlan] = useState<"gold" | "platinum">("gold");
  const [isPending, setIsPending] = useState(false);

  if (!isSubscriptionModalOpen) return null;

  // Dynamically load the Razorpay checkout script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      // If script is already loaded, resolve immediately
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubscribe = async () => {
    try {
      setIsPending(true);

      // 1. Load Razorpay Script
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        toast.error("Failed to load payment gateway SDK. Please check your network connection.");
        setIsPending(false);
        return;
      }

      // 2. Create order on the backend
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const response = await fetch(`${apiBaseUrl}/api/payment/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ plan: selectedPlan }),
      });

      const orderResult = await response.json();
      if (!orderResult.status) {
        toast.error(orderResult.message || "Failed to initialize subscription checkout.");
        setIsPending(false);
        return;
      }

      const orderData = orderResult.data;

      // 3. Configure and open Razorpay Checkout
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Lingo English Tutor",
        description: `${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Tier Subscription`,
        image: "/Images/logo-blue.svg",
        order_id: orderData.orderId,
        handler: async (paymentResponse: any) => {
          try {
            toast.loading("Verifying payment...", { id: "payment-toast" });

            // 4. Verify payment on backend
            const verifyResponse = await fetch(`${apiBaseUrl}/api/payment/verify`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                plan: selectedPlan,
              }),
            });

            const verifyResult = await verifyResponse.json();
            if (verifyResult.status) {
              toast.success(verifyResult.message || "Upgrade completed successfully!", { id: "payment-toast" });
              // Save updated user to Zustand
              setUser(verifyResult.data);
              // Close subscription modal
              setSubscriptionModalOpen(false);
            } else {
              toast.error(verifyResult.message || "Payment verification failed.", { id: "payment-toast" });
            }
          } catch (err) {
            console.error("Signature verification error:", err);
            toast.error("Internal verification error occurred.", { id: "payment-toast" });
          }
        },
        prefill: {
          name: userData?.name || "",
          email: userData?.email || "",
        },
        notes: {
          userId: userData?.email || "anonymous",
          selectedPlan,
        },
        theme: {
          color: selectedPlan === "platinum" ? "#EAB308" : "#2563EB",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", (failedRes: any) => {
        toast.error(`Payment failed: ${failedRes.error.description}`);
      });
      rzp.open();
    } catch (error) {
      console.error("Checkout initiation failed:", error);
      toast.error("Could not complete checkout process.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-all font-nunito-sans">
      <div 
        className="bg-gradient-to-b from-[#0F1C3F] to-[#0A1229] border border-white/10 text-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative p-8 md:p-10 flex flex-col gap-6 max-h-[95vh] overflow-y-auto font-nunito-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={() => setSubscriptionModalOpen(false)}
          className="absolute top-6 right-6 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all border-0 outline-none cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center flex flex-col gap-2 mt-4 font-nunito-sans">
          <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-[10px] font-black uppercase px-3 py-1 rounded-full w-max mx-auto tracking-wider font-nunito-sans">
            Upgrade to Premium
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 leading-tight font-nunito-sans">
            Unlock Your English Potential
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto leading-relaxed font-nunito-sans">
            Choose the plan that fits your learning journey and start speaking like a native speaker today.
          </p>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 font-nunito-sans">
          {/* Gold Monthly Plan */}
          <div 
            onClick={() => setSelectedPlan("gold")}
            className={`border rounded-2xl p-6 cursor-pointer transition-all flex flex-col justify-between h-64 relative hover:scale-[1.01] font-nunito-sans ${
              selectedPlan === "gold" 
                ? "border-blue-500 bg-blue-950/20 shadow-[0_0_25px_rgba(59,130,246,0.2)]" 
                : "border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/15"
            }`}
          >
            <div className="flex justify-between items-start font-nunito-sans">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 font-nunito-sans">
                  Gold Monthly
                </h3>
                <p className="text-xs text-gray-400 mt-1 font-nunito-sans">Perfect for consistent learners</p>
              </div>
              {selectedPlan === "gold" && (
                <span className="bg-blue-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-nunito-sans">
                  Active
                </span>
              )}
            </div>

            <ul className="text-xs text-gray-300 mt-4 flex flex-col gap-2 flex-grow font-nunito-sans">
              <li className="flex items-center gap-2 font-nunito-sans">
                <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                Unlimited Natural Chats
              </li>
              <li className="flex items-center gap-2 font-nunito-sans">
                <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                Unlimited Character, Debate & Roleplay
              </li>
              <li className="flex items-center gap-2 font-nunito-sans">
                <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                3 daily messages for Business, Vocab, Story, Travel
              </li>
            </ul>

            <div className="text-2xl font-black text-white mt-4 border-t border-white/5 pt-3 font-nunito-sans">
              ₹799<span className="text-xs font-normal text-gray-400">/month</span>
            </div>
          </div>

          {/* Platinum Yearly Plan */}
          <div 
            onClick={() => setSelectedPlan("platinum")}
            className={`border rounded-2xl p-6 cursor-pointer transition-all flex flex-col justify-between h-64 relative hover:scale-[1.01] font-nunito-sans ${
              selectedPlan === "platinum" 
                ? "border-amber-400 bg-amber-950/20 shadow-[0_0_25px_rgba(245,158,11,0.2)]" 
                : "border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/15"
            }`}
          >
            <div className="flex justify-between items-start gap-2 font-nunito-sans">
              <div>
                <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2 font-nunito-sans">
                  Platinum Yearly
                </h3>
                <p className="text-xs text-gray-400 mt-1 font-nunito-sans">Complete fluency mastery</p>
              </div>
              <span className="bg-amber-500 text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider flex-shrink-0 font-nunito-sans">
                Save 33%
              </span>
            </div>

            <ul className="text-xs text-gray-300 mt-4 flex flex-col gap-2 flex-grow font-nunito-sans">
              <li className="flex items-center gap-2 font-nunito-sans">
                <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                Unlimited Natural Chats
              </li>
              <li className="flex items-center gap-2 font-nunito-sans">
                <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                Unlimited Character, Debate & Roleplay
              </li>
              <li className="flex items-center gap-2 text-amber-300 font-semibold font-nunito-sans">
                <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                Unlimited Business, Vocab, Story, Travel
              </li>
            </ul>

            <div className="text-2xl font-black text-white mt-4 border-t border-white/5 pt-3 font-nunito-sans">
              ₹5,999<span className="text-xs font-normal text-gray-400 font-nunito-sans">/year</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSubscribe}
          disabled={isPending}
          className={`w-full py-4 rounded-xl font-bold transition-all text-base border-none cursor-pointer mt-2 font-nunito-sans ${
            selectedPlan === "platinum"
              ? "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black shadow-lg shadow-amber-950/20"
              : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-950/20"
          } disabled:opacity-50`}
        >
          {isPending ? "Opening Checkout Pop-up..." : `Proceed to Pay ₹${selectedPlan === "gold" ? "799" : "5,999"}`}
        </button>

        {/* Footer */}
        <p className="text-[11px] text-gray-500 text-center -mt-2 leading-relaxed font-nunito-sans">
          Payments are secured via Razorpay. Supports UPI, Netbanking, Cards, and Wallets.
        </p>
      </div>
    </div>
  );
};

export default SubscriptionModal;
