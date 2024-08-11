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
  Tooltip
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from '@mui/icons-material/Menu';
import Messages from "@/components/Messages";
import SendIcon from '@mui/icons-material/Send';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddIcon from '@mui/icons-material/Add';
import { useMessage } from "@/hooks/useMessage"; // Adjust the import path as needed
import { useState } from 'react';

export default function Home() {
  const drawerWidth = 240;
  const { message, setMessage, sendMessage } = useMessage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is small
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSendMessage = () => {
    sendMessage(); // This will trigger the sendMessage function from context
  };

  const drawerContent = (
    <>
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        {isMobile ? (
          <Tooltip title="New Chat">
            <IconButton color="primary">
              <AddIcon />
            </IconButton>
          </Tooltip>
        ) : (
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
        )}
      </Box>
  
      <List sx={{ flexGrow: 1 }}>
        <ListItem button sx={{ display: "flex", justifyContent: "center" }}>
          {isMobile ? (
            <Tooltip title="New Chat">
              <IconButton sx={{ color: "black" }}>
                <DescriptionIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <>
              <ListItemIcon sx={{ color: "black" }}>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="New Chat" />
            </>
          )}
        </ListItem>
      </List>
  
      <Divider />
  
      <List sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 2 }}>
        <ListItem button sx={{ display: "flex", justifyContent: "center" }}>
          {isMobile ? (
            <Tooltip title="Account">
              <IconButton sx={{ color: "black" }}>
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <>
              <ListItemIcon sx={{ color: "black" }}>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </>
          )}
        </ListItem>
  
        <ListItem button sx={{ display: "flex", justifyContent: "center" }}>
          {isMobile ? (
            <Tooltip title="Sign Out">
              <IconButton sx={{ color: "black" }}>
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <>
              <ListItemIcon sx={{ color: "black" }}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </>
          )}
        </ListItem>
      </List>
    </>
  );
  

  return (
    <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
      {/* Mobile Menu Button */}
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ position: 'absolute', top: 8, left: 12 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Sidebar Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"} // Toggle between permanent and temporary drawer
        open={!isMobile || mobileOpen}
        onClose={handleDrawerToggle}
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
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: isMobile ? 2 : 3 }}>
        <Container>
          {/* New Section with Logo and "Ask a Question" */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: 2, 
              mt: isMobile ? 5 : 20, 
              mb: isMobile ? 8 : 12 
            }}>
              <img src="/images/logo.jpg" alt="Supportly Logo" style={{ width: 50, height: 50 }} />
              <Typography variant={isMobile ? "h5" : "h4"}>SUPPORTLY</Typography>
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
