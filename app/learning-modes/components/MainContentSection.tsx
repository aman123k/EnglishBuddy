// Main chat layout for each learning mode (character, chat, etc.).
// Renders the header, chat history and message input area, and adapts
// its width based on whether the utility sidebar is open.
"use client";
import { useStore } from "@/app/store/store";
import Header from "./Header";
import ChatScreen from "./ChatScreen";
import Footer from "./Footer";
import useAuthentication from "@/app/hooks/useAuth";

interface MainContentSectionProps {
  title: string;
  tutorName?: string;
  img: string | undefined;
  isShowBottomHeader?: boolean;
  apiEndpoint: string;
  query?: string;
  // API route that will receive new chat messages (used by the footer).
  apiPath: string;
}

export function MainContentSection({
  title,
  tutorName,
  img,
  isShowBottomHeader,
  apiEndpoint,
  query,
  apiPath,
}: MainContentSectionProps) {
  useAuthentication();
  const { utilitySidebar } = useStore();

  return (
    <section
      className={`${
        !utilitySidebar?.isOpen ? "w-full" : "w-[55%] max-[950px]:w-full"
      } px-6 max-[950px]:px-4 relative ease-in-out duration-500`}
    >
      <Header
        title={title}
        tutorName={tutorName}
        img={img}
        isShowBottomHeader={isShowBottomHeader}
      />
      <ChatScreen apiEndpoint={apiEndpoint} query={query} />
      <Footer path={apiPath} />
    </section>
  );
}
