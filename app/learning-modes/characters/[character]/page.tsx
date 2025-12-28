// Character detail page: loads a single character and opens
// the chat experience scoped to that character.
"use client";
import Sidebar from "@/app/components/Sidebar";
import { CommonSidebarLayout } from "../../components/CommonSidebarLayout";
import { MainContentSection } from "../../components/MainContentSection";
import { use } from "react";
import useGetAPIRequest from "@/app/hooks/useGetAPIRequest";
import { GET_USER_COMMON } from "@/app/queryKeys/allQueryKeys";
import { cardGridInterface } from "@/app/interface/cardGridInterface";

type Props = {
  params: Promise<{
    character: string;
  }>;
};

function CharacterPage({ params }: Props) {
  const { character } = use(params);

  const { data: CardGridArray, isLoading } = useGetAPIRequest<
    cardGridInterface[]
  >("/api/allCharacter", GET_USER_COMMON("/api/allCharacter"), 1000 * 60 * 5);

  const currentCharacters = CardGridArray?.data?.find(
    (cat) => cat._id === character
  );
  if (isLoading) return;
  return (
    <section className=" bg-[#F7F7FE] max-[950px]:bg-white min-[1600px]:w-[1400px]  min-[1600px]:mx-[50%] min-[1600px]:translate-x-[-50%]">
      <section className="flex max-[950px]:flex-col">
        <div className="max-[950px]:hidden">
          <Sidebar />
        </div>
        <MainContentSection
          title="Characters"
          tutorName={currentCharacters?.name}
          img={currentCharacters?.imageUrl}
          isShowBottomHeader={true}
          apiEndpoint={`/api/chatHistory`}
          query={`characterName=${currentCharacters?.name}&mode=character&id=${currentCharacters?._id}`}
          apiPath={`/api/characterService?id=${currentCharacters?._id}`}
        />
        <CommonSidebarLayout />
      </section>
    </section>
  );
}

export default CharacterPage;
