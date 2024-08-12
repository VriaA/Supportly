"use client";
import Messages from "@/components/Messages";
import { MessagesContextProvider } from "@/contexts/MessagesContext";
import SearchField from "@/components/SearchField";
import SideBar from "@/components/SideBar";
import Header from "@/components/Header";
import { AppContext } from "@/contexts/AppContext";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useContext } from "react";
import DeleteDialog from "@/components/DeleteDialog";
import useDeleteDialog from "@/hooks/useDeleteDialog";

export default function Home() {
  const { signedInUser } = useContext(AppContext);
  const { isDeleteDialogOpen, openDeleteDialog, closeDeleteDialog } =
    useDeleteDialog();

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
        minHeight: "100svh",
        overflow: "hidden",
      }}>
      <MessagesContextProvider>
        {/* Sidebar Drawer */}
        <SideBar openDeleteDialog={openDeleteDialog} />

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
