import React from "react";

interface AccuracyGaugeProps {
  grammarAccuracy: number;
}

export const AccuracyGauge: React.FC<AccuracyGaugeProps> = ({
  grammarAccuracy,
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col gap-6 justify-between">
      {/* Accuracy Gauge header */}
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold text-[#282828] font-nunito-sans tracking-tight">
          Accuracy & Accuracy Rate
        </h3>
        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
          Grammatical correctness in chats
        </p>
      </div>

      {/* Semicircle radial dial */}
      <div className="flex flex-col items-center justify-center py-2 relative">
        <div className="w-36 h-36 relative">
          <svg className="w-full h-full transform -rotate-180" viewBox="0 0 100 100">
            {/* Grey background arc */}
            <path
              d="M 15,85 A 35,35 0 0,1 85,85"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Active progress arc */}
            <path
              d="M 15,85 A 35,35 0 0,1 85,85"
              fill="none"
              stroke="url(#accuracyGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="110"
              strokeDashoffset={110 - (110 * grammarAccuracy) / 100}
              className="transition-all duration-1000 ease-out"
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="accuracyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>

          {/* Gauge internal text */}
          <div className="absolute inset-0 flex flex-col justify-end items-center pb-4 text-center">
            <span className="text-3xl font-black text-slate-800 tracking-tight font-nunito-sans leading-none">
              {grammarAccuracy}%
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mt-1">
              Accuracy
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
          <span>Accuracy Rating</span>
          <span className="text-emerald-500 font-bold uppercase tracking-wider">
            {grammarAccuracy >= 90
              ? "Excellent"
              : grammarAccuracy >= 75
              ? "Good"
              : grammarAccuracy >= 50
              ? "Improving"
              : "Needs Practice"}
          </span>
        </div>
        <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
          Accuracy rates estimate formatting and grammatical fluency. Avoid mistakes to build a perfect rating!
        </p>
      </div>
    </div>
  );
};
