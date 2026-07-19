import React from "react";
import { Bell, Search, Settings, Trophy } from "lucide-react";

interface DashboardHeaderProps {
  userName?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName }) => {
  return (
    <header className="py-8 px-8 flex flex-col md:flex-row md:items-center justify-between gap-6 sticky top-0 max-[650px]:top-12 bg-[#F7F7FE]/95 backdrop-blur-md z-30 border-b border-gray-200/50">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-[#282828] tracking-tight">
          Welcome back, {userName || "Learner"}! 👋
        </h1>
        <div className="flex items-center gap-2">
          <Trophy size={14} className="text-amber-500" />
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest opacity-60">
            Master English Daily
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative group hidden sm:block">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1C398E] transition-colors"
            size={16}
          />
          <input
            type="text"
            placeholder="Search lessons..."
            className="bg-white border border-gray-200 rounded-xl py-2 pl-9 pr-4 outline-none focus:ring-4 focus:ring-[#1C398E]/5 focus:border-[#1C398E]/30 transition-all w-64 text-sm font-semibold"
          />
        </div>
        <button className="p-2.5 bg-white border max-[650px]:hidden border-gray-200 rounded-xl text-gray-500 hover:text-[#1C398E] hover:border-[#1C398E]/30 transition-all shadow-sm">
          <Bell size={20} />
        </button>
        <div className="w-10 h-10 rounded-2xl max-[650px]:hidden bg-[#1C398E] text-white flex items-center justify-center font-black text-xs shadow-lg shadow-[#1C398E]/20 cursor-pointer hover:scale-105 transition-transform">
          {userName?.charAt(0).toUpperCase() || "L"}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
