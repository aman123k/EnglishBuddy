import React from "react";
import { Search } from "lucide-react";

interface ExploreHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ExploreHeader: React.FC<ExploreHeaderProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <header className="py-8 px-8 flex flex-col gap-6 sticky top-0 bg-[#F7F7FE] z-20 border-b border-gray-200 backdrop-blur-sm bg-opacity-80">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#282828] font-nunito-sans tracking-tight">
          Explore
        </h1>
      </div>

      <div className="relative group">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#193cb8] transition-colors duration-300"
          size={20}
        />
        <input
          type="text"
          placeholder="Search for topics, characters, or scenarios..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-2xl py-2.5 pl-12 pr-6 outline-none focus:ring-2 focus:ring-[#193cb8] focus:border-transparent transition-all duration-300 shadow-sm font-nunito-sans text-lg placeholder:text-gray-300"
        />
      </div>
    </header>
  );
};

export default ExploreHeader;
