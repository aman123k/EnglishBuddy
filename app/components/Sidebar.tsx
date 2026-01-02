import Image from "next/image";
import { RiAccountCircleFill } from "react-icons/ri";
import Link from "next/link";
import {
  Compass,
  Drama,
  Home,
  MessageSquare,
  Scale,
  TrendingUp,
  Users,
} from "lucide-react";

function Sidebar() {
  return (
    <>
      {/* Desktop header */}
      <section className="w-64 flex-shrink-0 h-[100dvh] bg-[#FFFFFF] border border-gray-200 overflow-y-scroll no-scrollbar max-[950px]:hidden ">
        <div className="p-[24px] sticky top-0 bg-white">
          <Link href={"/"} className=" flex items-center gap-4">
            <Image
              src="/Images/logo-blue.svg"
              alt="logo"
              width={35}
              height={35}
            />
            <div className=" flex-col flex gap-0.5">
              <h1 className="text-xl font-bold text-slate-900 font-nunito-sans">
                Lingo
              </h1>
              <p className="text-xs text-slate-500 font-nunito-sans">
                Master English Daily
              </p>
            </div>
          </Link>
        </div>
        <div className=" flex flex-col justify-center gap-10 max-[1050px]:gap-8 px-[20px] mt-[16px]">
          <ul className=" flex flex-col gap-3.5">
            <Link href={"/"}>
              <li className=" py-2 flex gap-2 items-center font-nunito-sans  cursor-pointer hover:text-[#193cb8] font-semibold">
                <Home size={18} />
                Dashboard
              </li>
            </Link>
            <li className="py-2 flex gap-2 items-center font-nunito-sans  cursor-pointer hover:text-[#193cb8] font-semibold">
              <Compass size={18} /> Explore
            </li>
            <li className="py-2 flex gap-2 items-center font-nunito-sans  cursor-pointer hover:text-[#193cb8] font-semibold">
              <TrendingUp size={18} />
              Progress
            </li>
          </ul>
          <div className="">
            <p className="text-xs font-nunito-sans font-semibold text-slate-400 uppercase tracking-wider">
              Learning Modes
            </p>
          </div>
          <ul className=" flex flex-col gap-3.5 ">
            <Link href={"/learning-modes/chat"}>
              <li className=" py-2 flex gap-2 items-center font-nunito-sans  cursor-pointer hover:text-[#193cb8] font-semibold">
                <MessageSquare className="w-5 h-5" />
                Chat
              </li>
            </Link>
            <Link href={"/learning-modes/characters"}>
              <li className=" py-2 flex gap-2 items-center font-nunito-sans  cursor-pointer hover:text-[#193cb8] font-semibold">
                <Users className="w-5 h-5" />
                Character Talks
              </li>
            </Link>
            <Link href={"/learning-modes/debates"}>
              <li className=" py-2 flex gap-2 items-center font-nunito-sans  cursor-pointer hover:text-[#193cb8] font-semibold">
                <Scale className="w-5 h-5" />
                Debates
              </li>
            </Link>
            <Link href={"/learning-modes/roleplays"}>
              <li className=" py-2 flex gap-2 items-center font-nunito-sans  cursor-pointer hover:text-[#193cb8] font-semibold">
                <Drama className="w-5 h-5" />
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
      <section className="min-[950px]:hidden z-10">
        <Link href={"/account"}>
          <header className="flex items-center justify-between px-8 max-[650px]:px-4 py-4 ">
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
            <Link href={"/"}>
              <button
                className={`flex flex-col items-center justify-center gap-2`}
              >
                <Home size={20} />
                <span className="text-xs">Dashboard</span>
              </button>
            </Link>
            <button
              className={`flex flex-col items-center justify-center gap-2`}
            >
              <Compass size={18} />
              <span className="text-xs">Explore</span>
            </button>
            <button
              className={`flex flex-col items-center justify-center gap-2`}
            >
              <TrendingUp size={20} />
              <span className="text-xs">Progress</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Sidebar;
