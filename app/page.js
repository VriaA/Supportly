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
        flexDirection: {
          xs: "column", // Stack items vertically on small screens
          md: "row",   // Use a row layout on medium to large screens
        },
      }}
    >
      <MessagesContextProvider>
        {/* Sidebar Drawer */}
        <SideBar
          openDeleteDialog={openDeleteDialog}
          sx={{
            display: {
              xs: "none", // Hide sidebar on extra small screens
              md: "block", // Show sidebar on medium screens and larger
            },
            width: {
              md: "240px", // Set width for the sidebar on larger screens
            },
          }}
        />

        {/* Main Content */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            flexGrow: 1,
            padding: {
              xs: "20px 10px", // Adjust padding on small screens
              md: "20svh 0 40px", // Default padding on medium and large screens
            },
            bgcolor: '#1C1C1C',
          }}
        >
          {/* Header */}
          <Header />

          {/* Messages & Search Field */}
          <Box component="main" sx={{
            padding: {
              xs: "0 10px", // Adjust padding for smaller screens
              md: "0 20px", // Larger padding on medium screens
            }
          }}>
            <Messages />
            <SearchField />
          </Box>
        </Box>
      </MessagesContextProvider>

      {/* Dialog containing steps for deleting a user's account */}
      <DeleteDialog isOpen={isDeleteDialogOpen} close={closeDeleteDialog} />
    </Box>
  );
}
