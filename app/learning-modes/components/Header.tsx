// Shared header for learning modes: renders page title and,
// when requested, a compact conversation header with avatar and TTS toggle.
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoArrowBackOutline } from "react-icons/io5";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { toggleTts } from "../function/toggleTts";
import toast from "react-hot-toast";
import GeneralAvatar from "@/app/UIKIT/GeneralAvatar";

type HeaderProps = {
  title: string;
  img: string | undefined;
  tutorName?: string;
  isShowBottomHeader?: boolean;
};

function Header({ title, img, tutorName, isShowBottomHeader }: HeaderProps) {
  const router = useRouter();
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  useEffect(() => {
    const stored: string = localStorage.getItem("ttsEnabled") ?? "true";
    setIsSpeakerOn(JSON.parse(stored));
  }, []);

  const handleClick = () => {
    setIsSpeakerOn(!isSpeakerOn);
    toggleTts(!isSpeakerOn);
    toast(
      isSpeakerOn
        ? "Speaker OFF: Voices muted"
        : "Speaker ON: Voices will play",
      {
        icon: isSpeakerOn ? "🔊" : "🔇",
        duration: 2000,
      }
    );
  };
  return (
    <>
      <header
        className={`py-6 w-full border-b border-gray-200 font-nunito-sans  font-semibold text-xl flex items-center gap-2.5
      ${isShowBottomHeader ? "max-[950px]:hidden" : ""}`}
      >
        <IoArrowBackOutline
          onClick={() => router.back()}
          size={20}
          className="inline-block cursor-pointer"
        />
        <h1>{title}</h1>
      </header>
      {isShowBottomHeader && (
        <header className="w-full border-b border-gray-200 flex justify-between items-center ">
          <div className="py-4 font-nunito-sans  font-semibold flex items-center gap-2.5">
            <IoArrowBackOutline
              onClick={() => router.back()}
              size={18}
              className=" cursor-pointer hidden max-[950px]:inline-block"
            />
            <div className=" relative">
              {img ? (
                <Image
                  src={img}
                  alt="chats"
                  width={60}
                  height={60}
                  className="rounded-full h-11.5 w-11.5 object-cover object-top"
                />
              ) : (
                <GeneralAvatar height={45} width={45} name={tutorName ?? ""} />
              )}
              <span className="w-2 h-2 bg-green-500 rounded-full absolute bottom-0.5 right-0.5 outline-2 outline-white"></span>
            </div>
            <h3 className=" text-[20px]">{tutorName}</h3>
          </div>
          <div className=" flex items-center gap-6 pr-4">
            <div onClick={handleClick}>
              {isSpeakerOn ? (
                <HiSpeakerWave size={24} className="  cursor-pointer" />
              ) : (
                <HiSpeakerXMark size={24} className=" cursor-pointer" />
              )}
            </div>
            <BsThreeDotsVertical size={24} className=" cursor-pointer" />
          </div>
        </header>
      )}
    </>
  );
}

export default Header;
