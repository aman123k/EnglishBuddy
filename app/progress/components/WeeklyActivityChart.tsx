import React from "react";
import { Calendar } from "lucide-react";

interface WeeklyActivityChartProps {
  weeklyActivity: {
    dayName: string;
    date: string;
    count: number;
  }[];
  maxWeeklyCount: number;
}

export const WeeklyActivityChart: React.FC<WeeklyActivityChartProps> = ({
  weeklyActivity,
  maxWeeklyCount,
}) => {
  return (
    <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <header className="flex flex-col">
          <h3 className="text-lg font-bold text-[#282828] font-nunito-sans tracking-tight">
            Weekly Practice Activity
          </h3>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            Messages sent per day
          </p>
        </header>
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase">
          <Calendar size={14} className="text-slate-400" />
          <span>Last 7 Days</span>
        </div>
      </div>

      {/* SVG Bar Chart */}
      <div className="flex-1 w-full min-h-[220px] relative flex flex-col justify-end mt-4">
        <div className="w-full h-full flex justify-between items-end px-2 md:px-6 relative">
          {/* Y-axis gridlines */}
          <div className="absolute inset-x-0 bottom-0 h-full flex flex-col justify-between pointer-events-none opacity-40">
            <div className="border-t border-dashed border-gray-100 w-full"></div>
            <div className="border-t border-dashed border-gray-100 w-full"></div>
            <div className="border-t border-dashed border-gray-100 w-full"></div>
            <div className="border-t border-dashed border-gray-100 w-full"></div>
            <div className="w-full"></div>
          </div>

          {weeklyActivity.map((day) => {
            // Calculate height percentage
            const heightPercent = maxWeeklyCount > 0 ? (day.count / maxWeeklyCount) * 80 : 0;
            return (
              <div
                key={day.date}
                className="flex flex-col items-center flex-1 group z-10"
              >
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-[90%] transform -translate-y-2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md transition-opacity duration-300 pointer-events-none flex flex-col items-center">
                  <span>{day.count} messages</span>
                  <span className="text-[8px] text-slate-300 font-medium">+{day.count * 15} XP</span>
                </div>

                {/* SVG Bar representation with gradient */}
                <div className="w-8 md:w-11 bg-slate-50 rounded-t-lg overflow-hidden flex flex-col justify-end relative h-40">
                  <div
                    className="bg-gradient-to-t from-[#1C398E] to-indigo-500 rounded-t-lg transition-all duration-700 ease-out"
                    style={{ height: `${Math.max(4, heightPercent)}%` }}
                  ></div>
                </div>

                <span className="text-[11px] font-bold text-slate-400 mt-2.5 font-nunito-sans">
                  {day.dayName}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
