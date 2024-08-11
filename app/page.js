'use client';

import {
  Container,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  IconButton,
  Divider,
  Button,
  InputAdornment,
  Typography,
  useMediaQuery,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from '@mui/icons-material/Menu';
import SendIcon from '@mui/icons-material/Send';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddIcon from '@mui/icons-material/Add';
import { useMessage } from "@/hooks/useMessage"; // Adjust the import path as needed
import { useState, useContext } from 'react';
import { MessagesContextProvider } from "@/contexts/MessagesContext";
import SearchField from "@/components/SearchField";
import SideBar from "@/components/SideBar";
import Header from "@/components/Header";
import Messages from "@/components/Messages";
import { AppContext } from "@/contexts/AppContext";

export default function Home() {
  const drawerWidth = 240;
  const { message, setMessage, sendMessage } = useMessage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is small
  const [mobileOpen, setMobileOpen] = useState(false);

  const { signedInUser } = useContext(AppContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSendMessage = () => {
    sendMessage(); // This will trigger the sendMessage function from context
  };

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

  const drawerContent = (
    <>
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <AddIcon />
          New Chat
        </Button>
      </Box>

      <List>
        <ListItem button>
          <ListItemIcon sx={{ color: "white" }}>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="New Chat" sx={{ color: 'white' }} />
        </ListItem>
      </List>

      <Box sx={{ flexGrow: 0.95 }} />

      <Divider sx={{ backgroundColor: 'white' }} />
      <List>
        <ListItem button>
          <ListItemIcon sx={{ color: "white" }}>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Account" sx={{ color: 'white' }} />
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{ color: "white" }}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out" sx={{ color: 'white' }} />
        </ListItem>
      </List>
    </>
  );

  return (
    <Box sx={{
      display: "flex",
      minHeight: "100svh",
      overflow: "hidden",
      bgcolor: '#1C1C1C',
      color: 'white', // Set default text color to white
    }}>
      {/* Sidebar Drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              bgcolor: '#1C1C1C',
              color: 'white',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <SideBar />
      )}

      {/* Main Content */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          flexGrow: 1,
          padding: isMobile ? '0 16px' : "20svh 0 40px",
        }}>
        {/* Header */}
        <Header />

        {/* Messages & Search Field */}
        <Box component="main" sx={{ flexGrow: 1, p: isMobile ? 2 : 3 }}>
          <Container>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                mt: isMobile ? 5 : 20,
                mb: isMobile ? 8 : 12
              }}>
                <img src="/images/logo.png" alt="Supportly Logo" style={{ width: 50, height: 50 }} />
                <Typography variant={isMobile ? "h5" : "h4"}>SUPPORTLY</Typography>
              </Box>
            </Box>
            <MessagesContextProvider>
              <Messages />
              <SearchField />
            </MessagesContextProvider>
            <Box sx={{ display: 'flex', mt: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 4.5,
                    bgcolor: '#F2F3F4',
                    '& input': {
                      color: '#1C1C1C',
                    },
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        color="primary"
                        onClick={handleSendMessage}
                        aria-label="Send message"
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
