import React from "react";
import Image from "next/image";
import { IoArrowBackOutline } from "react-icons/io5";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();
  return (
    <>
      <header
        className="py-6 w-full border-b border-gray-200 font-nunito-sans  font-semibold text-xl flex items-center gap-2.5
      max-[950px]:hidden"
      >
        <IoArrowBackOutline
          onClick={() => router.back()}
          size={20}
          className="inline-block cursor-pointer"
        />
        <h1>Chat</h1>
      </header>
      <header className="w-full border-b border-gray-200 flex justify-between items-center ">
        <div className="py-4 font-nunito-sans  font-semibold flex items-center gap-2.5">
          <IoArrowBackOutline
            onClick={() => router.back()}
            size={18}
            className=" cursor-pointer hidden max-[950px]:inline-block"
          />
          <div className=" relative">
            <Image
              src={"/Images/Jennifer.png"}
              alt="chats"
              width={60}
              height={60}
              className="rounded-full h-11.5 w-11.5 object-cover"
            />
            <span className="w-2 h-2 bg-green-500 rounded-full absolute bottom-0.5 right-0.5 outline-2 outline-white"></span>
          </div>
          <h3 className=" text-[20px]">Jennifer</h3>
        </div>
        <div className=" flex items-center gap-6 pr-4">
          <div>
            <HiSpeakerWave size={24} className="  cursor-pointer" />
            <HiSpeakerXMark size={24} className=" cursor-pointer hidden" />
          </div>
          <BsThreeDotsVertical size={24} className=" cursor-pointer" />
        </div>
      </header>
    </>
  );
}

export default Header;
