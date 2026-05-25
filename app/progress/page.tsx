"use client";

import React, { useState, useMemo } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import useAuthentication from "../hooks/useAuth";
import useGetAPIRequest from "../hooks/useGetAPIRequest";
import { GET_USER_COMMON } from "../queryKeys/allQueryKeys";
import { Target, ChevronDown, XCircle, RefreshCw } from "lucide-react";

// Import modular components
import { HeroStats } from "./components/HeroStats";
import { StatsOverview } from "./components/StatsOverview";
import { WeeklyActivityChart } from "./components/WeeklyActivityChart";
import { AccuracyGauge } from "./components/AccuracyGauge";
import { ModesDistribution } from "./components/ModesDistribution";
import { GrammarNotebook } from "./components/GrammarNotebook";

interface ProgressData {
  totalMessages: number;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  grammarAccuracy: number;
  modeBreakdown: {
    chat: number;
    character: number;
    debate: number;
    roleplay: number;
  };
  weeklyActivity: {
    dayName: string;
    date: string;
    count: number;
  }[];
  grammarMistakes: {
    _id: string;
    original: string;
    corrected: string;
    explanation: string;
    mode: string;
    timestamp: string;
  }[];
}

const GOALS = [
  { name: "Casual", xp: 50, desc: "5 mins / day" },
  { name: "Regular", xp: 150, desc: "15 mins / day" },
  { name: "Intensive", xp: 300, desc: "30 mins / day" },
  { name: "Insane", xp: 600, desc: "60 mins / day" },
];

export default function ProgressPage() {
  const { userData, isLoading: isAuthLoading } = useAuthentication();
  const [selectedGoal, setSelectedGoal] = useState("Regular");

  // Send local timezone offset to backend so stats are correct for the user
  const timezoneOffset =
    typeof window !== "undefined" ? new Date().getTimezoneOffset() : 0;

  const {
    data: responseData,
    isLoading: isProgressLoading,
    isError,
    refetch,
  } = useGetAPIRequest<ProgressData>(
    `/api/userProgress?timezoneOffset=${timezoneOffset}`,
    GET_USER_COMMON("/api/userProgress"),
    1000 * 60 * 5, // 5 minutes cache
  );

  const progress = responseData?.data;

  // Active weekly XP (estimate 20 XP per message in the last 7 days)
  const weeklyXp = useMemo(() => {
    if (!progress?.weeklyActivity) return 0;
    const totalCount = progress.weeklyActivity.reduce(
      (sum, d) => sum + d.count,
      0,
    );
    return totalCount * 20;
  }, [progress?.weeklyActivity]);

  const activeGoal = useMemo(() => {
    return GOALS.find((g) => g.name === selectedGoal) || GOALS[1];
  }, [selectedGoal]);

  const targetPercentage = useMemo(() => {
    return Math.min(100, Math.round((weeklyXp / activeGoal.xp) * 100));
  }, [weeklyXp, activeGoal]);

  // Fluency level mapping for progress towards next level
  const fluencyInfo = useMemo(() => {
    const level = userData?.languageLevel || "Beginner";
    let currentLevel = "Beginner";
    let nextLevel = "Elementary";
    let reqXp = 500;
    let baseLevelXp = 0;

    if (level.toLowerCase().includes("elementary") || level.includes("A2")) {
      currentLevel = "Elementary";
      nextLevel = "Intermediate";
      baseLevelXp = 500;
      reqXp = 1500;
    } else if (
      level.toLowerCase().includes("intermediate") ||
      level.includes("B1") ||
      level.includes("B2")
    ) {
      currentLevel = "Intermediate";
      nextLevel = "Advanced";
      baseLevelXp = 1500;
      reqXp = 4000;
    } else if (
      level.toLowerCase().includes("advanced") ||
      level.includes("C1") ||
      level.includes("C2")
    ) {
      currentLevel = "Advanced";
      nextLevel = "Fluent Proficient";
      baseLevelXp = 4000;
      reqXp = 10000;
    }

    const currentXp = progress?.totalXp || 0;
    const xpDiff = Math.max(0, currentXp - baseLevelXp);
    const xpNeededForNext = reqXp - baseLevelXp;
    const percent = Math.min(100, Math.round((xpDiff / xpNeededForNext) * 100));

    return {
      currentLevel,
      nextLevel,
      percent,
      xpNeeded: reqXp - currentXp > 0 ? reqXp - currentXp : 0,
    };
  }, [userData?.languageLevel, progress?.totalXp]);

  // Max weekly messages for SVG scaling
  const maxWeeklyCount = useMemo(() => {
    if (!progress?.weeklyActivity) return 5;
    const counts = progress.weeklyActivity.map((d) => d.count);
    return Math.max(...counts, 5);
  }, [progress?.weeklyActivity]);

  const modePercentages = useMemo(() => {
    if (!progress?.modeBreakdown)
      return { chat: 0, character: 0, debate: 0, roleplay: 0 };
    const { chat, character, debate, roleplay } = progress.modeBreakdown;
    const total = chat + character + debate + roleplay;
    if (total === 0)
      return { chat: 25, character: 25, debate: 25, roleplay: 25 };
    return {
      chat: Math.round((chat / total) * 100),
      character: Math.round((character / total) * 100),
      debate: Math.round((debate / total) * 100),
      roleplay: Math.round((roleplay / total) * 100),
    };
  }, [progress?.modeBreakdown]);

  if (isAuthLoading || isProgressLoading) {
    return (
      <section className="bg-[#F7F7FE] min-h-screen">
        <section className="flex flex-col md:flex-row h-screen max-w-[1600px] mx-auto overflow-hidden">
          <Sidebar />
          <section className="flex-1 overflow-y-auto no-scrollbar bg-[#F7F7FE] relative pb-20 md:pb-10">
            <DashboardHeader userName={userData?.name} />
            <div className="max-w-6xl mx-auto px-4 md:px-10 py-6 space-y-8 animate-pulse">
              <div className="h-40 bg-white rounded-3xl border border-slate-100 shadow-sm"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="h-28 bg-white rounded-2xl border border-slate-100 shadow-sm"></div>
                <div className="h-28 bg-white rounded-2xl border border-slate-100 shadow-sm"></div>
                <div className="h-28 bg-white rounded-2xl border border-slate-100 shadow-sm"></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 h-96 bg-white rounded-3xl border border-slate-100 shadow-sm"></div>
                <div className="h-96 bg-white rounded-3xl border border-slate-100 shadow-sm"></div>
              </div>
            </div>
          </section>
        </section>
      </section>
    );
  }

  if (isError || !progress) {
    return (
      <section className="bg-[#F7F7FE] min-h-screen">
        <section className="flex flex-col md:flex-row h-screen max-w-[1600px] mx-auto overflow-hidden">
          <Sidebar />
          <section className="flex-1 overflow-y-auto no-scrollbar bg-[#F7F7FE] relative pb-20 md:pb-10 flex flex-col justify-center items-center">
            <div className="text-center p-8 bg-white rounded-3xl border border-slate-100 shadow-lg max-w-md mx-auto">
              <XCircle className="mx-auto text-red-500 mb-4" size={50} />
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Failed to load progress
              </h3>
              <p className="text-slate-500 mb-6 text-sm">
                There was a problem loading your personalized statistics. Please
                check your connection and try again.
              </p>
              <button
                onClick={() => refetch()}
                className="px-6 py-2.5 bg-[#1C398E] text-white rounded-xl font-semibold shadow-md hover:bg-[#152e75] transition-all flex items-center gap-2 mx-auto"
              >
                <RefreshCw size={16} /> Retry
              </button>
            </div>
          </section>
        </section>
      </section>
    );
  }

  return (
    <section className="bg-[#F7F7FE] min-h-screen">
      <section className="flex flex-col md:flex-row h-screen max-w-[1600px] mx-auto overflow-hidden">
        <Sidebar />

        <section className="flex-1 overflow-y-auto no-scrollbar bg-[#F7F7FE] relative pb-20 md:pb-10">
          <div className="max-w-6xl mx-auto flex flex-col gap-8 px-4 md:px-10 pt-20 min-[950px]:pt-10 pb-10">
            {/* Header 2: Dashboard Title and Goal Selector */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-[#282828] font-nunito-sans tracking-tight animate-in fade-in slide-in-from-bottom-2 duration-300">
                  Your Learning Dashboard
                </h2>
                <p className="text-slate-400 font-nunito-sans font-bold text-xs uppercase tracking-widest opacity-80 mt-1">
                  Keep tracking your daily metrics & target goals
                </p>
              </div>

              {/* Weekly Goal Selector */}
              <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-gray-100 shadow-sm self-start md:self-auto hover:shadow-md transition-shadow duration-300">
                <Target size={18} className="text-[#1C398E]" />
                <span className="text-xs font-bold text-slate-500 font-nunito-sans uppercase tracking-wider">
                  Goal:
                </span>
                <div className="relative group">
                  <select
                    value={selectedGoal}
                    onChange={(e) => setSelectedGoal(e.target.value)}
                    className="appearance-none bg-transparent pr-8 text-sm font-extrabold text-[#1C398E] focus:outline-none cursor-pointer font-nunito-sans"
                  >
                    {GOALS.map((g) => (
                      <option
                        key={g.name}
                        value={g.name}
                        className="text-slate-800"
                      >
                        {g.name} ({g.xp} XP)
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-[#1C398E] pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Level & Streak Stats Hero Box Component */}
            <HeroStats
              languageLevel={userData?.languageLevel}
              learningGoal={userData?.learningGoal}
              totalXp={progress.totalXp}
              weeklyXp={weeklyXp}
              activeGoal={activeGoal}
              targetPercentage={targetPercentage}
              fluencyInfo={fluencyInfo}
            />

            {/* Quick Cards Grid Component */}
            <StatsOverview
              currentStreak={progress.currentStreak}
              longestStreak={progress.longestStreak}
              totalXp={progress.totalXp}
              totalMessages={progress.totalMessages}
            />

            {/* Charts & Breakdown Grid Components */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Weekly Activity (Bar Chart) */}
              <WeeklyActivityChart
                weeklyActivity={progress.weeklyActivity}
                maxWeeklyCount={maxWeeklyCount}
              />

              {/* Accuracy Radial Gauge */}
              <AccuracyGauge grammarAccuracy={progress.grammarAccuracy} />
            </div>

            {/* Learning Modes distribution */}
            <ModesDistribution
              modeBreakdown={progress.modeBreakdown}
              modePercentages={modePercentages}
            />

            {/* Review Center (Grammar Notebook) Component */}
            <GrammarNotebook grammarMistakes={progress.grammarMistakes} />
          </div>
        </section>
      </section>
    </section>
  );
}
