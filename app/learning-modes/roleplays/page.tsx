import Sidebar from "@/app/components/Sidebar";
import React from "react";
import Header from "../components/Header";
import CommonSidebar from "../components/CommonSidebar";

function Roleplay() {
  return (
    <section className=" bg-[#F7F7FE] max-[950px]:bg-white min-[1600px]:w-[1400px]  min-[1600px]:mx-[50%] min-[1600px]:translate-x-[-50%]">
      <section className="flex max-[950px]:flex-col">
        <div className="max-[950px]:hidden">
          <Sidebar />
        </div>
        <section className={`w-[55%] px-6 max-[950px]:px-4 max-[950px]:w-full`}>
          <Header
            title="Roleplays"
            tutorName=""
            isShowBottomHeader={false}
            img=""
          />
        </section>
        <CommonSidebar
          header="About Roleplay Mode"
          description="With Roleplay mode, practising language will be fun and exciting. You can choose from various settings, ranging from everyday conversations to creative and fantastic dialogues."
        />
      </section>
    </section>
  );
}

export default Roleplay;
