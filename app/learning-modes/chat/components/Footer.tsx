import React from "react";
import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { LuMic } from "react-icons/lu";
import { useStore } from "@/app/store/store";
import successLoader from "../../data/loading.json";
import usePostMessageRequest from "../../hooks/usePostMessage";
import Lottie from "lottie-react";
import { speakFemale } from "../../voice/speak";

function Footer() {
  const [message, setMessage] = useState("");
  const { setUserMessage } = useStore();

  // Hook for making POST API requests with loading states and error handling
  const { mutateAsync, isPending } = usePostMessageRequest();

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    setUserMessage({
      id: String(new Date().getTime()),
      role: "user",
      content: message,
      timestamp: new Date(),
    });

    setMessage("");

    // Make API call to send chat message
    const path = "/api/chatService";
    const response = await mutateAsync({
      path,
      data: { messages: [{ content: message, role: "user" }] },
    });
    setUserMessage({
      id: String(new Date().getTime()),
      role: "model",
      content: response?.reply,
      timestamp: new Date(),
    });
    if (response && response?.reply) {
      speakFemale(response?.reply);
    }
  };

  const dimensions = { height: 50, width: 80 };

  return (
    <section>
      {isPending && (
        <div className=" absolute bottom-[80px] left-4">
          <Lottie
            loop={true}
            autoplay={true}
            animationData={successLoader}
            height={dimensions.height}
            width={dimensions.width}
            style={{
              height: dimensions.height,
              width: dimensions.width,
            }}
          />
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className=" bg-white max-[950px]:bg-[#F5F5FC] rounded-xl w-full flex items-center"
      >
        <input
          type="text"
          value={message}
          className=" w-full rounded-xl p-4 text-[#282828] font-nunito-sans font-medium text-base outline-none"
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.currentTarget.value)}
        />

        {!message.trim() && (
          <button
            type="submit"
            className=" bg-[#F7F7FD] max-[950px]:bg-white w-14 flex flex-col items-center justify-center mr-4
       rounded-xl cursor-pointer py-3.5 max-[950px]:py-2.5 "
          >
            <LuMic className="text-2xl text-[#2E3BC7]" />
          </button>
        )}
        {message.trim() && (
          <button
            disabled={isPending}
            className={`bg-[#2E3BC7] w-14 flex flex-col items-center justify-center mr-4
       rounded-xl cursor-pointer py-3.5 max-[950px]:py-2.5 ${
         isPending ? " opacity-65" : ""
       }`}
          >
            <BsSend className="text-[#F7F7FD] text-lg" />
          </button>
        )}
      </form>
    </section>
  );
}

export default Footer;
