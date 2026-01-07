// Scrollable chat history area.
// Reads messages from the global store and wires up pagination,
// auto-scroll and translation actions via the chat history hook.
"use client";

import { MdReplay, MdTranslate } from "react-icons/md";
import { useStore } from "@/app/store/store";
import { Message } from "@/app/interface/messageInterface";
import { speakFemale } from "../voice/speak";

import { useChatHistory } from "../hooks/useChatHistory";
import Loader from "@/app/UIKIT/Loader";
import { CircleAlert } from "lucide-react";

function ChatScreen({
  apiEndpoint,
  query,
}: {
  apiEndpoint: string;
  query?: string;
}) {
  // Get chat-related state from store.
  const { userMessage } = useStore();

  // Use the reusable chat history hook for managing pagination, scrolling, and translation.
  const {
    autoScroll,
    handleScroll,
    handleTranslate,
    isLoading,
    handleGetFeedback,
  } = useChatHistory({
    apiEndpoint: apiEndpoint,
    enableAutoSpeak: true,
    query,
  });

  return (
    <section className="h-[calc(100dvh-156px-75px)] max-[950px]:h-[calc(100dvh-79px-90px)]">
      <section
        className="h-full overflow-y-auto py-4 flex flex-col gap-3.5 px-0.5 no-scrollbar"
        ref={autoScroll}
        onScroll={handleScroll}
      >
        {/* Display loading animation if chat history is being fetched. */}
        {isLoading ? (
          <Loader />
        ) : userMessage && userMessage?.length > 0 ? (
          // Render chat messages if available.
          userMessage.map((msg: Message, index: number) => {
            if (msg.role === "model") {
              // AI message display.
              return (
                <div
                  key={msg._id || index}
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
                    {/* Replay button for AI message. */}
                    <button
                      onClick={() => speakFemale(msg.content)}
                      className=" flex items-center gap-2 border border-[#E9EBF9] rounded-full px-2 py-1 group"
                    >
                      <MdReplay className=" group-hover:bg-[#ABB1E9] p-0.5 rounded-full cursor-pointer group-hover:text-white bg-[#F5F5FC] text-lg" />
                      <span className=" text-xs text-[#1b1818] font-nunito-sans font-semibold cursor-pointer max-[950px]:hidden">
                        Replay
                      </span>
                    </button>
                    {/* Translate button for AI message. */}
                    <button
                      onClick={() =>
                        handleTranslate(
                          msg.content!,
                          msg.translatedContent!,
                          msg._id!
                        )
                      }
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
              // User message display.
              return (
                <div
                  key={msg._id || index}
                  className={`ml-auto  flex ic
                 items-center gap-4 max-[650px]:gap-2.5`}
                  onClick={() => {
                    handleGetFeedback(
                      msg.feedback!,
                      msg.content!,
                      msg.correction!,
                      msg._id!
                    );
                  }}
                >
                  <div className=" bg-[#FCA129] cursor-pointer rounded-full p-1.5 flex items-center justify-center">
                    <CircleAlert className="h-4 w-4 text-white" />
                  </div>

                  <p
                    className="bg-[#2E3BC7] shadow-md max-w-max max-[950px]:w-[97%] px-6 py-4
                  font-nunito-sans font-medium text-base text-white max-[950px]:text-md rounded-xl "
                  >
                    {msg.content}
                  </p>
                </div>
              );
            }
          })
        ) : (
          // Render empty string if no messages and not loading.
          ""
        )}
      </section>
    </section>
  );
}

export default ChatScreen;
