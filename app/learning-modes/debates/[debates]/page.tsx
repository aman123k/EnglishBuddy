// Character detail page: loads a single character and opens
// the chat experience scoped to that character.
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
    debates: string;
  }>;
};

function DebatePage({ params }: Props) {
  const { debates } = use(params);

  const { data: CardGridArray, isLoading } = useGetAPIRequest<
    cardGridInterface[]
  >("/api/allDebates", GET_USER_COMMON("/api/allDebates"), 1000 * 60 * 5);

  const currentDebate = CardGridArray?.data?.find((cat) => cat._id === debates);
  console.log(currentDebate);
  if (isLoading) return;
  return (
    <section className=" bg-[#F7F7FE] max-[950px]:bg-white min-[1600px]:w-[1400px]  min-[1600px]:mx-[50%] min-[1600px]:translate-x-[-50%]">
      <section className="flex max-[950px]:flex-col">
        <div className="max-[950px]:hidden">
          <Sidebar />
        </div>
        <MainContentSection
          title="Debates"
          tutorName={currentDebate?.name}
          img={currentDebate?.imageUrl}
          isShowBottomHeader={true}
          apiEndpoint={`/api/chatHistory`}
          query={`topic=${currentDebate?.name}&mode=debate&debateId=${currentDebate?._id}`}
          apiPath={`/api/debateService?debateId=${currentDebate?._id}`}
        />
        <CommonSidebarLayout />
      </section>
    </section>
  );
}

export default DebatePage;
