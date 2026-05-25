// Shared header for learning modes: renders page title and,
// when requested, a compact conversation header with avatar and TTS toggle.
"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { IoArrowBackOutline } from "react-icons/io5";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRouter, usePathname } from "next/navigation";
import { toggleTts } from "../function/toggleTts";
import toast from "react-hot-toast";
import GeneralAvatar from "@/app/UIKIT/GeneralAvatar";
import useGetAPIRequest from "@/app/hooks/useGetAPIRequest";
import { Trash2, History, Compass, Volume2, VolumeX, MessageSquarePlus, BookOpen } from "lucide-react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

type HeaderProps = {
  title: string;
  img: string | undefined;
  tutorName?: string;
  isShowBottomHeader?: boolean;
  apiEndpoint?: string;
  query?: string;
};

function Header({ title, img, tutorName, isShowBottomHeader, apiEndpoint, query }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Determine active learning mode
  let mode = "chat";
  if (pathname.includes("/characters")) mode = "character";
  else if (pathname.includes("/debates")) mode = "debate";
  else if (pathname.includes("/roleplays")) mode = "roleplay";

  // Fetch list of previous sessions (scoped by mode and options)
  const { data: sessionsResponse, isLoading: isSessionsLoading, refetch: refetchSessions } = useGetAPIRequest<{
    sessionId: string;
    title: string;
    latestTimestamp: string;
  }[]>(
    `/api/chatSessions?mode=${mode}&${query || ""}`,
    ["chatSessions", mode, query || ""],
    0 // Fetch fresh when requested
  );

  const sessions = sessionsResponse?.data || [];

  useEffect(() => {
    const stored: string = localStorage.getItem("ttsEnabled") ?? "true";
    setIsSpeakerOn(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleStartNewChat = () => {
    setShowDropdown(false);
    // Generate a new unique session ID using timestamp + random string
    const newSessionId = String(new Date().getTime()) + Math.random().toString(36).substring(2, 9);
    
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("sessionId", newSessionId);
    
    toast.success("Starting fresh conversation...");
    // Redirect to the new session ID
    window.location.href = currentUrl.pathname + currentUrl.search;
  };

  const handleLoadSession = (sessId: string) => {
    setShowHistoryModal(false);
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("sessionId", sessId);
    
    toast.success("Loading historical chat...");
    // Redirect to the selected session ID
    window.location.href = currentUrl.pathname + currentUrl.search;
  };

  const handleDeleteSession = async (sessId: string) => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL;
      let deleteUrl = `${url}/api/clearChat?mode=${mode}&sessionId=${sessId}`;
      if (query) {
        deleteUrl += `&${query}`;
      }

      const response = await fetch(deleteUrl, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete session");
      }

      const json = await response.json();
      if (json.status) {
        toast.success("Conversation deleted!");
        // Invalidate react-query cache for user messages
        queryClient.invalidateQueries({ queryKey: ["GET_USER_MESSAGES"] });
        // Refetch sessions list
        refetchSessions();

        // If the deleted session is the currently active one, redirect to a new chat
        const activeUrlSessionId = new URLSearchParams(window.location.search).get("sessionId") || "default";
        const targetSessId = sessId || "default";
        if (targetSessId === activeUrlSessionId) {
          handleStartNewChat();
        }
      } else {
        toast.error(json.message || "Failed to delete session");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting session");
    }
  };

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
        className={`py-6 w-full border-b border-gray-200 font-nunito-sans font-semibold text-xl flex items-center gap-2.5
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
          <div className="py-4 font-nunito-sans font-semibold flex items-center gap-2.5">
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
                <HiSpeakerWave size={24} className=" cursor-pointer" />
              ) : (
                <HiSpeakerXMark size={24} className=" cursor-pointer" />
              )}
            </div>
            
            <div className="relative" ref={dropdownRef}>
              <BsThreeDotsVertical
                size={24}
                className="cursor-pointer hover:text-[#1C398E] transition-colors"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              
              {showDropdown && (
                <div className="absolute right-0 top-8 bg-white border border-gray-150 rounded-2xl shadow-xl z-50 p-2 w-52 text-sm text-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={handleStartNewChat}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 hover:text-[#1C398E] rounded-xl transition-colors font-semibold text-left border-none cursor-pointer bg-transparent text-slate-700"
                  >
                    <MessageSquarePlus size={16} className="text-[#1C398E]" />
                    <span>Start New Chat</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      setShowHistoryModal(true);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 hover:text-[#1C398E] rounded-xl transition-colors font-semibold text-left border-none cursor-pointer bg-transparent text-slate-700"
                  >
                    <History size={16} className="text-[#1C398E]" />
                    <span>Chat History</span>
                  </button>
                  
                  <Link
                    href="/progress"
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 hover:text-[#1C398E] rounded-xl transition-colors font-semibold text-left text-decoration-none block text-slate-700 font-nunito-sans"
                  >
                    <BookOpen size={16} className="text-[#1C398E]" />
                    <span>Review Notebook</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>
      )}

      {/* History Modal Overlay */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md max-h-[75vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Chat History</h3>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                  Select a past session to resume
                </p>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors border-none cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3 no-scrollbar max-[950px]:pb-24">
              {isSessionsLoading ? (
                <div className="py-12 text-center text-slate-400 font-semibold flex flex-col items-center gap-3">
                  <span className="w-7 h-7 border-2 border-[#1C398E] border-t-transparent rounded-full animate-spin"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Loading history...</span>
                </div>
              ) : sessions && sessions.length > 0 ? (
                sessions.map((session) => (
                  <div
                    key={session.sessionId}
                    onClick={() => handleLoadSession(session.sessionId)}
                    className="p-4 rounded-2xl border border-slate-100 hover:border-[#1C398E]/30 hover:bg-slate-50/50 cursor-pointer transition-all flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 text-[#1C398E] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <History size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-700 truncate group-hover:text-[#1C398E] transition-colors font-nunito-sans">
                        {session.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-semibold block mt-1">
                        {new Date(session.latestTimestamp).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent loading the session
                        handleDeleteSession(session.sessionId);
                      }}
                      className="p-2 rounded-xl bg-transparent hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors border-none cursor-pointer flex-shrink-0 ml-auto flex items-center justify-center"
                      title="Delete Conversation"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-slate-400 font-semibold text-xs uppercase tracking-wider">
                  No previous conversations found.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
