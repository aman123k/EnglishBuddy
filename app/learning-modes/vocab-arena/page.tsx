"use client";
import Sidebar from "@/app/components/Sidebar";
import { CommonSidebarLayout } from "../components/CommonSidebarLayout";
import { MainContentSection } from "../components/MainContentSection";
import { PaidGuard } from "../components/PaidGuard";

function VocabArena() {
  return (
    <section className=" bg-[#F7F7FE] max-[950px]:bg-white min-[1600px]:w-[1400px]  min-[1600px]:mx-[50%] min-[1600px]:translate-x-[-50%]">
      <section className="flex max-[950px]:flex-col">
        <div className="max-[950px]:hidden">
          <Sidebar />
        </div>

        <PaidGuard
          featureName="Vocab Arena"
          featureDesc="Play a fun word-guessing game with Jennifer to expand your vocabulary in a playful, competitive way."
        >
          <MainContentSection
            title="Vocab Arena"
            tutorName="Game Host"
            img="/Images/vocab-arena.webp"
            isShowBottomHeader={true}
            apiEndpoint="/api/chatHistory"
            query="mode=vocab"
            apiPath="/api/learningModeService?mode=vocab"
          />
          <CommonSidebarLayout />
        </PaidGuard>
      </section>
    </section>
  );
}

export default VocabArena;

