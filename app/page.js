"use client";
import { Box } from "@mui/material";
import Messages from "@/components/Messages";
import { MessagesContextProvider } from "@/contexts/MessagesContext";
import SearchField from "@/components/SearchField";
import SideBar from "@/components/SideBar";
import Header from "@/components/Header";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100svh",
        overflow: "hidden",
      }}>
      {/* Sidebar Drawer */}
      <SideBar />

      {/* Main Content */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          flexGrow: 1,
          padding: "20svh 0 40px",
        }}>
        {/* Header */}
        <Header />

        {/* Messages & search field */}
        <Box component="main">
          <MessagesContextProvider>
            <Messages />
            <SearchField />
          </MessagesContextProvider>
        </Box>
      </Box>
    </Box>
  );
}
