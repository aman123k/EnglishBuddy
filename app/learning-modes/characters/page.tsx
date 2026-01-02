// Characters listing page: shows all available characters that
// the learner can pick to start a conversation with.
"use client";

import Sidebar from "@/app/components/Sidebar";
import Header from "../components/Header";
import CommonSidebar from "../components/CommonSidebar";
import CardGrid from "../components/CardGrid";
import { cardGridInterface } from "@/app/interface/cardGridInterface";
import useGetAPIRequest from "@/app/hooks/useGetAPIRequest";
import { GET_USER_COMMON } from "@/app/queryKeys/allQueryKeys";
import Loader from "@/app/UIKIT/Loader";
import useAuthentication from "@/app/hooks/useAuth";

function Characters() {
  useAuthentication();
  const { data: CardGridArray, isLoading } = useGetAPIRequest<
    cardGridInterface[]
  >("/api/allCharacter", GET_USER_COMMON("/api/allCharacter"), 1000 * 60 * 5);

  return (
    <section className=" bg-[#F7F7FE] max-[950px]:bg-white min-[1600px]:w-[1400px]  min-[1600px]:mx-[50%] min-[1600px]:translate-x-[-50%]">
      <section className="flex max-[950px]:flex-col">
        <Sidebar />
        <div className=" bg-[#E92D71] px-4 py-2.5 text-white font-nunito-sans max-[950px]:block hidden">
          Engage in conversations with historical or fictional characters to
          improve listening skills
        </div>
        <section
          className={`w-[55%] px-6 max-[950px]:px-4 max-[950px]:w-full relative`}
        >
          <Header
            title="Characters"
            tutorName=""
            isShowBottomHeader={false}
            img=""
          />
          {isLoading ? (
            <Loader />
          ) : (
            <CardGrid
              CardGridArray={CardGridArray?.data || []}
              path="learning-modes/characters"
            />
          )}
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
