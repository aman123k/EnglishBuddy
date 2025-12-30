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
    roleplays: string;
  }>;
};

function RoleplayPage({ params }: Props) {
  const { roleplays } = use(params);

  const { data: CardGridArray, isLoading } = useGetAPIRequest<
    cardGridInterface[]
  >("/api/allRoleplays", GET_USER_COMMON("/api/allRoleplays"), 1000 * 60 * 5);

  const currentRoleplay = CardGridArray?.data?.find(
    (cat) => cat._id === roleplays
  );

  if (isLoading) return;
  return (
    <section className=" bg-[#F7F7FE] max-[950px]:bg-white min-[1600px]:w-[1400px]  min-[1600px]:mx-[50%] min-[1600px]:translate-x-[-50%]">
      <section className="flex max-[950px]:flex-col">
        <div className="max-[950px]:hidden">
          <Sidebar />
        </div>
        <MainContentSection
          title="Roleplays"
          tutorName={currentRoleplay?.name}
          img={currentRoleplay?.imageUrl}
          isShowBottomHeader={true}
          apiEndpoint={`/api/chatHistory`}
          query={`scenario=${currentRoleplay?.name}&mode=roleplay&roleplayId=${currentRoleplay?._id}`}
          apiPath={`/api/roleplayService?roleplayId=${currentRoleplay?._id}`}
        />
        <CommonSidebarLayout />
      </section>
    </section>
  );
}

export default RoleplayPage;
