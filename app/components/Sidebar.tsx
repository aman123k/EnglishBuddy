import Image from "next/image";
import React from "react";
import { GiProgression } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { RiAccountCircleFill } from "react-icons/ri";
import { FiMap } from "react-icons/fi";
import Link from "next/link";

function Sidebar() {
  return (
    <>
      {/* Desktop header */}
      <section className="w-64 flex-shrink-0 h-[100dvh] bg-[#FFFFFF] border border-gray-200 overflow-y-scroll no-scrollbar max-[950px]:hidden ">
        <div className="p-[24px] sticky top-0 bg-white">
          <Link href={"/"}>
            <Image
              src="/Images/logo-blue.svg"
              alt="logo"
              width={35}
              height={35}
            />
          </Link>
        </div>
        <div className=" flex flex-col justify-center gap-14 max-[1050px]:gap-12 px-[24px] mt-[16px]">
          <ul className=" flex flex-col gap-3.5">
            <Link href={"/"}>
              <li className=" py-2 flex gap-2 items-center font-nunito-sans  cursor-pointer hover:text-[#193cb8] font-semibold">
                <IoHome size={18} />
                Dashboard
              </li>
            </Link>
            <li className="py-2 flex gap-2 items-center font-nunito-sans  cursor-pointer hover:text-[#193cb8] font-semibold">
              <FiMap size={18} /> Explore
            </li>
            <li className="py-2 flex gap-2 items-center font-nunito-sans  cursor-pointer hover:text-[#193cb8] font-semibold">
              <GiProgression size={18} />
              Progress
            </li>
          </ul>
          <hr className="border-gray-200" />
          <ul className=" flex flex-col gap-3.5 ">
            <Link href={"/learning-modes/chat"}>
              <li className=" py-2 flex gap-2 items-center font-nunito-sans  cursor-pointer hover:text-[#193cb8] font-semibold">
                Chat
              </li>
            </Link>
            <Link href={"/learning-modes/characters"}>
              <li className=" py-2 flex gap-2 items-center font-nunito-sans  cursor-pointer hover:text-[#193cb8] font-semibold">
                Characters
              </li>
            </Link>
            <Link href={"/learning-modes/debates"}>
              <li className=" py-2 flex gap-2 items-center font-nunito-sans  cursor-pointer hover:text-[#193cb8] font-semibold">
                Debates
              </li>
            </Link>
            <Link href={"/learning-modes/roleplays"}>
              <li className=" py-2 flex gap-2 items-center font-nunito-sans  cursor-pointer hover:text-[#193cb8] font-semibold">
                Roleplays
              </li>
            </Link>
          </ul>
        </div>
        <Link href={"/account"}>
          <div className="p-[24px] fixed bottom-0 flex gap-2 items-center font-nunito-sans  cursor-pointer hover:text-[#193cb8] font-semibold">
            <RiAccountCircleFill size={24} />

            <span>Account</span>
          </div>
        </Link>
      </section>

      {/* mobile header */}
      <section className="min-[950px]:hidden">
        <Link href={"/account"}>
          <header className="flex items-center justify-between px-8 py-4 ">
            <Image
              src="/Images/logo-blue.svg"
              alt="logo"
              width={30}
              height={30}
            />
            <RiAccountCircleFill size={28} />
          </header>
        </Link>
        <div className="fixed bottom-0 left-0 right-0 bg-white px-8 py-4 max-[950px]:z-50">
          <div className="flex justify-between">
            <button
              className={`flex flex-col items-center justify-center gap-2`}
            >
              <IoHome size={20} />
              <span className="text-xs">Dashboard</span>
            </button>
            <button
              className={`flex flex-col items-center justify-center gap-2`}
            >
              <FiMap size={18} />
              <span className="text-xs">Explore</span>
            </button>
            <button
              className={`flex flex-col items-center justify-center gap-2`}
            >
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
