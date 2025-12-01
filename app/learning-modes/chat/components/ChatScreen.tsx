import React, { useEffect, useRef } from "react";
import { MdReplay, MdTranslate } from "react-icons/md";
import { useStore } from "@/app/store/store";
import { Message } from "@/app/interface/messageInterface";

function ChatScreen() {
  const { userMessage, setUtilitySidebar } = useStore();
  const autoScroll = useRef<HTMLDivElement>(null);

  const handleTranslate = (aiMessage: string) => {
    // Logic to handle translation of the message
    setUtilitySidebar({
      isOpen: true,
      title: "Translation",
      yourWords: aiMessage,
    });
  };

  useEffect(() => {
    if (autoScroll.current) {
      autoScroll.current.scrollTo({
        top: autoScroll.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [userMessage]);

  return (
    <section className="h-[calc(100dvh-156px-75px)] max-[950px]:h-[calc(100dvh-79px-70px)]">
      <section
        className="h-full overflow-y-auto py-4 flex flex-col gap-3.5 px-0.5 no-scrollbar"
        ref={autoScroll}
      >
        {userMessage && userMessage?.length > 0
          ? userMessage.map((msg: Message, index: number) => {
              if (msg.sender === "ai") {
                // AI message
                return (
                  <div
                    key={msg.id || index}
                    className={`px-6 py-4 bg-white rounded-xl shadow-md max-w-max max-[950px]:bg-none max-[950px]:w-[97%]
            max-[950px]:shadow-none max-[950px]:px-0 max-[950px]:py-0 max-[950px]:flex-row max-[950px]:gap-2.5
             flex flex-col gap-4`}
                  >
                    <p
                      className="font-nunito-sans font-medium text-base text-[#282828]
         max-[950px]:bg-[#F5F5FC] max-[950px]:text-md max-[950px]:p-4 max-[950px]:rounded-xl"
                    >
                      {msg.content}
                    </p>
                    <div className=" flex gap-2.5 items-center">
                      <button className=" flex items-center gap-2 border border-[#E9EBF9] rounded-full px-2 py-1 group">
                        <MdReplay className=" group-hover:bg-[#ABB1E9] p-0.5 rounded-full cursor-pointer group-hover:text-white bg-[#F5F5FC] text-lg" />
                        <span className=" text-xs text-[#868686] font-nunito-sans font-semibold cursor-pointer max-[950px]:hidden">
                          Replay
                        </span>
                      </button>
                      <button
                        onClick={() => handleTranslate(msg.content!)}
                        className=" flex items-center gap-2 border border-[#E9EBF9] rounded-full px-2 py-1 group"
                      >
                        <MdTranslate className=" group-hover:bg-[#ABB1E9] p-0.5 rounded-full cursor-pointer group-hover:text-white bg-[#F5F5FC] text-lg" />
                        <span className=" text-xs text-[#868686] font-nunito-sans font-semibold cursor-pointer max-[950px]:hidden">
                          Translate
                        </span>
                      </button>
                    </div>
                  </div>
                );
              } else {
                // User message
                return (
                  <div
                    key={msg.id || index}
                    className={`px-6 py-4 bg-[#2E3BC7] rounded-xl ml-auto shadow-md max-w-max max-[950px]:w-[97%] flex flex-col gap-4`}
                  >
                    <p className="font-nunito-sans font-medium text-base text-white max-[950px]:text-md">
                      {msg.content}
                    </p>
                  </div>
                );
              }
            })
          : "No messages yet. Start the conversation!"}
      </section>
    </section>
  );
}

export default ChatScreen;
