import React from "react";
import { MessageSquare, Users, Scale, Drama } from "lucide-react";

interface ModesDistributionProps {
  modeBreakdown: {
    chat: number;
    character: number;
    debate: number;
    roleplay: number;
  };
  modePercentages: {
    chat: number;
    character: number;
    debate: number;
    roleplay: number;
  };
}

export const ModesDistribution: React.FC<ModesDistributionProps> = ({
  modeBreakdown,
  modePercentages,
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
      <h3 className="text-lg font-bold text-[#282828] font-nunito-sans tracking-tight mb-6">
        Learning Modes Distribution
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Chat Card */}
        <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100/50 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-[#1C398E] flex items-center justify-center">
              <MessageSquare size={16} />
            </span>
            <span className="text-xs font-black text-[#1C398E]">
              {modePercentages.chat}%
            </span>
          </div>
          <h4 className="text-sm font-bold text-slate-800">Natural Chats</h4>
          <p className="text-xs text-slate-500">
            {modeBreakdown.chat} messages exchanged
          </p>
        </div>

        {/* Character Card */}
        <div className="bg-purple-50/50 rounded-2xl p-4 border border-purple-100/50 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <Users size={16} />
            </span>
            <span className="text-xs font-black text-purple-600">
              {modePercentages.character}%
            </span>
          </div>
          <h4 className="text-sm font-bold text-slate-800">Character Talks</h4>
          <p className="text-xs text-slate-500">
            {modeBreakdown.character} messages exchanged
          </p>
        </div>

        {/* Debate Card */}
        <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-100/50 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
              <Scale size={16} />
            </span>
            <span className="text-xs font-black text-amber-600">
              {modePercentages.debate}%
            </span>
          </div>
          <h4 className="text-sm font-bold text-slate-800">Intellectual Debates</h4>
          <p className="text-xs text-slate-500">
            {modeBreakdown.debate} messages exchanged
          </p>
        </div>

        {/* Roleplay Card */}
        <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100/50 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Drama size={16} />
            </span>
            <span className="text-xs font-black text-emerald-600">
              {modePercentages.roleplay}%
            </span>
          </div>
          <h4 className="text-sm font-bold text-slate-800">Immersive Roleplays</h4>
          <p className="text-xs text-slate-500">
            {modeBreakdown.roleplay} messages exchanged
          </p>
        </div>
      </div>
    </div>
  );
};
