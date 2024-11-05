"use client";

import { useEffect, useState } from "react";
import welcomMessage from "@/libs/welcomMessage";

export default function useMessage() {
  const [messages, setMessages] = useState(welcomMessage);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // SCROLL TO THE BOTTOM WHEN A NEW MESSAGE IS ADDED
    window.scroll({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }, [messages]);

  async function sendMessage(event) {
    event.preventDefault();
    if (!message.trim()) return;
    const sendBtn = document.getElementById("send-btn");

    setMessage(""); // Clear the message after it's sent
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message }, // Add user message
      { role: "assistant", content: "" }, // Prepare for the assistant's response
    ]);

    try {
      // Disable the send button when awaiting a response
      sendBtn.setAttribute("disabled", true);

      const rag_response = await fetch("/api/rag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: message }),
      });

      if (!rag_response.ok) {
        throw new Error("Network response was not ok");
      }

      const { prompt } = await rag_response.json();

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: "user", content: prompt }]),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder
          .decode(value, { stream: true })
          .replaceAll("**", "");
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
      }
    } catch (error) {
      // Replaces the empty string with an error message so the loading indicator is removed
      setMessages((messages) => [
        ...messages.slice(0, -1),
        {
          role: "assistant",
          content:
            "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      // Enable the send button after
      sendBtn.removeAttribute("disabled");
    }
  }

  return { messages, setMessages, message, setMessage, sendMessage };
}
