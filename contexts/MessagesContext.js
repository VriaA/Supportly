"use client";
import { createContext } from "react";
import useMessage from "@/hooks/useMessage";

export const MessagesContext = createContext(null);

export function MessagesContextProvider({ children }) {
  const { setMessage, sendMessage, setMessages, messages, message } =
    useMessage();

  return (
    <MessagesContext.Provider
      value={{ setMessage, sendMessage, setMessages, messages, message }}>
      {children}
    </MessagesContext.Provider>
  );
}
