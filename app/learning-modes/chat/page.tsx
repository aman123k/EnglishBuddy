// One-to-one chat mode with the default tutor (Jennifer).
// Uses the shared main content layout and utility sidebar.
import Sidebar from "@/app/components/Sidebar";
import { CommonSidebarLayout } from "../components/CommonSidebarLayout";
import { MainContentSection } from "../components/MainContentSection";

function Chats() {
  return (
    <section className=" bg-[#F7F7FE] max-[950px]:bg-white min-[1600px]:w-[1400px]  min-[1600px]:mx-[50%] min-[1600px]:translate-x-[-50%]">
      <section className="flex max-[950px]:flex-col">
        <div className="max-[950px]:hidden">
          <Sidebar />
        </div>

        <MainContentSection
          title="Chat"
          tutorName="Jennifer"
          img="/Images/Jennifer.webp"
          isShowBottomHeader={true}
          apiEndpoint={`/api/chatHistory`}
          apiPath="/api/chatService"
        />
        <CommonSidebarLayout />
      </section>
    </section>
  );
}

export default Chats;
