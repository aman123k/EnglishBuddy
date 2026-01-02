"use client";
import React from "react";
import Sidebar from "./components/Sidebar";
import useAuthentication from "./hooks/useAuth";
import FeatureCard from "./components/FeatureCard";

export default function Home() {
  const { userData } = useAuthentication();
  console.log(userData);
  return (
    <section className=" bg-[#F7F7FE] max-[950px]:bg-white min-[1600px]:w-[1400px]  min-[1600px]:mx-[50%] min-[1600px]:translate-x-[-50%]">
      <section className="flex max-[950px]:flex-col">
        <Sidebar />
        <section className="w-full h-[100dvh] overflow-scroll no-scrollbar max-[850px]:pb-36">
          <header className="py-6 max-[650px]:px-4 px-8 border-b border-gray-300 font-nunito-sans sticky -top-[.4px] bg-[#F7F7FE] max-[950px]:bg-white z-10 font-semibold text-xl">
            <h1>Learning modes</h1>
          </header>
          <section className="px-8 py-6 flex flex-col gap-6 max-[650px]:px-4">
            <FeatureCard
              title="Chat"
              description="Improve your language skills by chatting with our AI teacher."
              link="/learning-modes/chat"
              span1="#Writing"
              span2="#Reading"
              image="/Images/chat.png"
            />
            <FeatureCard
              title="Debates"
              description="Argue for or against interesting and intriguing topics."
              link="/learning-modes/debates"
              span1="#Speaking"
              span2="#Thinking"
              image="/Images/debate.png"
            />
            <FeatureCard
              title="Character Talks"
              description="Engage in dynamic conversations with famous characters."
              link="/learning-modes/characters"
              span1="#Speaking"
              span2="#Listening"
              image="/Images/character.png"
            />

            <FeatureCard
              title="Roleplays"
              description="Practice real-world scenarios like job interviews, ordering food, and more..."
              link="/learning-modes/roleplays"
              span1="#Speaking"
              span2="#Real-world"
              image="/Images/roleplay.png"
            />
          </section>
        </section>
      </section>
    </section>
  );
}
