import React from "react";
import Sidebar from "@/app/components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

function Chats() {
  return (
    <section className=" bg-[#F7F7FE] max-[650px]:bg-white min-[1600px]:w-[1400px]  min-[1600px]:mx-[50%] min-[1600px]:translate-x-[-50%]">
      <section className="flex max-[650px]:flex-col">
        <div className="max-[650px]:hidden">
          <Sidebar />
        </div>
        <section className={` w-full px-6 max-[650px]:px-4 relative`}>
          <Header />
          <section className="h-[calc(100dvh-156px-75px)] max-[650px]:h-[calc(100dvh-79px-70px)] "></section>
          <Footer />
        </section>
      </section>
    </section>
  );
}

export default Chats;
