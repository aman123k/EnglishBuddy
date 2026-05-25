import React from "react";
import { Flame, Zap, BookOpen } from "lucide-react";

interface StatsOverviewProps {
  currentStreak: number;
  longestStreak: number;
  totalXp: number;
  totalMessages: number;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  currentStreak,
  longestStreak,
  totalXp,
  totalMessages,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {/* Current Streak */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300 relative group">
        <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
          <Flame size={24} className="fill-orange-500 text-orange-500" />
        </div>
        <div>
          <p className="text-gray-400 font-semibold text-[10px] uppercase tracking-widest">
            Current Streak
          </p>
          <h4 className="text-xl font-bold text-slate-800 tracking-tight">
            {currentStreak} Days
          </h4>
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            Best: {longestStreak} days
          </span>
        </div>
      </div>

      {/* Total XP */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300 relative group">
        <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-500 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
          <Zap size={24} className="fill-emerald-500 text-emerald-500" />
        </div>
        <div>
          <p className="text-gray-400 font-semibold text-[10px] uppercase tracking-widest">
            Total Earned XP
          </p>
          <h4 className="text-xl font-bold text-slate-800 tracking-tight">
            {totalXp} XP
          </h4>
          <span className="text-[10px] font-bold text-emerald-500 uppercase">
            Level Up Boost Active
          </span>
        </div>
      </div>

      {/* Conversations */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300 relative group">
        <div className="w-12 h-12 rounded-xl bg-indigo-100 text-[#1C398E] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
          <BookOpen size={24} />
        </div>
        <div>
          <p className="text-gray-400 font-semibold text-[10px] uppercase tracking-widest">
            Total Conversations
          </p>
          <h4 className="text-xl font-bold text-slate-800 tracking-tight">
            {totalMessages} Messages
          </h4>
          <span className="text-[10px] font-bold text-[#1C398E] uppercase">
            All modes active
          </span>
        </div>
      </div>
    </div>
  );
};
