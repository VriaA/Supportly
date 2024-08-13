"use client";

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  useMediaQuery,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { MessagesContext } from "@/contexts/MessagesContext";
import welcomMessage from "@/libs/welcomMessage";
import { AppContext } from "@/contexts/AppContext";
import { auth } from "@/libs/firebase";
import { signOut } from "firebase/auth";

export default function SideBar({ openDeleteDialog }) {
  const drawerWidth = 240;
  const { setMessages, setMessage } = useContext(MessagesContext);
  const {
    openDialog,
    setDialog,
    setLoading,
    signedInUser,
    isSidebarOpen,
    setIsSidebarOpen,
  } = useContext(AppContext);

  const isPc = useMediaQuery("(min-width:900px)");

  function clearCurrentChats() {
    setMessage("");
    setMessages(() => welcomMessage);
  }

  function signUserOut() {
    setLoading((prevLoading) => !prevLoading);
    signOut(auth)
      .then(() => {
        setDialog((prevDialog) => ({
          ...prevDialog,
          message: `Sign out complete.`,
          isError: false,
        }));
        openDialog();
      })
      .catch((error) => {
        setDialog((prevDialog) => ({
          ...prevDialog,
          message: error.message,
          isError: true,
        }));
        openDialog();
      })
      .finally(() => {
        setLoading((prevLoading) => !prevLoading);
      });
  }

  return (
    <Drawer
      variant={isPc ? "permanent" : "temporary"}
      onClose={() => setIsSidebarOpen(false)}
      open={isSidebarOpen}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#1C1C1C",
          borderColor: "#343A40",
        },
      }}>
      {/* Blue "New Chat" Button */}
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Button
          onClick={clearCurrentChats}
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}>
          <AddIcon />
          New Chat
        </Button>
      </Box>

      <Box sx={{ flexGrow: 0.95 }} />

      {/* Bottom Section */}
      <Divider sx={{ backgroundColor: "#343A40" }} />
      <List>
        <ListItem>
          <Button
            onClick={signUserOut}
            sx={{
              color: "white",
              textTransform: "capitalize",
              width: "100%",
              textAlign: "start",
            }}>
            <ListItemIcon>
              <ExitToAppIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </Button>
        </ListItem>

        <ListItem>
          <Button
            onClick={openDeleteDialog}
            sx={{
              color: "white",
              textTransform: "capitalize",
              width: "100%",
              textAlign: "start",
            }}>
            <ListItemIcon>
              {signedInUser.photoURL ? (
                <img
                  className="w-6 h-6 rounded-full object-center object-cover"
                  src={signedInUser.photoURL}
                  alt={signedInUser.displayName || "User"}
                />
              ) : (
                <AccountCircleIcon sx={{ color: "white" }} />
              )}
            </ListItemIcon>

            <ListItemText primary="Delete Account" />
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
}
