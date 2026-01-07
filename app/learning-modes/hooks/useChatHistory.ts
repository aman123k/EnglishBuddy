// Reusable hook to load and paginate chat history, keep the view scrolled,
// optionally auto-speak the latest AI message, and trigger translations.
import { useEffect, useRef, useState } from "react";
import { useStore } from "@/app/store/store";
import { Message } from "@/app/interface/messageInterface";
import useGetAPIRequest from "@/app/hooks/useGetAPIRequest";
import { GET_USER_MESSAGES } from "@/app/queryKeys/allQueryKeys";
import { speakFemale } from "../voice/speak";
import usePostMessageRequest from "./usePostMessage";

interface UseChatHistoryOptions {
  apiEndpoint?: string;
  query?: string;
  enableAutoSpeak?: boolean;
}

interface UseChatHistoryReturn {
  autoScroll: React.RefObject<HTMLDivElement | null>;
  handleScroll: () => void;
  handleTranslate: (
    aiMessage: string,
    translatedContent: string,
    id: string
  ) => Promise<void>;
  handleGetFeedback: (
    explanation: string,
    originalMessage: string,
    correction: string,
    id: string
  ) => Promise<void>;
  isLoading: boolean;
  isFetchingHistory: boolean;
}

export const useChatHistory = (
  options: UseChatHistoryOptions = {}
): UseChatHistoryReturn => {
  const { apiEndpoint, enableAutoSpeak, query } = options;

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

  // Construct the full API endpoint with page parameter
  const fullEndpoint = query
    ? `${apiEndpoint}?page=${page}&${query}`
    : `${apiEndpoint}?page=${page}`;

  const { data: chatHistory, isLoading } = useGetAPIRequest<Message[]>(
    fullEndpoint,
    GET_USER_MESSAGES(fullEndpoint),
    0
  );

  const { mutateAsync } = usePostMessageRequest();

  useEffect(() => {
    if (chatHistory?.data) {
      if (page === 1) {
        setInitialMessages(chatHistory.data);
        if (enableAutoSpeak && chatHistory.data.length > 0) {
          speakFemale(chatHistory.data[chatHistory.data.length - 1].content);
        }
      } else {
        setPreviousMessages(chatHistory.data);
      }
      setTotalPageCount(chatHistory?.total ?? 0);
    }
  }, [
    chatHistory,
    setInitialMessages,
    setPreviousMessages,
    page,
    enableAutoSpeak,
  ]);

  useEffect(() => {
    if (autoScroll.current) {
      autoScroll.current.scrollTo({
        top: autoScroll.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [userMessage, page]);

  // Handles the scroll event of the chat history.
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
      const path = `/api/translate?chatId=${id}`;
      const response = await mutateAsync({
        path,
        data: { aiMessage },
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

  //
  const handleGetFeedback = async (
    explanation: string,
    originalMessage: string,
    correction: string,
    id: string
  ) => {
    const path = `/api/get-feedback?chatId=${id}`;
    if (correction) {
      setUtilitySidebar({
        isOpen: true,
        title: "Feedback",
        yourWords: originalMessage,
        translatedWords: correction,
        description: explanation,
      });
    } else {
      const response = await mutateAsync({
        path,
        data: { originalMessage },
      });
      if (response?.status) {
        setUtilitySidebar({
          isOpen: true,
          title: "Feedback",
          yourWords: originalMessage,
          translatedWords: response?.data?.correctedMatch[1],
          description: response?.data?.feedbackMatch[1],
        });
      }
    }
  };

  return {
    autoScroll,
    handleScroll,
    handleTranslate,
    handleGetFeedback,
    isLoading,
    isFetchingHistory,
  };
};
