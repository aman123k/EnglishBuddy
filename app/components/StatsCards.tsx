import React from "react";
import { Flame, Star, Zap } from "lucide-react";

interface StatsCardsProps {
  streak?: number;
  level?: string;
  xp?: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({
  streak = 12,
  level = "Intermediate",
  xp = 2450,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-4 pt-6">
      {/* Streak Card */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
        <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center shadow-inner">
          <Flame size={24} />
        </div>
        <div>
          <p className="text-gray-400 font-semibold text-[10px] uppercase tracking-widest">
            Current Streak
          </p>
          <h4 className="text-xl font-bold text-slate-800 tracking-tight">
            {streak} Days
          </h4>
        </div>
      </div>

      {/* Level Card */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
        <div className="w-12 h-12 rounded-xl bg-indigo-100 text-[#1C398E] flex items-center justify-center shadow-inner">
          <Star size={24} />
        </div>
        <div>
          <p className="text-gray-400 font-semibold text-[10px] uppercase tracking-widest">
            Fluency Level
          </p>
          <h4 className="text-xl font-bold text-slate-800 tracking-tight">
            {level}
          </h4>
        </div>
      </div>

      {/* XP Card */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
        <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-500 flex items-center justify-center shadow-inner">
          <Zap size={24} />
        </div>
        <div>
          <p className="text-gray-400 font-semibold text-[10px] uppercase tracking-widest">
            Total XP
          </p>
          <h4 className="text-xl font-bold text-slate-800 tracking-tight">
            {xp}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
