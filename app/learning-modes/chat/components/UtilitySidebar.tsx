import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useStore } from "@/app/store/store";

function UtilitySidebar() {
  const { utilitySidebar, setUtilitySidebar } = useStore();
  return (
    <div className="max-[950px]:hidden">
      <header
        className="py-6 w-full border-b border-gray-200 font-nunito-sans  font-semibold text-xl flex items-center gap-2.5
          max-[950px]:hidden justify-between"
      >
        <h1>{utilitySidebar?.title}</h1>

        <RxCross2
          className=" cursor-pointer text-2xl"
          onClick={() => setUtilitySidebar({ isOpen: false })}
        />
      </header>
    </div>
  );
}

export default UtilitySidebar;
