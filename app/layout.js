import { Inter } from "next/font/google";
import "./globals.css";
import { MessageProvider } from "@/hooks/useMessage"; // Adjust the import path as needed

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chat bot",
  description:
    "An AI-powered chatbot designed to handle customer support queries.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MessageProvider>
          {children}
        </MessageProvider>
      </body>
    </html>
  );
}
