import { Inter } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/contexts/AppContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Supportly",
  description:
    "Your personal AI-powered mental health support assistant here to help navigate anxiety, depression, stress management, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#1C1C1C]`}>
        <AppContextProvider>{children}</AppContextProvider>
      </body>
    </html>
  );
}
