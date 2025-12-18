import Sidebar from "@/app/components/Sidebar";
import Header from "../components/Header";
import CommonSidebar from "../components/CommonSidebar";

function Debates() {
  return (
    <section className=" bg-[#F7F7FE] max-[950px]:bg-white min-[1600px]:w-[1400px]  min-[1600px]:mx-[50%] min-[1600px]:translate-x-[-50%]">
      <section className="flex max-[950px]:flex-col">
        <div className="max-[950px]:hidden">
          <Sidebar />
        </div>
        <section className={`w-[55%] px-6 max-[950px]:px-4 max-[950px]:w-full`}>
          <Header
            title="Debates"
            tutorName=""
            isShowBottomHeader={false}
            img=""
          />
        </section>
        <CommonSidebar
          header="About Debate Mode"
          description="With Debate mode, you can argue for or against interesting and intriguing topics. Improve your language skills as you defend your arguments against the all-knowing AI."
        />
      </section>
    </section>
  );
}

export default Debates;
