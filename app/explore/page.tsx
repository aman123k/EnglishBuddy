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

function Explore() {
  useAuthentication();
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

  const isLoaingAll = isLoadingChars || isLoadingRoleplays || isLoadingDebates;

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
                {/* Popular Characters */}
                {(selectedCategory === "All" ||
                  selectedCategory === "Characters") &&
                  filteredCharacters.length > 0 && (
                    <section className="flex flex-col gap-6">
                      <header className="flex justify-between items-end">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-2xl font-bold text-[#282828] font-nunito-sans">
                            Popular Characters
                          </h3>
                          <p className="text-gray-400 font-nunito-sans">
                            Chat with idols, historical icons, and fictional
                            friends.
                          </p>
                        </div>
                        <button className="text-[#193cb8] font-bold font-nunito-sans text-sm hover:underline">
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
                          <h3 className="text-2xl font-bold text-[#282828] font-nunito-sans">
                            Realistic Roleplays
                          </h3>
                          <p className="text-gray-400 font-nunito-sans">
                            Practice real-world situations like ordering coffee
                            or interviews.
                          </p>
                        </div>
                        <button className="text-[#193cb8] font-bold font-nunito-sans text-sm hover:underline">
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
                          <h3 className="text-2xl font-bold text-[#282828] font-nunito-sans">
                            Intellectual Debates
                          </h3>
                          <p className="text-gray-400 font-nunito-sans">
                            Argue for your point of view against AI logic.
                          </p>
                        </div>
                        <button className="text-[#193cb8] font-bold font-nunito-sans text-sm hover:underline">
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
                            />
                          ))}
                      </div>
                    </section>
                  )}

                {filteredCharacters.length === 0 &&
                  filteredRoleplays.length === 0 &&
                  filteredDebates.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                      <div className="text-gray-300 text-6xl">🔍</div>
                      <p className="text-gray-500 font-nunito-sans text-xl font-semibold">
                        No results found for "{searchQuery}"
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory("All");
                        }}
                        className="text-[#193cb8] font-bold font-nunito-sans hover:underline"
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
