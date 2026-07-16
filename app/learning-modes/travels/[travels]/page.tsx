"use client";
import Sidebar from "@/app/components/Sidebar";

import { use } from "react";
import useGetAPIRequest from "@/app/hooks/useGetAPIRequest";
import { GET_USER_COMMON } from "@/app/queryKeys/allQueryKeys";
import { cardGridInterface } from "@/app/interface/cardGridInterface";
import { MainContentSection } from "../../components/MainContentSection";
import { CommonSidebarLayout } from "../../components/CommonSidebarLayout";

type Props = {
  params: Promise<{
    travels: string;
  }>;
};

function TravelPage({ params }: Props) {
  const { travels } = use(params);

  const { data: CardGridArray, isLoading } = useGetAPIRequest<
    cardGridInterface[]
  >("/api/allTravels", GET_USER_COMMON("/api/allTravels"), 1000 * 60 * 5);

  const currentTravel = CardGridArray?.data?.find((cat) => cat._id === travels);

  if (isLoading) return null;
  return (
    <section className=" bg-[#F7F7FE] max-[950px]:bg-white min-[1600px]:w-[1400px]  min-[1600px]:mx-[50%] min-[1600px]:translate-x-[-50%]">
      <section className="flex max-[950px]:flex-col">
        <div className="max-[950px]:hidden">
          <Sidebar />
        </div>
        <MainContentSection
          title="Travel Survival"
          tutorName={currentTravel?.name}
          img={currentTravel?.imageUrl}
          isShowBottomHeader={true}
          apiEndpoint="/api/chatHistory"
          query={`topic=${currentTravel?.name}&mode=travel&travelId=${currentTravel?._id}`}
          apiPath={`/api/travelsService?travelId=${currentTravel?._id}`}
        />
        <CommonSidebarLayout />
      </section>
    </section>
  );
}

export default TravelPage;
