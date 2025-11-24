import Image from "next/image";
import React from "react";
import { GiProgression } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { RiAccountCircleFill } from "react-icons/ri";

function Sidebar() {
  return (
    <>
      {/* Desktop header */}
      <section className="w-64 h-[100dvh] bg-[#FFFFFF] border border-gray-200 overflow-y-scroll no-scrollbar max-[650px]:hidden ">
        <div className="p-[24px] sticky top-0 bg-white">
          <Image
            src="/Images/logo-blue.svg"
            alt="logo"
            width={35}
            height={35}
          />
        </div>
        <div className=" flex flex-col justify-center gap-14 max-[1050px]:gap-12 px-[24px] mt-[16px]">
          <ul className=" flex flex-col gap-3.5">
            <li className=" py-2 flex gap-2 items-center font-nunito-sans  cursor-pointer hover:text-[#193cb8] font-semibold">
              <IoHome size={18} className="mb-1" />
              Dashboard
            </li>
            <li className="py-2 flex gap-2 items-center font-nunito-sans  cursor-pointer hover:text-[#193cb8] font-semibold">
              🧭 Explore
            </li>
            <li className="py-2 flex gap-2 items-center font-nunito-sans  cursor-pointer hover:text-[#193cb8] font-semibold">
              <GiProgression size={18} className="mb-1" />
              Progress
            </li>
          </ul>
          <hr className="border-gray-200" />
          <ul className=" flex flex-col gap-3.5 ">
            <li className=" py-2 flex gap-2 items-center font-nunito-sans  cursor-pointer hover:text-[#193cb8] font-semibold">
              Chat
            </li>
            <li className=" py-2 flex gap-2 items-center font-nunito-sans  cursor-pointer hover:text-[#193cb8] font-semibold">
              Characters
            </li>
            <li className=" py-2 flex gap-2 items-center font-nunito-sans  cursor-pointer hover:text-[#193cb8] font-semibold">
              Debates
            </li>
            <li className=" py-2 flex gap-2 items-center font-nunito-sans  cursor-pointer hover:text-[#193cb8] font-semibold">
              Roleplays
            </li>
          </ul>
        </div>
        <div className="p-[24px] fixed bottom-0 flex gap-2 items-center font-nunito-sans  cursor-pointer hover:text-[#193cb8] font-semibold">
          <RiAccountCircleFill size={24} />

          <span>Account</span>
        </div>
      </section>

      {/* mobile header */}
      <section className="min-[650px]:hidden">
        <header className="flex items-center justify-between px-8 py-4 ">
          <Image
            src="/Images/logo-blue.svg"
            alt="logo"
            width={30}
            height={30}
          />
          <RiAccountCircleFill size={28} />
        </header>
        <div className="fixed bottom-0 left-0 right-0 bg-white px-8 py-4 max-[650px]:z-50">
          <div className="flex justify-between">
            <button className={`flex flex-col items-center justify-center`}>
              <IoHome size={20} />
              <span className="text-xs">Dashboard</span>
            </button>
            <button className={`flex flex-col items-center justify-center`}>
              <IoHome size={20} />
              <span className="text-xs">Explore</span>
            </button>
            <button className={`flex flex-col items-center justify-center`}>
              <GiProgression size={20} />
              <span className="text-xs">Progress</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Sidebar;
