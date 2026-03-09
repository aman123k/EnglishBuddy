import React from "react";
import { Sparkles, Play } from "lucide-react";
import Link from "next/link";

const HomeHero = () => {
  return (
    <section className="px-0">
      <Link href="/learning-modes/chat" className="group block">
        <div className="relative h-[320px] md:h-[400px] rounded-[2.5rem] bg-indigo-50/50 overflow-hidden border border-indigo-100 shadow-2xl shadow-indigo-900/5 transition-all">
          <img
            src="/Images/chat.png"
            alt="AI Chat Teacher"
            className="opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 gap-5 z-10 w-full md:w-2/3">
            <div className="flex items-center gap-2 bg-indigo-500/30 backdrop-blur-md border border-indigo-200/20 px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest text-white uppercase w-fit">
              <Sparkles size={12} className="text-amber-400" /> Daily Routine
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Natural <br />
                <span className="text-indigo-300 italic">Conversations</span>
              </h2>
              <p className="text-slate-200 text-xs md:text-sm font-medium uppercase tracking-widest leading-relaxed max-w-sm">
                Chat freely with your personal AI tutor to build natural fluency
                and confidence every day.
              </p>
            </div>

            <button className="bg-white text-[#1C398E] px-6 py-3 rounded-2xl font-semibold text-xs uppercase tracking-widest flex items-center gap-3 w-fit transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-xl">
              Start Chatting <Play size={12} fill="currentColor" />
            </button>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default HomeHero;
