"use client";
import React from "react";
import usePostAPIRequest from "@/app/hooks/usePostAPIRequest";
import { useStore } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { GET_USER_INFORMATION } from "@/app/queryKeys/allQueryKeys";
import { deleteClientCookie } from "@/app/utils/cookie";
import useAuthentication from "@/app/hooks/useAuth";

type SettingsRow = {
  title: string;
  desc: string;
  action: string;
  bg: string;
  icon: React.ReactNode;
};

function Container() {
  const { setAccountSidebar, setUser, setSubscriptionModalOpen } = useStore();
  const { userData } = useAuthentication();
  const router = useRouter();
  const queryClient = useQueryClient();

  const plan = (userData?.subscriptionPlan ?? "free") as "free" | "gold" | "platinum";

  const planMeta = {
    free:     { label: "Free",     },
    gold:     { label: "Gold",     },
    platinum: { label: "Platinum", },
  }[plan];

  const { mutateAsync: mutatePost } = usePostAPIRequest();

  const handleProfileSidebar = (title: string) => {
    setAccountSidebar({ isOpen: true, title });
  };

  const handleLogout = async () => {
    const path = "/api/logoutUser";
    const response = await mutatePost({ path, data: {} });
    if (response?.status) {
      deleteClientCookie("lingo_logged_in");
      setUser(null);
      queryClient.removeQueries({
        queryKey: GET_USER_INFORMATION("/api/userInformation"),
      });
      router.push(response.route ?? "/login");
    }
  };

  const settingsRows: SettingsRow[] = [
    {
      title: "Profile",
      desc: "Manage your profile details.",
      action: "Profile",
      bg: "bg-blue-50",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1C398E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      ),
    },
    {
      title: "Settings",
      desc: "Manage your account settings.",
      action: "Settings",
      bg: "bg-violet-50",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
    {
      title: "Support",
      desc: "Help center and contact.",
      action: "Support",
      bg: "bg-emerald-50",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-white py-5 px-6 max-[950px]:bg-[#E9EBF9] rounded-2xl flex flex-col gap-5">
      <h1 className="font-nunito-sans text-xl font-semibold text-[#282828]">
        Account settings
      </h1>

      <section className="flex flex-col gap-2.5 max-[950px]:gap-3">

        {/* ── Subscription Plan Card ── */}
        {plan === "free" ? (
          <div
            onClick={() => setSubscriptionModalOpen(true)}
            className="relative overflow-hidden group flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer
              bg-gradient-to-r from-[#1C398E] to-[#2d50c7]
              hover:from-[#162d7a] hover:to-[#243fa8]
              transition-all duration-300 shadow-md shadow-[#1C398E]/20"
          >
            {/* shimmer sweep */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700
              bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div className="flex flex-col gap-0 flex-1">
              <h6 className="text-sm font-bold text-white">Upgrade to Premium</h6>
              <span className="text-[11px] text-white/70">You are on the Free plan · Unlock all features</span>
            </div>
            <div className="flex-shrink-0 bg-white/20 group-hover:bg-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors">
              Upgrade →
            </div>
          </div>
        ) : (
          <div className={`flex items-center gap-4 px-5 py-4 rounded-2xl border ${
            plan === "gold"
              ? "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200"
              : "bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-200"
          }`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              plan === "gold" ? "bg-amber-100" : "bg-indigo-100"
            }`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill={plan === "gold" ? "#d97706" : "#4f46e5"} stroke="none">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
              </svg>
            </div>
            <div className="flex flex-col gap-0 flex-1">
              <h6 className={`text-sm font-bold ${plan === "gold" ? "text-amber-700" : "text-indigo-700"}`}>
                {planMeta.label} Plan
              </h6>
              <span className={`text-[11px] ${plan === "gold" ? "text-amber-600/70" : "text-indigo-600/70"}`}>
                Premium subscription active
              </span>
            </div>
            <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
              plan === "gold" ? "bg-amber-200 text-amber-700" : "bg-indigo-200 text-indigo-700"
            }`}>Active</span>
          </div>
        )}

        {/* ── Settings rows ── */}
        {settingsRows.map(({ title, desc, icon, bg, action }) => (
          <div
            key={action}
            onClick={() => handleProfileSidebar(action)}
            className="group flex items-center gap-4 px-5 py-3.5 rounded-2xl cursor-pointer
              max-[950px]:border-white max-[950px]:bg-white
              border border-[#E9EBF9] hover:border-slate-200 hover:bg-slate-50/60
              transition-all duration-200"
          >
            <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 duration-200`}>
              {icon}
            </div>
            <div className="flex flex-col gap-0 flex-1">
              <h6 className="group-hover:text-[#1C398E] text-[14px] font-nunito-sans text-[#282828] font-semibold leading-none">
                {title}
              </h6>
              <span className="group-hover:text-[#6687eb] text-[11px] text-[#868686] mt-0.5">
                {desc}
              </span>
            </div>
            <svg className="text-slate-300 group-hover:text-[#1C398E] transition-colors" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        ))}

        {/* ── Logout ── */}
        <div
          onClick={handleLogout}
          className="group flex items-center gap-4 px-5 py-3.5 rounded-2xl cursor-pointer
            max-[950px]:border-white max-[950px]:bg-white
            border border-[#E9EBF9] hover:border-red-100 hover:bg-red-50/40
            transition-all duration-200"
        >
          <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 duration-200">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </div>
          <div className="flex flex-col gap-0 flex-1">
            <h6 className="text-[14px] font-nunito-sans text-red-600 font-semibold leading-none">Log out</h6>
            <span className="group-hover:text-red-400 text-[11px] text-[#868686] mt-0.5">
              Log out from this profile.
            </span>
          </div>
          <svg className="text-red-300 group-hover:text-red-500 transition-colors" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>

      </section>
    </section>
  );
}

export default Container;
