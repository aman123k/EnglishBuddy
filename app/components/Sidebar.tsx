"use client";
import React, { useState } from "react";
import Image from "next/image";
import { RiAccountCircleFill } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Drama,
  Home,
  MessageSquare,
  Scale,
  TrendingUp,
  Users,
  ChevronRight,
  ChevronDown,
  Briefcase,
  Trophy,
  BookOpen,
  Plane,
} from "lucide-react";

function Sidebar() {
  const pathname = usePathname();
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const [modesCollapsed, setModesCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Explore", href: "/explore", icon: Compass },
    { name: "Progress", href: "/progress", icon: TrendingUp },
  ];

  const learningModes = [
    { name: "Chat", href: "/learning-modes/chat", icon: MessageSquare },
    {
      name: "Character Talks",
      href: "/learning-modes/characters",
      icon: Users,
    },
    { name: "Debates", href: "/learning-modes/debates", icon: Scale },
    { name: "Roleplays", href: "/learning-modes/roleplays", icon: Drama },
    {
      name: "Business Coach",
      href: "/learning-modes/business-coach",
      icon: Briefcase,
    },
    { name: "Vocab Arena", href: "/learning-modes/vocab-arena", icon: Trophy },
    {
      name: "Story Co-creation",
      href: "/learning-modes/co-write-story",
      icon: BookOpen,
    },
    { name: "Travel Survival", href: "/learning-modes/travels", icon: Plane },
  ];

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="w-72 flex-shrink-0 h-screen bg-white border-r border-gray-100 flex flex-col max-[950px]:hidden overflow-hidden">
        {/* Logo Section - Keeping original structure as requested */}
        <div className="p-8 pb-10">
          <Link
            href={"/"}
            className="flex items-center gap-4 text-decoration-none"
          >
            <Image
              src="/Images/logo-blue.svg"
              alt="logo"
              width={35}
              height={35}
              className="hover:scale-110 transition-transform"
            />
            <div className="flex-col flex gap-0.5">
              <h1 className="text-xl font-bold text-slate-900 leading-none">
                Lingo
              </h1>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                Master English Daily
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 px-4 flex flex-col gap-8 overflow-y-auto no-scrollbar">
          {/* Main Menu */}
          <div>
            <button
              onClick={() => setMenuCollapsed(!menuCollapsed)}
              className="w-full flex items-center justify-between px-4 mb-4 text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em] hover:text-[#1C398E] transition-colors bg-transparent border-0 outline-none cursor-pointer"
            >
              <span>Menu</span>
              <ChevronDown
                size={12}
                className={`transition-transform duration-300 ${menuCollapsed ? "-rotate-90 text-slate-400" : "text-[#1C398E]"}`}
              />
            </button>
            <div
              className={`transition-all duration-500 overflow-hidden ${menuCollapsed ? "max-h-0 opacity-0" : "max-h-[200px] opacity-100"}`}
            >
              <ul className="space-y-1.5 list-none p-0 m-0">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-decoration-none block"
                    >
                      <li
                        className={`px-4 py-3 rounded-2xl flex items-center gap-3.5 transition-all duration-300 group ${
                          isActive
                            ? "bg-[#1C398E] text-white shadow-lg shadow-[#1C398E]/25"
                            : "text-slate-500 hover:bg-slate-50 hover:text-[#1C398E]"
                        }`}
                      >
                        <item.icon
                          size={18}
                          className={`${isActive ? "text-white" : "text-slate-400 group-hover:text-[#1C398E]"} transition-colors`}
                        />
                        <span
                          className={`${isActive ? "font-semibold" : "font-medium"} text-[14px]`}
                        >
                          {item.name}
                        </span>
                        {isActive && (
                          <ChevronRight
                            size={14}
                            className="ml-auto opacity-50"
                          />
                        )}
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Learning Section */}
          <div>
            <button
              onClick={() => setModesCollapsed(!modesCollapsed)}
              className="w-full flex items-center justify-between px-4 mb-4 text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em] hover:text-[#1C398E] transition-colors bg-transparent border-0 outline-none cursor-pointer"
            >
              <span>Learning Modes</span>
              <ChevronDown
                size={12}
                className={`transition-transform duration-300 ${modesCollapsed ? "-rotate-90 text-slate-400" : "text-[#1C398E]"}`}
              />
            </button>
            <div
              className={`transition-all duration-500 overflow-hidden ${modesCollapsed ? "max-h-0 opacity-0" : "max-h-[600px] opacity-100"}`}
            >
              <ul className="space-y-1.5 list-none p-0 m-0">
                {learningModes.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-decoration-none block"
                    >
                      <li
                        className={`px-4 py-3 rounded-2xl flex items-center gap-3.5 transition-all duration-300 group ${
                          isActive
                            ? "bg-indigo-50 text-[#1C398E]"
                            : "text-slate-500 hover:bg-slate-50 hover:text-[#1C398E]"
                        }`}
                      >
                        <item.icon
                          size={18}
                          className={`${isActive ? "text-[#1C398E]" : "text-slate-400 group-hover:text-[#1C398E]"} transition-colors`}
                        />
                        <span
                          className={`${isActive ? "font-semibold" : "font-medium"} text-[14px]`}
                        >
                          {item.name}
                        </span>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Account Section */}
        <div className="p-6 border-t border-gray-100 mt-auto">
          <Link href="/account" className="text-decoration-none">
            <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-all duration-300 group cursor-pointer border border-transparent hover:border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#1C398E] group-hover:bg-[#1C398E] group-hover:text-white transition-all duration-300 shadow-sm">
                <RiAccountCircleFill size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-800">
                  My Account
                </span>
                <span className="text-[10px] font-medium text-slate-400">
                  Settings
                </span>
              </div>
            </div>
          </Link>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <nav className="min-[950px]:hidden z-50 fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/Images/logo-blue.svg"
              alt="logo"
              width={28}
              height={28}
            />
            <span className="text-lg font-bold text-slate-900 tracking-tight">
              Lingo
            </span>
          </Link>
          <Link href="/account">
            <RiAccountCircleFill size={30} className="text-[#1C398E]" />
          </Link>
        </div>
      </nav>

      {/* Navigation bottom bar for mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 px-6 py-4 min-[950px]:hidden z-50">
        <div className="flex justify-around items-center">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="text-decoration-none"
              >
                <div
                  className={`flex flex-col items-center gap-1 transition-colors ${isActive ? "text-[#1C398E]" : "text-slate-400"}`}
                >
                  <item.icon
                    size={20}
                    className={isActive ? "stroke-[2.5px]" : ""}
                  />
                  <span className="text-[10px] font-semibold uppercase tracking-widest">
                    {item.name === "Dashboard" ? "Home" : item.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
