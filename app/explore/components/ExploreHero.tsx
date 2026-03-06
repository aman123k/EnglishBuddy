import { Sparkles, Play } from "lucide-react";
import Link from "next/link";

const ExploreHero = () => {
  return (
    <section className="px-8 z-0">
      <Link href="/learning-modes/roleplays" className="group block">
        <div className="relative h-[450px] rounded-[2.5rem] bg-slate-100 overflow-hidden border border-gray-200 shadow-2xl shadow-indigo-900/10 transition-all">
          <img
            src="/Images/roleplay.png"
            alt="Fearless Negotiations"
            className="opacity-90 brightness-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-900/20 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 gap-6 z-10">
            <div className="flex items-center gap-2 bg-indigo-500/30 backdrop-blur-md border border-indigo-200/20 px-3 py-1 rounded-full text-[10px] font-black tracking-widest text-white uppercase w-fit">
              <Sparkles size={12} className="text-amber-400" /> Current
              Highlight
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-black text-white font-nunito-sans leading-tight">
                Immersive <br />
                <span className="text-[#1C398E] italic">Roleplay</span>
              </h2>
              <p className="text-slate-300 font-nunito-sans text-xs md:text-sm font-bold uppercase tracking-widest max-w-sm">
                Step into real-world scenarios and master conversational English
                naturally.
              </p>
            </div>

            <button className="bg-white text-slate-900 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 w-fit transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-xl">
              Start Scenario <Play size={12} fill="currentColor" />
            </button>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default ExploreHero;
