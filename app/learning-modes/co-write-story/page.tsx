"use client";
import Sidebar from "@/app/components/Sidebar";
import { CommonSidebarLayout } from "../components/CommonSidebarLayout";
import { MainContentSection } from "../components/MainContentSection";

function CoWriteStory() {
  return (
    <section className=" bg-[#F7F7FE] max-[950px]:bg-white min-[1600px]:w-[1400px]  min-[1600px]:mx-[50%] min-[1600px]:translate-x-[-50%]">
      <section className="flex max-[950px]:flex-col">
        <div className="max-[950px]:hidden">
          <Sidebar />
        </div>

        <MainContentSection
          title="Story Co-creation"
          tutorName="Story Partner"
          img="/Images/story-builder.webp"
          isShowBottomHeader={true}
          apiEndpoint="/api/chatHistory"
          query="mode=story"
          apiPath="/api/learningModeService?mode=story"
        />
        <CommonSidebarLayout />
      </section>
    </section>
  );
}

export default CoWriteStory;
