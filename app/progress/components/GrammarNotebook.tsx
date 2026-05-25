import React, { useState, useMemo } from "react";
import { Search, Sparkles, ChevronRight, CheckCircle2 } from "lucide-react";

interface Mistake {
  _id: string;
  original: string;
  corrected: string;
  explanation: string;
  mode: string;
  timestamp: string;
}

interface GrammarNotebookProps {
  grammarMistakes: Mistake[];
}

export const GrammarNotebook: React.FC<GrammarNotebookProps> = ({
  grammarMistakes,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModeFilter, setSelectedModeFilter] = useState("all");
  const [expandedMistake, setExpandedMistake] = useState<string | null>(null);

  const filteredMistakes = useMemo(() => {
    if (!grammarMistakes) return [];
    return grammarMistakes.filter((m) => {
      const matchesSearch =
        m.original.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.corrected.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.explanation.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMode = selectedModeFilter === "all" || m.mode === selectedModeFilter;
      return matchesSearch && matchesMode;
    });
  }, [grammarMistakes, searchTerm, selectedModeFilter]);

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <header className="flex flex-col">
          <h3 className="text-lg font-bold text-[#282828] font-nunito-sans tracking-tight">
            Grammar Review Notebook
          </h3>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            Analyze, correct, and master your writing slipups
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Mode select */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-500">
            <span>Mode:</span>
            <select
              value={selectedModeFilter}
              onChange={(e) => setSelectedModeFilter(e.target.value)}
              className="bg-transparent text-[#1C398E] font-black focus:outline-none cursor-pointer"
            >
              <option value="all">All Modes</option>
              <option value="chat">Natural Chats</option>
              <option value="character">Character Talks</option>
              <option value="debate">Debates</option>
              <option value="roleplay">Roleplays</option>
            </select>
          </div>

          {/* Search Bar */}
          <div className="relative flex items-center bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5 text-xs w-full sm:w-48">
            <Search size={14} className="text-slate-400 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search mistakes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent focus:outline-none w-full text-slate-600 font-semibold"
            />
          </div>
        </div>
      </div>

      {/* Mistakes List */}
      {filteredMistakes.length > 0 ? (
        <div className="flex flex-col gap-4">
          {filteredMistakes.map((mistake) => {
            const isExpanded = expandedMistake === mistake._id;
            const mistakeDate = new Date(mistake.timestamp).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            // Badge formatting depending on mode
            let badgeColor = "bg-blue-50 text-blue-600 border-blue-100";
            let modeLabel = "Natural Chat";
            if (mistake.mode === "character") {
              badgeColor = "bg-purple-50 text-purple-600 border-purple-100";
              modeLabel = "Character Talk";
            } else if (mistake.mode === "debate") {
              badgeColor = "bg-amber-50 text-amber-600 border-amber-100";
              modeLabel = "Intellectual Debate";
            } else if (mistake.mode === "roleplay") {
              badgeColor = "bg-emerald-50 text-emerald-600 border-emerald-100";
              modeLabel = "Immersive Roleplay";
            }

            return (
              <div
                key={mistake._id}
                className={`border rounded-2xl transition-all duration-300 ${
                  isExpanded
                    ? "border-[#1C398E]/30 bg-slate-50/40 shadow-sm"
                    : "border-slate-100 hover:border-[#1C398E]/20"
                }`}
              >
                {/* Summary Header */}
                <div
                  onClick={() => setExpandedMistake(isExpanded ? null : mistake._id)}
                  className="p-4 flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <span className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 flex-shrink-0">
                      <Sparkles size={16} />
                    </span>
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="text-slate-700 font-semibold text-sm truncate">
                        {mistake.original}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                        <span className={`text-[9px] font-bold border px-2 py-0.5 rounded-full ${badgeColor}`}>
                          {modeLabel}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">
                          {mistakeDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 max-[450px]:hidden">
                      Correction Available
                    </span>
                    <ChevronRight
                      size={16}
                      className={`text-slate-400 transition-transform duration-300 ${
                        isExpanded ? "rotate-90 text-[#1C398E]" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Extended Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-dashed border-slate-150 grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-top-1 duration-200">
                    {/* Original vs Corrected Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      {/* Original */}
                      <div className="bg-red-50/30 border border-red-100/50 p-4 rounded-xl flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                          ✕
                        </span>
                        <div>
                          <span className="text-[9px] font-extrabold text-red-400 uppercase tracking-wider block">
                            Your Sentence
                          </span>
                          <p className="text-sm font-semibold text-slate-700 mt-1 leading-relaxed">
                            {mistake.original}
                          </p>
                        </div>
                      </div>

                      {/* Corrected */}
                      <div className="bg-emerald-50/30 border border-emerald-100/50 p-4 rounded-xl flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                          ✓
                        </span>
                        <div>
                          <span className="text-[9px] font-extrabold text-emerald-500 uppercase tracking-wider block">
                            Lingo Correction
                          </span>
                          <p className="text-sm font-bold text-slate-800 mt-1 leading-relaxed">
                            {mistake.corrected}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Explanation */}
                    {mistake.explanation && (
                      <div className="bg-white border border-slate-100 p-4 rounded-xl">
                        <span className="text-[9px] font-extrabold text-[#1C398E] uppercase tracking-wider block mb-1">
                          Grammar Coach Explanation
                        </span>
                        <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                          {mistake.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl">
          <CheckCircle2 className="mx-auto text-slate-300 mb-3" size={36} />
          <h4 className="text-sm font-bold text-slate-700">No mistakes found</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            {searchTerm || selectedModeFilter !== "all"
              ? "Try tweaking your filters or search keyword."
              : "Awesome job! You haven't made any grammatical errors yet."}
          </p>
        </div>
      )}
    </div>
  );
};
export default GrammarNotebook;
