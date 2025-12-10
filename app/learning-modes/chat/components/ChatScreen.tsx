// This component displays the chat interface, including messages and interactive elements.
import Lottie from "lottie-react";
import React, { useEffect, useRef, useState } from "react";
import { MdReplay, MdTranslate } from "react-icons/md";
import { useStore } from "@/app/store/store";
import { Message } from "@/app/interface/messageInterface";
import useGetAPIRequest from "@/app/hooks/useGetAPIRequest";
import { GET_USER_MESSAGES } from "@/app/queryKeys/allQueryKeys";
import { speakFemale } from "../../voice/speak";
import chatsLoader from "../../data/chatsLoading.json";
import usePostMessageRequest from "../../hooks/usePostMessage";

function ChatScreen() {
  // Global store for managing chat-related states.
  const {
    userMessage,
    setUtilitySidebar,
    setInitialMessages,
    setPreviousMessages,
  } = useStore();

  // Ref for auto-scrolling to the bottom of the chat.
  const autoScroll = useRef<HTMLDivElement>(null);
  // State for pagination of chat history.
  const [page, setPage] = useState(1);
  // State for total number of pages in chat history.
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [isFetchingHistory, setIsFetchingHistory] = useState(false);
  const dimensions = { height: 400, width: 500 };

  const { data: chatHistory, isLoading } = useGetAPIRequest<Message[]>(
    `/api/chatHistory?page=${page}`,
    GET_USER_MESSAGES(`/api/chatHistory?page=${page}`),
    0
  );

  const { mutateAsync } = usePostMessageRequest();

  useEffect(() => {
    if (chatHistory?.data) {
      if (page === 1) {
        setInitialMessages(chatHistory.data);
        speakFemale(chatHistory.data[chatHistory.data.length - 1].content);
      } else {
        setPreviousMessages(chatHistory.data);
      }
      setTotalPageCount(chatHistory?.total ?? 0);
    }
  }, [chatHistory, setInitialMessages, setPreviousMessages, page]);

  useEffect(() => {
    if (autoScroll.current) {
      autoScroll.current.scrollTo({
        top: autoScroll.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [userMessage, page]);

  const handleScroll = () => {
    const scrollDiv = autoScroll.current;
    if (!scrollDiv || isFetchingHistory) return;

    // If user scrolled to top
    if (scrollDiv.scrollTop === 0) {
      if (userMessage.length >= totalPageCount) return; // No more messages to load.

      setIsFetchingHistory(true);

      const prevHeight = scrollDiv.scrollHeight;

      // Load next page of chat history.
      setPage((prev) => prev + 1);

      setTimeout(() => {
        // Maintain scroll position after new messages load to give a continuous experience.
        const newHeight = scrollDiv.scrollHeight;
        scrollDiv.scrollTop = newHeight - prevHeight;

        setIsFetchingHistory(false);
      }, 300);
    }
  };

  // Handles translation of AI messages.
  const handleTranslate = async (
    aiMessage: string,
    translatedContent: string,
    id: string
  ) => {
    // If translated content already exists, open the sidebar with it directly.
    if (translatedContent) {
      setUtilitySidebar({
        isOpen: true,
        title: "Translation",
        yourWords: aiMessage,
        translatedWords: translatedContent,
      });
    } else {
      // If not translated, make an API call to translate the message.
      const path = "/api/translate";
      const response = await mutateAsync({
        path,
        data: { id },
      });
      // On successful translation, open the sidebar with the translated content.
      if (response?.status) {
        setUtilitySidebar({
          isOpen: true,
          title: "Translation",
          yourWords: aiMessage,
          translatedWords: response?.data,
        });
      }
    }
  };

  return (
    <section className="h-[calc(100dvh-156px-75px)] max-[950px]:h-[calc(100dvh-79px-90px)]">
      <section
        className="h-full overflow-y-auto py-4 flex flex-col gap-3.5 px-0.5 no-scrollbar"
        ref={autoScroll}
        onScroll={handleScroll}
      >
        {/* Display loading animation if chat history is being fetched. */}
        {isLoading ? (
          <div className=" absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]">
            <Lottie
              loop={true}
              autoplay={true}
              animationData={chatsLoader}
              height={dimensions.height}
              width={dimensions.width}
              style={{
                height: dimensions.height,
                width: dimensions.width,
              }}
            />
          </div>
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
                      <span className=" text-xs text-[#868686] font-nunito-sans font-semibold cursor-pointer max-[950px]:hidden">
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
                  className={`px-6 py-4 bg-[#2E3BC7] rounded-xl ml-auto shadow-md max-w-max max-[950px]:w-[97%] flex flex-col gap-4`}
                >
                  <p className="font-nunito-sans font-medium text-base text-white max-[950px]:text-md">
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
