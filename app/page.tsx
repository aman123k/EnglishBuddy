"use client";
import React from "react";
import Sidebar from "./components/Sidebar";
import useAuthentication from "./hooks/useAuth";
import FeatureCard from "./components/FeatureCard";
import DashboardHeader from "./components/DashboardHeader";
import StatsCards from "./components/StatsCards";
import HomeHero from "./components/HomeHero";

export default function Home() {
  const { userData } = useAuthentication();

  return (
    <section className="bg-[#F7F7FE] min-h-screen">
      <section className="flex flex-col md:flex-row h-screen max-w-[1600px] mx-auto overflow-hidden">
        <Sidebar />

        <section className="flex-1 overflow-y-auto no-scrollbar bg-[#F7F7FE] relative pb-20 md:pb-10">
          <DashboardHeader userName={userData?.name} />

          <div className="max-w-6xl mx-auto flex flex-col gap-10 md:px-10">
            {/* Stats Overview */}

            <StatsCards streak={12} level={userData?.languageLevel} xp={2450} />

            {/* Featured Hub */}
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <HomeHero />
            </section>

            {/* Core Learning Modes */}
            <section className="flex flex-col gap-8 pb-10">
              <header className="flex flex-col gap-1">
                <h3 className="text-2xl font-black text-[#282828] font-nunito-sans tracking-tight">
                  Core Learning Modes
                </h3>
                <p className="text-slate-400 font-nunito-sans font-bold text-xs uppercase tracking-widest opacity-70">
                  Select your daily challenge
                </p>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <FeatureCard
                  title="Natural Chats"
                  description="Improve your language flow by chatting with our AI teacher Jennifer."
                  link="/learning-modes/chat"
                  span1="#Writing"
                  span2="#Reading"
                  image="/Images/chat.png"
                />

                <FeatureCard
                  title="Intellectual Debates"
                  description="Argue for or against interesting topics to build your confidence."
                  link="/learning-modes/debates"
                  span1="#Speaking"
                  span2="#Thinking"
                  image="/Images/debate.png"
                />

                <FeatureCard
                  title="Character Dialogues"
                  description="Engage in dynamic conversations with famous historical figures."
                  link="/learning-modes/characters"
                  span1="#Speaking"
                  span2="#Listening"
                  image="/Images/character.png"
                />

                <FeatureCard
                  title="Immersive Roleplays"
                  description="Practice real-world scenarios like job interviews or ordering food."
                  link="/learning-modes/roleplays"
                  span1="#Speaking"
                  span2="#Real-world"
                  image="/Images/roleplay.png"
                />
              </div>
            </section>
          </div>
        </section>
      </section>
    </section>
  );
}
