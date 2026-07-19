"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/app/store/store";
import useAuthentication from "@/app/hooks/useAuth";
import Loader from "@/app/UIKIT/Loader";

interface PaidGuardProps {
  children: React.ReactNode;
  /** Display name shown on the paywall, e.g. "Business Coach" */
  featureName: string;
  /** Short description shown below the feature name */
  featureDesc?: string;
}

/**
 * Wraps a paid learning-mode page.
 * - Free users → see an upgrade wall
 * - Gold / Platinum users → render children as normal
 */
export function PaidGuard({ children, featureName, featureDesc }: PaidGuardProps) {
  const { userData, isLoading } = useAuthentication();
  const setSubscriptionModalOpen = useStore((s) => s.setSubscriptionModalOpen);
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  const isFree = !userData || userData.subscriptionPlan === "free";

  if (!isFree) {
    // Gold or Platinum — allow through
    return <>{children}</>;
  }

  // Free user — show upgrade wall
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-[#F7F7FE] px-6">
      {/* ── Mobile back button ── */}
      <button
        onClick={() => router.back()}
        className="md:hidden self-start mb-4 flex items-center gap-1.5 text-[#1C398E] font-semibold text-sm
          bg-white border border-[#E9EBF9] px-4 py-2 rounded-xl shadow-sm
          hover:bg-[#E9EBF9] transition-colors duration-200"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back
      </button>

      <div className="max-w-md w-full flex flex-col items-center gap-6 text-center">
        {/* Lock icon */}
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#1C398E] to-[#2d50c7] flex items-center justify-center shadow-2xl shadow-[#1C398E]/25">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-[10px] font-black uppercase px-3 py-1 rounded-full w-max mx-auto tracking-wider">
            Premium Feature
          </span>
          <h2 className="text-2xl font-extrabold text-[#282828] tracking-tight">
            {featureName}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            {featureDesc || `${featureName} is available on Gold and Platinum plans.`}
            {" "}Upgrade to unlock this and all other premium learning modes.
          </p>
        </div>

        {/* Plan comparison */}
        <div className="w-full flex flex-col gap-2.5">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-amber-200 text-left">
            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#d97706" stroke="none">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-amber-700">Gold Plan · ₹799/mo</span>
              <span className="text-[11px] text-gray-500">20 daily messages for this mode</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-indigo-200 text-left">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#4f46e5" stroke="none">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-indigo-700">Platinum Plan · ₹5,999/yr</span>
              <span className="text-[11px] text-gray-500">Unlimited access to all modes</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => setSubscriptionModalOpen(true)}
          className="w-full py-4 rounded-2xl font-bold text-white text-sm
            bg-gradient-to-r from-[#1C398E] to-[#2d50c7]
            hover:from-[#162d7a] hover:to-[#243fa8]
            transition-all duration-300 shadow-lg shadow-[#1C398E]/25
            border-0 cursor-pointer"
        >
          Upgrade to Premium →
        </button>
        <p className="text-[11px] text-gray-400">
          Payments secured via Razorpay · Cancel anytime
        </p>
      </div>
    </div>
  );
}
