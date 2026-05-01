// Chat input footer: handles text input, voice input and sending messages
// to the chat API, and pushes both user and AI replies into the store.
"use client";
import "regenerator-runtime/runtime";
import React, { useEffect } from "react";
import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { LuMic } from "react-icons/lu";
import { useStore } from "@/app/store/store";
import successLoader from "../data/loading.json";
import usePostMessageRequest from "../hooks/usePostMessage";
import Lottie from "lottie-react";
import { speakFemale } from "../voice/speak";
import voice_wave from "../data/voice_wave.json";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function Footer({ path }: { path: string }) {
  // 1. STATE MANAGEMENT

  const [message, setMessage] = useState("");
  const { setUserMessage } = useStore();

  // 2. HOOKS
  const { mutateAsync, isPending } = usePostMessageRequest();

  // Speech Recognition Hook: Manages the state and functionality for voice-to-text.
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // 3. HANDLERS AND LOGIC

  // Main handler for form submission (when the user presses Enter or the Send button).
  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit the text from the state when using the form.
    await submitMessage(message);
  };

  // Core function to handle the submission of any message (text input or voice transcript).
  const submitMessage = async (text: string) => {
    //  GUARD CLAUSE: Prevent sending empty or whitespace-only messages.
    if (!text.trim()) return;

    //  UI UPDATE (User Message): Add the user's message to the chat display immediately.
    setUserMessage({
      _id: String(new Date().getTime()),
      role: "user",
      content: text,
      timestamp: new Date(),
    });

    //  INPUT/TRANSCRIPT CLEANUP: Clear the text input and the voice transcript after submission.
    setMessage("");
    resetTranscript();

    //  API CALL: Send the message to the backend chat service.

    const response = await mutateAsync({
      path,
      data: { messages: [{ content: text, role: "user" }] },
    });

    //  UI UPDATE (AI Response): Add the AI's response to the chat display.
    if (response?.reply?.content) {
      setUserMessage({
        _id: String(new Date().getTime()),
        role: "model",
        content: response.reply.content,
        timestamp: new Date(),
      });
      //  VOICE RESPONSE: Speak the AI's response using a synthetic voice.
      speakFemale(response.reply.content);
    }
  };

  // Function to toggle speech recognition (start/stop listening).
  const handleMicClick = () => {
    // Check if the current browser supports the necessary API.
    if (!browserSupportsSpeechRecognition) {
      alert("Browser does not support speech recognition.");
      return;
    }

    if (listening) {
      // If currently listening, stop it. This action finalizes the transcript
      // and triggers the useEffect below to submit the message.
      SpeechRecognition.stopListening();
    } else {
      // If not listening, start it. Reset transcript for a clean start.
      resetTranscript();
      // Set 'continuous: true' to keep listening even if the user pauses.
      SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    }
  };

  // 4. EFFECTS

  // Effect to automatically submit the voice transcript once listening stops.
  useEffect(() => {
    if (!listening && transcript.trim() !== "") {
      // Submit the captured voice text.
      submitMessage(transcript);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listening, transcript]); // Dependencies: listening state and the captured text.

  // Custom timeout: automatically stop listening after 3 seconds of silence
  useEffect(() => {
    if (listening && transcript) {
      const timeoutId = setTimeout(() => {
        SpeechRecognition.stopListening();
      }, 3000); // Wait for 3 seconds of silence before auto-submitting
      return () => clearTimeout(timeoutId);
    }
  }, [listening, transcript]);


  // Dimensions for the Lottie loading animation.
  const dimensions = { height: 50, width: 80 };

  // 5. RENDER
  return (
    <section className="max-[950px]:pt-4">
      {/* Loading Indicator for API Call */}
      {isPending && (
        <div className=" absolute bottom-[80px] left-4 max-[950px]:bottom-[50px]">
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

      {/* Message Input Form */}
      <form
        onSubmit={handleSendMessage}
        className=" bg-white max-[950px]:bg-[#F5F5FC] rounded-xl w-full flex items-center"
      >
        {/* Conditional Input Field: Show standard text input UNLESS voice recording is active. */}
        {!listening && (
          <input
            type="text"
            // The value is bound to the local 'message' state.
            value={message}
            className=" w-full rounded-xl p-4 text-[#282828] font-nunito-sans font-medium text-base outline-none"
            placeholder="Type a message..."
            onChange={(e) => setMessage(e.currentTarget.value)}
          />
        )}

        {/* Voice Wave Animation: Displayed ONLY when speech recognition is active. */}
        {listening && (
          <Lottie
            loop={true}
            autoplay={true}
            animationData={voice_wave}
            height={dimensions.height}
            style={{
              height: dimensions.height,
              width: "100%", // Takes up the space of the text input.
            }}
          />
        )}

        {/* Conditional Buttons: Logic for Microphone vs. Send Button */}

        {/* Microphone Button: Displayed if the input field is EMPTY (neither text nor voice recorded yet). */}
        {!message.trim() && (
          <button
            // Use onClick to call the mic toggle function, and type="button" to prevent form submission.
            onClick={handleMicClick}
            type="button"
            className=" bg-[#F7F7FD] max-[950px]:bg-white w-14 flex flex-col items-center justify-center mr-4
       rounded-xl cursor-pointer py-3.5 max-[950px]:py-2.5 "
          >
            <LuMic className="text-2xl text-[#2E3BC7]" />
          </button>
        )}

        {/* Send Button: Displayed if the input field is NOT EMPTY (user has typed text). */}
        {message.trim() && (
          <button
            // Disable button while waiting for the API response.
            disabled={isPending}
            type="submit" // Triggers the form's onSubmit handler (handleSendMessage).
            className={`bg-[#2E3BC7] w-14 flex flex-col items-center justify-center mr-4
       rounded-xl cursor-pointer py-3.5 max-[950px]:py-2.5 ${
         isPending ? " opacity-65" : "" // Visual feedback when disabled.
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
