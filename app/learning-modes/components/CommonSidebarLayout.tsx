"use client";
import { useStore } from "@/app/store/store";
import useAuthentication from "@/app/hooks/useAuth";
import { RxCross2 } from "react-icons/rx";
import { FaCheck, FaMicrophone } from "react-icons/fa";

export function CommonSidebarLayout() {
  const { utilitySidebar, setUtilitySidebar } = useStore();
  // Access utility sidebar state and setter from the global store.

  // Access user data from authentication hook.
  const { userData } = useAuthentication();

  return (
    <section
      className={`${
        utilitySidebar?.isOpen ? "w-[30%] " : "hidden"
      } bg-white px-5`}
    >
      {/* Overlay to close the sidebar when clicked outside on smaller screens. */}
      <div
        className="max-[950px]:absolute max-[950px]:h-full max-[950px]:bg-[#282828] max-[950px]:left-0 max-[950px]:top-0 
    max-[950px]:opacity-55 max-[950px]:w-full"
        onClick={() => setUtilitySidebar({ isOpen: false })}
      ></div>
      {/* Sidebar container with conditional styling for responsiveness. */}
      <div
        className={`max-[950px]:z-50 max-[950px]:absolute max-[950px]:bottom-0 max-[950px]:left-0 bg-white
          max-[950px]:w-full  max-[950px]:bg-[#E9EBF9] max-[950px]:h-[60dvh] overflow-scroll no-scrollbar h-[100dvh] max-[950px]:rounded-t-2xl`}
      >
        <div
          className=" max-[950px]:rounded-2xl max-[950px]:mx-[20px]
        max-[950px]:px-6 max-[950px]:pb-6 max-[950px]:my-[34px] bg-white"
        >
          {/* Header section of the sidebar, displaying title and a close button. */}
          <header
            className="py-6 w-full border-b border-gray-200 font-nunito-sans  font-semibold text-xl flex items-center gap-2.5
           justify-between"
          >
            <h1>{utilitySidebar?.title}</h1>

            <RxCross2
              className=" cursor-pointer text-2xl max-[950px]:hidden"
              onClick={() => setUtilitySidebar({ isOpen: false })}
            />
          </header>

          {/* Conditional rendering for "Information" content. */}
          {utilitySidebar?.title === "Information" && (
            <section className=" flex flex-col gap-4 border border-[#E9EBF9] rounded-2xl p-5 mt-8">
              <h1 className=" text-[#282828] font-nunito-sans text-xl tracking-wide font-semibold">
                Get feedback on messages
              </h1>
              <div className=" flex items-center gap-6">
                <span className=" bg-[#0D8345] p-2 rounded-full">
                  <FaCheck color="#FFFFFF" size={20} />
                </span>
                <span className=" bg-[#2E3BC7] p-2 rounded-full">
                  <FaMicrophone color="#ffffff" size={20} />
                </span>
              </div>
              <p className=" text-[#282828] text-base font-semibold font-nunito-sans">
                AI will assess your messages and give you personalized feedback
              </p>
            </section>
          )}

          {/* Conditional rendering for "Translation" content. */}
          {utilitySidebar?.title === "Translation" && (
            <section className=" flex flex-col gap-5 py-5 max-[650px]:gap-3">
              <div className=" flex flex-col gap-2">
                <span className=" text-[#868686] text-xs font-semibold font-nunito-sans  ">
                  English
                </span>
                <p className=" font-nunito-sans text-[#282828] font-semibold text-base">
                  {utilitySidebar?.yourWords}
                </p>
              </div>
              <hr className=" border-gray-200" />
              <div className=" flex flex-col gap-2">
                <span className=" text-[#868686] text-xs font-semibold font-nunito-sans  ">
                  {userData?.translationLanguage}
                </span>
                <p className=" font-nunito-sans text-[#282828] font-medium tracking-[0px] text-base">
                  {utilitySidebar?.translatedWords}
                </p>
              </div>
            </section>
          )}
        </div>
      </div>
    </section>
  );
}
