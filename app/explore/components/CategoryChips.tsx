import React from "react";

const categories = [
  "All",
  "Grammar",
  "Vocabulary",
  "Business English",
  "Travel & Tourism",
  "Daily Scenarios",
  "Roleplay",
  "Characters",
  "Debates",
  "Interview Prep",
];

interface CategoryChipsProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoryChips: React.FC<CategoryChipsProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar py-6 px-8 scroll-smooth items-center sticky top-[164px] bg-[#F7F7FE]/95 backdrop-blur-md z-10 border-b border-gray-100">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`flex-shrink-0 px-6 py-2.5 rounded-2xl font-nunito-sans font-bold text-sm transition-all duration-300 border ${
            selectedCategory === category
              ? "bg-[#193cb8] text-white border-[#193cb8] shadow-lg shadow-[#193cb8]/25 -translate-y-0.5"
              : "bg-white text-gray-500 border-gray-100 hover:border-[#193cb8] hover:text-[#193cb8] hover:shadow-md hover:bg-white"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;
