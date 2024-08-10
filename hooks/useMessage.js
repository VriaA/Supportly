'use client'

import React, { createContext, useState, useContext } from 'react';

// Create Context
const MessageContext = createContext();

// Create Provider Component
export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm Supportly, your mental health support assistant.",
    },
    {
      role: "assistant",
      content: "I'm here to help with anxiety, depression, stress management, and more.",
    },
    {
      role: "assistant",
      content: "How can I support you today?",
    },
  ]);
  const [message, setMessage] = useState("");

  async function sendMessage() {
    if (!message.trim()) return;

    setMessage(""); // Clear the message after it's sent
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message }, // Add user message
      { role: "assistant", content: "" }, // Prepare for the assistant's response
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: "user", content: message }]),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true }).replaceAll("**", "");
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
      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content: "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    }
  }

  return (
    <MessageContext.Provider value={{ messages, setMessages, message, setMessage, sendMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

// Custom Hook to use MessageContext
export const useMessage = () => {
  return useContext(MessageContext);
};
