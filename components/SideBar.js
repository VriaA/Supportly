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
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddIcon from "@mui/icons-material/Add";
import { MessagesContext } from "@/contexts/MessagesContext";
import { useContext } from "react";
import welcomMessage from "@/libs/welcomMessage";
import { AppContext } from "@/contexts/AppContext";
import { auth } from "@/libs/firebase";
import { signOut } from "firebase/auth";

export default function SideBar({ openDeleteDialog }) {
  const drawerWidth = 240;
  const { setMessages, setMessage } = useContext(MessagesContext);
  const { openDialog, setDialog, setLoading, signedInUser } =
    useContext(AppContext);

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
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
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
      <Divider />
      <List>
        <ListItem>
          <Button
            onClick={signUserOut}
            sx={{
              color: "black",
              textTransform: "capitalize",
              width: "100%",
              textAlign: "start",
            }}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </Button>
        </ListItem>

        <ListItem>
          <Button
            onClick={openDeleteDialog}
            sx={{
              color: "black",
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
                <AccountCircleIcon />
              )}
            </ListItemIcon>

            <ListItemText primary="Delete Account" />
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
}
