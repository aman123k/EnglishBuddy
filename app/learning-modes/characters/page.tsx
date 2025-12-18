import Sidebar from "@/app/components/Sidebar";
import Header from "../components/Header";
import CommonSidebar from "../components/CommonSidebar";
import CardGrid from "../components/CardGrid";
import { characters } from "./data/charactersData";

function Characters() {
  return (
    <section className=" bg-[#F7F7FE] max-[950px]:bg-white min-[1600px]:w-[1400px]  min-[1600px]:mx-[50%] min-[1600px]:translate-x-[-50%]">
      <section className="flex max-[950px]:flex-col">
        <div className="max-[950px]:hidden">
          <Sidebar />
        </div>
        <section className={`w-[55%] px-6 max-[950px]:px-4 max-[950px]:w-full`}>
          <Header
            title="Characters"
            tutorName=""
            isShowBottomHeader={false}
            img=""
          />
          <CardGrid
            CardGridArray={characters}
            path="learning-modes/characters"
          />
        </section>
        <CommonSidebar
          header="About Character Mode"
          description="Engage in dynamic conversations with historical or fictional characters, practising listening, speaking and contextual understanding in immersive, interactive scenarios."
        />
      </section>
    </section>
  );
}

export default Characters;
