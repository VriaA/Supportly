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
        width: { xs: "100%", md: "calc((100%) - 240px)" },
        bottom: "0",
        padding: {
          xs: "0 20px 20px 20px",
          sm: "0 40px 20px 40px",
          md: "0 100px 40px 100px",
          lg: "0 200px 40px 200px",
        },
        backgroundColor: "#1C1C1C",
      }}>
      <form onSubmit={sendMessage}>
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
              bgcolor: "#1C1C1C",
              "& input": {
                color: "#F2F3F4",
              },
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="submit"
                  id="send-btn"
                  edge="end"
                  color="primary"
                  aria-label="Send message">
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Box>
  );
}
