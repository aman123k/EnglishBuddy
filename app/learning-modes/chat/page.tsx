"use client";
import React from "react";
import Sidebar from "@/app/components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatScreen from "./components/ChatScreen";
import UtilitySidebar from "./components/UtilitySidebar";
import { useStore } from "@/app/store/store";

function Chats() {
  const { utilitySidebar } = useStore();
  return (
    <section className=" bg-[#F7F7FE] max-[950px]:bg-white min-[1600px]:w-[1400px]  min-[1600px]:mx-[50%] min-[1600px]:translate-x-[-50%]">
      <section className="flex max-[950px]:flex-col">
        <div className="max-[950px]:hidden">
          <Sidebar />
        </div>
        <section
          className={`${
            !utilitySidebar?.isOpen ? "w-full" : "w-[55%] max-[950px]:w-full"
          } px-6 max-[950px]:px-4 relative ease-in-out duration-500`}
        >
          <Header />
          <ChatScreen />
          <Footer />
        </section>
        <section
          className={`${
            utilitySidebar?.isOpen ? "w-[30%]" : "hidden"
          } bg-white px-5`}
        >
          <UtilitySidebar />
        </section>
      </section>
    </section>
  );
}

export default Chats;
