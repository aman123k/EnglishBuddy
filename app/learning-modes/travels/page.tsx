"use client";
import Sidebar from "@/app/components/Sidebar";
import Header from "../components/Header";
import CommonSidebar from "../components/CommonSidebar";
import useGetAPIRequest from "@/app/hooks/useGetAPIRequest";
import { cardGridInterface } from "@/app/interface/cardGridInterface";
import { GET_USER_COMMON } from "@/app/queryKeys/allQueryKeys";
import Loader from "@/app/UIKIT/Loader";
import CardGrid from "../components/CardGrid";
import useAuthentication from "@/app/hooks/useAuth";

function Travels() {
  useAuthentication();
  const { data: CardGridArray, isLoading } = useGetAPIRequest<
    cardGridInterface[]
  >("/api/allTravels", GET_USER_COMMON("/api/allTravels"), 1000 * 60 * 5);

  return (
    <section className=" bg-[#F7F7FE] max-[950px]:bg-white min-[1600px]:w-[1400px]  min-[1600px]:mx-[50%] min-[1600px]:translate-x-[-50%]">
      <section className="flex max-[950px]:flex-col">
        <Sidebar />
        <div className=" bg-[#1C398E] px-4 py-2.5 text-white font-nunito-sans max-[950px]:block hidden">
          Simulate critical travel emergencies, learn vocabulary, and survive scenarios confidently
        </div>
        <section
          className={`w-[55%] px-6 max-[950px]:px-4 max-[950px]:w-full min-[950px]:relative`}
        >
          <Header
            title="Travel Survival"
            tutorName=""
            isShowBottomHeader={false}
            img=""
          />
          {isLoading ? (
            <Loader />
          ) : (
            <CardGrid
              CardGridArray={CardGridArray?.data || []}
              path="learning-modes/travels"
            />
          )}
        </section>
        <CommonSidebar
          header="About Travel Survival"
          description="In Travel Survival mode, you are placed in critical emergency and situational settings like desert islands, jungle blockades, or lost cities. Jennifer will companion you in surviving, navigating, and building key conversational vocabulary."
        />
      </section>
    </section>
  );
}

export default Travels;
