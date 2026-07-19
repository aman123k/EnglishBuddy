"use client";
import Sidebar from "../components/Sidebar";
import ExploreHeader from "./components/ExploreHeader";
import CategoryChips from "./components/CategoryChips";
import ExploreHero from "./components/ExploreHero";
import FeatureCard from "../components/FeatureCard";
import { useState, useMemo } from "react";
import useGetAPIRequest from "../hooks/useGetAPIRequest";
import { cardGridInterface } from "../interface/cardGridInterface";
import { GET_USER_COMMON } from "../queryKeys/allQueryKeys";
import Loader from "../UIKIT/Loader";
import useAuthentication from "../hooks/useAuth";
import { useStore } from "../store/store";
import SubscriptionModal from "../components/SubscriptionModal";

function Explore() {
  const { userData } = useAuthentication();
  const setSubscriptionModalOpen = useStore(
    (state) => state.setSubscriptionModalOpen,
  );
  const isFree = !userData || userData.subscriptionPlan === "free";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: charactersData, isLoading: isLoadingChars } = useGetAPIRequest<
    cardGridInterface[]
  >("/api/allCharacter", GET_USER_COMMON("/api/allCharacter"), 1000 * 60 * 5);
  const { data: roleplaysData, isLoading: isLoadingRoleplays } =
    useGetAPIRequest<cardGridInterface[]>(
      "/api/allRoleplays",
      GET_USER_COMMON("/api/allRoleplays"),
      1000 * 60 * 5,
    );
  const { data: debatesData, isLoading: isLoadingDebates } = useGetAPIRequest<
    cardGridInterface[]
  >("/api/allDebates", GET_USER_COMMON("/api/allDebates"), 1000 * 60 * 5);
  const { data: travelsData, isLoading: isLoadingTravels } = useGetAPIRequest<
    cardGridInterface[]
  >("/api/allTravels", GET_USER_COMMON("/api/allTravels"), 1000 * 60 * 5);

  const filteredCharacters = useMemo(() => {
    return (
      charactersData?.data?.filter((item: cardGridInterface) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ) || []
    );
  }, [charactersData, searchQuery]);

  const filteredRoleplays = useMemo(() => {
    return (
      roleplaysData?.data?.filter((item: cardGridInterface) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ) || []
    );
  }, [roleplaysData, searchQuery]);

  const filteredDebates = useMemo(() => {
    return (
      debatesData?.data?.filter((item: cardGridInterface) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ) || []
    );
  }, [debatesData, searchQuery]);

  const filteredTravels = useMemo(() => {
    return (
      travelsData?.data?.filter((item: cardGridInterface) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ) || []
    );
  }, [travelsData, searchQuery]);

  const specialModes = useMemo(() => {
    const modes = [
      {
        id: "business-coach",
        name: "Business Coach",
        description:
          "Master professional English, draft emails, and practice negotiations.",
        link: "/learning-modes/business-coach",
        span1: "#Business",
        span2: "#Career",
        imageUrl: "/Images/business-coach.webp",
        categories: ["Business English", "Interview Prep"],
      },
      {
        id: "vocab-arena",
        name: "Vocab Arena",
        description:
          "Play a fun word-guessing game with Jennifer to expand your vocabulary.",
        link: "/learning-modes/vocab-arena",
        span1: "#Vocabulary",
        span2: "#Playful",
        imageUrl: "/Images/vocab-arena.webp",
        categories: ["Vocabulary"],
      },
      {
        id: "story-creation",
        name: "Story Co-creation",
        description:
          "Build creative stories collaboratively sentence-by-sentence.",
        link: "/learning-modes/co-write-story",
        span1: "#Writing",
        span2: "#Creativity",
        imageUrl: "/Images/story-builder.webp",
        categories: ["Grammar"],
      },
    ];

    return modes.filter((m) => {
      const matchesSearch = m.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      if (selectedCategory === "All") return true;
      return m.categories.includes(selectedCategory);
    });
  }, [searchQuery, selectedCategory]);

  const isLoaingAll =
    isLoadingChars ||
    isLoadingRoleplays ||
    isLoadingDebates ||
    isLoadingTravels;

  return (
    <section className=" bg-[#F7F7FE] max-[950px]:bg-white min-[1600px]:w-[1400px]  min-[1600px]:mx-[50%] min-[1600px]:translate-x-[-50%]">
      <section className="flex max-[950px]:flex-col h-[100dvh]">
        <Sidebar />
        <section
          className={`h-[100dvh] overflow-scroll no-scrollbar max-[850px]:pb-36 flex-1 bg-white md:bg-[#F7F7FE]`}
        >
          <ExploreHeader
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <CategoryChips
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <div className="flex flex-col gap-10">
            {searchQuery === "" && selectedCategory === "All" && (
              <ExploreHero />
            )}

            {isLoaingAll ? (
              <div className="flex justify-center items-center py-20">
                <Loader />
              </div>
            ) : (
              <div className="px-8 pb-12 flex flex-col gap-12">
                {/* Specialized AI Tutors */}
                {(selectedCategory === "All" ||
                  selectedCategory === "Business English" ||
                  selectedCategory === "Vocabulary" ||
                  selectedCategory === "Grammar" ||
                  selectedCategory === "Interview Prep") &&
                  specialModes.length > 0 && (
                    <section className="flex flex-col gap-6">
                      <header className="flex justify-between items-end">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-2xl font-bold text-[#282828] font-nunito-sans">
                            Specialized AI Tutors
                          </h3>
                          <p className="text-gray-400 font-medium">
                            Focus on professional communication, word games, or
                            collaborative writing.
                          </p>
                        </div>
                      </header>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {specialModes.map((m) => (
                          <FeatureCard
                            key={m.id}
                            title={m.name}
                            description={m.description}
                            link={m.link}
                            span1={m.span1}
                            span2={m.span2}
                            image={m.imageUrl}
                            isLocked={isFree}
                            onClick={() => setSubscriptionModalOpen(true)}
                          />
                        ))}
                      </div>
                    </section>
                  )}

                {/* Popular Characters */}
                {(selectedCategory === "All" ||
                  selectedCategory === "Characters") &&
                  filteredCharacters.length > 0 && (
                    <section className="flex flex-col gap-6">
                      <header className="flex justify-between items-end">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-2xl font-bold text-[#282828]">
                            Popular Characters
                          </h3>
                          <p className="text-gray-400">
                            Chat with idols, historical icons, and fictional
                            friends.
                          </p>
                        </div>
                        <button className="text-[#1C398E] font-bold text-sm hover:underline">
                          See all
                        </button>
                      </header>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {filteredCharacters
                          .slice(4, 8)
                          .map((char: cardGridInterface) => (
                            <FeatureCard
                              key={char._id}
                              title={char.name}
                              description={`Engage in a conversation with ${char.name} to sharpen your listening and speaking skills naturally.`}
                              link={`/learning-modes/characters/${char._id}`}
                              span1="#Characters"
                              span2="#Speaking"
                              image={char.imageUrl}
                              isLocked={isFree}
                              onClick={() => setSubscriptionModalOpen(true)}
                            />
                          ))}
                      </div>
                    </section>
                  )}

                {/* Roleplays */}
                {(selectedCategory === "All" ||
                  selectedCategory === "Roleplay" ||
                  selectedCategory === "Daily Scenarios") &&
                  filteredRoleplays.length > 0 && (
                    <section className="flex flex-col gap-6">
                      <header className="flex justify-between items-end">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-2xl font-bold text-[#282828]">
                            Realistic Roleplays
                          </h3>
                          <p className="text-gray-400">
                            Practice real-world situations like ordering coffee
                            or interviews.
                          </p>
                        </div>
                        <button className="text-[#1C398E] font-bold text-sm hover:underline">
                          See all
                        </button>
                      </header>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {filteredRoleplays
                          .slice(0, 4)
                          .map((rp: cardGridInterface) => (
                            <FeatureCard
                              key={rp._id}
                              title={rp.name}
                              description={`Step into the world of ${rp.name}. Perfect for real-life fluency.`}
                              link={`/learning-modes/roleplays/${rp._id}`}
                              span1="#Roleplay"
                              span2="#Immersive"
                              image={rp.imageUrl}
                              isLocked={isFree}
                              onClick={() => setSubscriptionModalOpen(true)}
                            />
                          ))}
                      </div>
                    </section>
                  )}

                {/* Debates */}
                {(selectedCategory === "All" ||
                  selectedCategory === "Debates") &&
                  filteredDebates.length > 0 && (
                    <section className="flex flex-col gap-6">
                      <header className="flex justify-between items-end">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-2xl font-bold text-[#282828]">
                            Intellectual Debates
                          </h3>
                          <p className="text-gray-400">
                            Argue for your point of view against AI logic.
                          </p>
                        </div>
                        <button className="text-[#1C398E] font-bold text-sm hover:underline">
                          See all
                        </button>
                      </header>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {filteredDebates
                          .slice(0, 4)
                          .map((db: cardGridInterface) => (
                            <FeatureCard
                              key={db._id}
                              title={db.name}
                              description={`Argue against AI on "${db.name}". Improve critical thinking and complex expression.`}
                              link={`/learning-modes/debates/${db._id}`}
                              span1="#Debate"
                              span2="#Logic"
                              image={db.imageUrl}
                              isLocked={isFree}
                              onClick={() => setSubscriptionModalOpen(true)}
                            />
                          ))}
                      </div>
                    </section>
                  )}

                {/* Travel Survival Scenarios */}
                {(selectedCategory === "All" ||
                  selectedCategory === "Travel & Tourism" ||
                  selectedCategory === "Daily Scenarios" ||
                  selectedCategory === "Roleplay") &&
                  filteredTravels.length > 0 && (
                    <section className="flex flex-col gap-6">
                      <header className="flex justify-between items-end">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-2xl font-bold text-[#282828] font-nunito-sans">
                            Travel Survival Scenarios
                          </h3>
                          <p className="text-gray-400 font-medium">
                            Navigate emergency situations and build traveler
                            fluency.
                          </p>
                        </div>
                        <button className="text-[#1C398E] font-bold text-sm hover:underline bg-transparent border-none outline-none cursor-pointer">
                          See all
                        </button>
                      </header>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {filteredTravels
                          .slice(0, 4)
                          .map((tr: cardGridInterface) => (
                            <FeatureCard
                              key={tr._id}
                              title={tr.name}
                              description={`Survive on the scenario "${tr.name}" with Jennifer. Navigate choices and build vocabulary.`}
                              link={`/learning-modes/travels/${tr._id}`}
                              span1="#Travel"
                              span2="#Survival"
                              image={tr.imageUrl}
                              isLocked={isFree}
                              onClick={() => setSubscriptionModalOpen(true)}
                            />
                          ))}
                      </div>
                    </section>
                  )}

                {filteredCharacters.length === 0 &&
                  filteredRoleplays.length === 0 &&
                  filteredDebates.length === 0 &&
                  filteredTravels.length === 0 &&
                  specialModes.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                      <div className="text-gray-300 text-6xl">🔍</div>
                      <p className="text-gray-500 text-xl font-semibold">
                        No results found for "{searchQuery}"
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory("All");
                        }}
                        className="text-[#1C398E] font-bold hover:underline"
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
              </div>
            )}
          </div>
        </section>
      </section>
    </section>
  );
}

export default Explore;
