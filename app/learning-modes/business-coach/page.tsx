"use client";
import Sidebar from "@/app/components/Sidebar";
import { CommonSidebarLayout } from "../components/CommonSidebarLayout";
import { MainContentSection } from "../components/MainContentSection";
import { PaidGuard } from "../components/PaidGuard";

function BusinessCoach() {
  return (
    <section className=" bg-[#F7F7FE] max-[950px]:bg-white min-[1600px]:w-[1400px]  min-[1600px]:mx-[50%] min-[1600px]:translate-x-[-50%]">
      <section className="flex max-[950px]:flex-col">
        <div className="max-[950px]:hidden">
          <Sidebar />
        </div>

        <PaidGuard
          featureName="Business Coach"
          featureDesc="Master professional English, draft emails, and practice negotiations with your AI business mentor."
        >
          <MainContentSection
            title="Business Coach"
            tutorName="Business Coach"
            img="/Images/business-coach.webp"
            isShowBottomHeader={true}
            apiEndpoint="/api/chatHistory"
            query="mode=business"
            apiPath="/api/learningModeService?mode=business"
          />
          <CommonSidebarLayout />
        </PaidGuard>
      </section>
    </section>
  );
}

export default BusinessCoach;

