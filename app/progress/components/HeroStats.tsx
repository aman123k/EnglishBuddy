import React from "react";
import { Star, Target } from "lucide-react";

interface HeroStatsProps {
  languageLevel?: string;
  learningGoal?: string;
  totalXp: number;
  weeklyXp: number;
  activeGoal: { name: string; xp: number };
  targetPercentage: number;
  fluencyInfo: {
    percent: number;
    nextLevel: string;
    xpNeeded: number;
  };
}

export const HeroStats: React.FC<HeroStatsProps> = ({
  languageLevel,
  learningGoal,
  totalXp,
  weeklyXp,
  activeGoal,
  targetPercentage,
  fluencyInfo,
}) => {
  return (
    <div className="bg-gradient-to-br from-[#1C398E] via-[#2a4db5] to-indigo-900 rounded-[28px] p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full -translate-y-10 translate-x-20 blur-2xl pointer-events-none"></div>
      <div className="absolute left-1/3 bottom-0 w-60 h-60 bg-indigo-500/10 rounded-full translate-y-20 blur-xl pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
        {/* Profile Stats */}
        <div className="flex items-center gap-5 lg:border-r lg:border-white/10 lg:pr-8">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/20 shadow-inner backdrop-blur-md">
            <Star size={32} className="fill-yellow-400 text-yellow-400 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-semibold text-white/70 uppercase tracking-widest block">
              Fluency Level
            </span>
            <h3 className="text-2xl font-black font-nunito-sans tracking-tight">
              {languageLevel || "Intermediate"}
            </h3>
            <span className="text-[11px] font-bold bg-white/20 text-white/95 px-2 py-0.5 rounded-full mt-1.5 inline-block">
              Goal: {learningGoal || "Daily Practice"}
            </span>
          </div>
        </div>

        {/* Level Up progress bar */}
        <div className="flex flex-col gap-2.5 lg:border-r lg:border-white/10 lg:px-8">
          <div className="flex justify-between items-center text-sm font-semibold">
            <span className="text-white/80 font-nunito-sans font-bold text-xs uppercase tracking-wider">
              Progress to {fluencyInfo.nextLevel}
            </span>
            <span className="text-white font-black text-sm">{fluencyInfo.percent}%</span>
          </div>
          <div className="w-full bg-white/15 h-3 rounded-full overflow-hidden border border-white/5 p-[1px]">
            <div
              className="bg-gradient-to-r from-emerald-400 to-green-500 h-full rounded-full transition-all duration-1000 ease-out shadow-sm"
              style={{ width: `${fluencyInfo.percent}%` }}
            ></div>
          </div>
          <span className="text-[11px] font-semibold text-white/60">
            {fluencyInfo.xpNeeded > 0
              ? `${fluencyInfo.xpNeeded} XP needed to advance rank`
              : "Maximum level achieved!"}
          </span>
        </div>

        {/* Study target meter */}
        <div className="flex items-center gap-5 lg:pl-8">
          <div className="relative w-16 h-16 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-95" viewBox="0 0 36 36">
              <path
                className="text-white/10"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-400 transition-all duration-1000"
                strokeWidth="3.5"
                strokeDasharray={`${targetPercentage}, 100`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Target size={18} className="text-white/90" />
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-white/70 uppercase tracking-widest block">
              Weekly Goal Progress
            </span>
            <h4 className="text-xl font-bold tracking-tight">
              {weeklyXp} / {activeGoal.xp} XP
            </h4>
            <span className="text-[10px] font-bold text-emerald-300 block uppercase tracking-wider mt-0.5">
              {targetPercentage}% Completed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
