import { Box, TextField, IconButton, InputAdornment } from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import { useContext } from "react";
import { MessagesContext } from "@/contexts/MessagesContext";

export default function SearchField() {
  const { sendMessage, setMessage, message } = useContext(MessagesContext);

  return (
    <Box
      sx={{
        position: "fixed",
        right: 0,
        width: "calc((100%) - 240px)",
        bottom: "0",
        padding: "0 200px 40px 200px",
        backgroundColor: "#FFFFFF",
      }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{
          borderRadius: 1,
          "& .MuiOutlinedInput-root": {
            borderRadius: 4.5,
            bgcolor: "#F2F3F4",
            "& input": {
              color: "#1C1C1C",
            },
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                id="send-btn"
                edge="end"
                color="primary"
                onClick={sendMessage}
                aria-label="Send message">
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
