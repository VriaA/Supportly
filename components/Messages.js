import { Box, Stack, Typography } from "@mui/material";
import { useMessage } from "@/hooks/useMessage"; // Update import path if needed
import { Fragment } from "react";

export default function Messages() {
  const { messages } = useMessage();

  return (
    <Stack
      direction={"column"}
      width="100%"  // Adjust to fit the container or use a maxWidth
      height="55svh"
      p={2}
      spacing={2}
      justifyContent="center"  // Center messages vertically
      alignItems="center"  // Center messages horizontally
      sx={{
        overflow: 'hidden',  // Hide overflow to control scroll behavior
      }}
    >
      <Stack
        direction={"column"}
        spacing={2}
        flexGrow={1}
        overflow="auto"
        sx={{
          width: '100%',  // Ensure the scroll area takes the full width
          alignItems: 'left',  // Center align the messages horizontally
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={`message-${index + 1}`}
            display="flex"
            justifyContent={message.role === "assistant" ? "flex-start" : "flex-end"}
            sx={{
              width: '100%',  // Ensure each message takes the full width
              maxWidth: '90%',  // Adjust this value as needed for your design
            }}
          >
            <Box
              bgcolor={message.role === "assistant" ? "primary.main" : "secondary.main"}
              color="white"
              borderRadius="16px"
              padding="8px 16px"
              sx={{
                maxWidth: '100%',  // Ensure messages don’t exceed container width
              }}
            >
              {message.content.split(/\d+\.\s*/).map((sentence, index) => (
                <Fragment key={`message-${index + 1}`}>
                  {index !== 0 && <br />}
                  <Typography>{sentence}</Typography>
                </Fragment>
              ))}
            </Box>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
