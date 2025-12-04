"use client";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useStore } from "@/app/store/store";
import useAuthentication from "@/app/hooks/useAuth";
import { FaCheck, FaMicrophone } from "react-icons/fa";

function UtilitySidebar() {
  const { utilitySidebar, setUtilitySidebar } = useStore();
  const { userData } = useAuthentication();

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

      {/* Information */}
      {utilitySidebar?.title === "Information" && (
        <section className=" flex flex-col gap-4 border border-[#E9EBF9] rounded-2xl p-5 mt-8">
          <h1 className=" text-[#282828] font-nunito-sans text-xl tracking-wide font-semibold">
            Get feedback on messages
          </h1>
          <div className=" flex items-center gap-6">
            <span className=" bg-[#0D8345] p-2 rounded-full">
              <FaCheck color="#FFFFFF" size={20} />
            </span>
            <span className=" bg-[#2E3BC7] p-2 rounded-full">
              <FaMicrophone color="#ffffff" size={20} />
            </span>
          </div>
          <p className=" text-[#282828] text-base font-semibold font-nunito-sans">
            AI will assess your messages and give you personalized feedback
          </p>
        </section>
      )}

      {/* Translation */}
      {utilitySidebar?.title === "Translation" && (
        <section className=" flex flex-col gap-5 py-5">
          <div className=" flex flex-col gap-2">
            <span className=" text-[#868686] text-xs font-semibold font-nunito-sans  ">
              English
            </span>
            <p className=" font-nunito-sans text-[#282828] font-semibold text-base">
              {utilitySidebar?.yourWords}
            </p>
          </div>
          <hr className=" border-gray-200" />
          <div className=" flex flex-col gap-2">
            <span className=" text-[#868686] text-xs font-semibold font-nunito-sans  ">
              {userData?.translationLanguage}
            </span>
            <p className=" font-nunito-sans text-[#282828] font-medium tracking-[0px] text-base">
              {utilitySidebar?.translatedWords}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

export default UtilitySidebar;
