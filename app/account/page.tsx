"use client";
import Sidebar from "../components/Sidebar";
import { useStore } from "../store/store";
import Container from "./components/Container";
import Header from "./components/Header";
import ProfileSidebar from "./components/ProfileSidebar";

function Account() {
  const { accountSidebar } = useStore();

  return (
    <section className=" bg-[#F7F7FE] max-[950px]:bg-white min-[1600px]:w-[1400px]  min-[1600px]:mx-[50%] min-[1600px]:translate-x-[-50%]">
      <section className="flex max-[950px]:flex-col">
        <div className="max-[950px]:hidden">
          <Sidebar />
        </div>
        <section
          className={`${
            !accountSidebar?.isOpen ? "w-full" : "w-[55%] max-[950px]:w-full"
          } flex flex-col gap-4 px-6 max-[950px]:px-4 relative ease-in-out duration-500`}
        >
          <Header />
          <Container />
        </section>
        <section
          className={`${
            accountSidebar?.isOpen ? "w-[30%] " : "hidden"
          } bg-white px-5 min-[950px]:relative`}
        >
          <ProfileSidebar />
        </section>
      </section>
    </section>
  );
}

export default Account;
