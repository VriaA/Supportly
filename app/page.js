'use client'

import { Container, Box, Drawer, List, ListItem, ListItemText, ListItemIcon, TextField, IconButton, Divider, Button, InputAdornment, Typography } from "@mui/material";
import Messages from "@/components/Messages";
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ChatIcon from '@mui/icons-material/Chat';
import DescriptionIcon from '@mui/icons-material/Description';
import CreateIcon from '@mui/icons-material/Create';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddIcon from '@mui/icons-material/Add';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; // Example icon for "Ask a Question"
import { useState } from "react";

export default function Home() {
  const drawerWidth = 240;
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Message sent:", message);
      setMessage("");  // Clear the text field after sending the message
      // Add further message sending logic here
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {/* Blue "New Chat" Button */}
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

        {/* Navigation Items */}
        <List>
          <ListItem button>
            <ListItemIcon sx={{ color: "black" }}>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Ask a question" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: "black" }}>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="An Essay on Modern Design" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: "black" }}>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="New Chat" />
          </ListItem>
        </List>

        <Box sx={{ flexGrow: 0.95 }} />

        {/* Bottom Section */}
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon sx={{ color: "black" }}>
              <ClearAllIcon />
            </ListItemIcon>
            <ListItemText primary="Clear Chats" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: "black" }}>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: "black" }}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <Container>

          {/* New Section with Logo and "Ask a Question" */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mt: 4, mb: 4 }}>
              <img src="/images/Icon.png" alt="Supportly Logo" style={{ width: 50, height: 50 }} />
              <Typography variant="h4">SUPPORTLY</Typography>
            </Box>
          </Box>

          {/* Messages Component */}
          <Messages />

          {/* Input Area */}
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
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton edge="start" color="primary">
                      <AttachFileIcon />
                    </IconButton>
                    <IconButton edge="start" color="primary">
                      <MicIcon />
                    </IconButton>
                  </InputAdornment>
                ),
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
  );
}
