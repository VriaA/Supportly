"use client";
import Messages from "@/components/Messages";
import { MessagesContextProvider } from "@/contexts/MessagesContext";
import SearchField from "@/components/SearchField";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { AppContext } from "@/contexts/AppContext";
import { Box, Typography, CircularProgress, IconButton, useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import DeleteDialog from "@/components/DeleteDialog";
import useDeleteDialog from "@/hooks/useDeleteDialog";
import MenuIcon from "@mui/icons-material/Menu";

export default function Home() {
  const { signedInUser } = useContext(AppContext);
  const { isDeleteDialogOpen, openDeleteDialog, closeDeleteDialog } = useDeleteDialog();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  if (!signedInUser) {
    return (
      <div className="fixed h-fit w-fit inset-0 m-auto flex flex-col items-center gap-3">
        <CircularProgress />
        <Typography sx={{ fontWeight: 500 }}>
          Verifying your authentication...
        </Typography>
      </div>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center", // Center align items vertically
        justifyContent: "center", // Center align items horizontally
        position: "relative", // Needed to properly position the menu icon
        bgcolor: '#1C1C1C',
      }}
    >
      <MessagesContextProvider>
        {/* Hamburger Menu Icon for Mobile */}
        {isMobile && (
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ position: 'absolute', top: 16, left: 16, color: 'white' }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Sidebar Drawer */}
        <SideBar
          openDeleteDialog={openDeleteDialog}
          isDrawerOpen={isDrawerOpen}
          setDrawerOpen={setDrawerOpen}
        />

        {/* Main Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "600px", // Set a max-width for better readability
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          {/* Header */}
          <Header />

          {/* Messages & Search Field */}
          <Box component="main" sx={{ width: "100%" }}>
            <Messages />
            <SearchField />
          </Box>
        </Box>
      </MessagesContextProvider>

      {/* Dialog containing steps for deleting a user's account */}
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        close={closeDeleteDialog}
      />
    </Box>
  );
}
