"use client";
import React from "react";
import { useState } from "react";
import useAuthentication from "./hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { userData, isLoading } = useAuthentication();

  const [messages, setMessages] = useState([
    {
      role: "user",
      parts: [
        {
          text: "You are my girlfriend ❤️. Act loving, caring, playful, and sweet.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Of course babe 😘 I’d love to! Hey love, how was your day? ❤️",
        },
      ],
    },
  ]);

  const [input, setInput] = useState("");

  async function sendMessage() {
    const newMessages = [{ role: "user", parts: [{ text: input }] }];
    setMessages((pre) => [...pre, ...newMessages]);

    const response = await fetch(" http://localhost:8080/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessages),
    });
    const result = await response.json();
    console.log(result);
    setInput("");
  }

  return (
    <div>
      <div>
        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.role === "user" ? "You" : "GF"}:</b> {m.parts[0].text}
          </p>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
