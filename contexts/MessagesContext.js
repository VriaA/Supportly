"use client";
import { createContext } from "react";
import useMessage from "@/hooks/useMessage";

export const MessagesContext = createContext(null);

export function MessagesContextProvider({ children }) {
  const { setMessage, sendMessage, messages, message } = useMessage();

  return (
    <MessagesContext.Provider
      value={{ setMessage, sendMessage, messages, message }}>
      {children}
    </MessagesContext.Provider>
  );
}