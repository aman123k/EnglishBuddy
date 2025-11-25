"use client";
import React from "react";
import Sidebar from "./components/Sidebar";
import useAuthentication from "./hooks/useAuth";

export default function Home() {
  const { userData } = useAuthentication();
  console.log(userData);
  return (
    <section className=" bg-[#F7F7FE] max-[650px]:bg-white min-[1600px]:w-[1400px]  min-[1600px]:mx-[50%] min-[1600px]:translate-x-[-50%]">
      <section className="flex max-[650px]:flex-col">
        <Sidebar />
        <section className="w-full">
          <header className="py-6 px-8 border-b border-gray-300 font-nunito-sans  font-semibold text-xl">
            <h1>Learning modes</h1>
          </header>
        </section>
      </section>
    </section>
  );
}
