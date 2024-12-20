import { Box, Stack } from "@mui/material";
import { MessagesContext } from "@/contexts/MessagesContext";
import { useContext } from "react";
import Loader from "./Loader";
import Markdown from "react-markdown";

export default function Messages() {
  const { messages } = useContext(MessagesContext);

  return (
    <Stack
      direction={"column"}
      spacing={2}
      sx={{
        overflow: "auto",
        padding: {
          xs: "0 0 40px 0",
          md: "0 100px 100px 100px",
          lg: "0 200px 100px 200px",
        },
      }}>
      <Stack
        direction={"column"}
        spacing={2}
        flexGrow={1}
        sx={{
          alignItems: "left",
        }}>
        {messages.map((message, index) => {
          const hasMessage = message.content;
          return (
            <Box
              key={`message-${index + 1}`}
              display="flex"
              justifyContent={
                message.role === "assistant" ? "flex-start" : "flex-end"
              }
              sx={{
                width: "100%",
                maxWidth: { sm: "90%" },
              }}>
              <Box
                bgcolor={
                  message.role === "assistant"
                    ? "primary.main"
                    : "secondary.main"
                }
                color="white"
                borderRadius="16px"
                padding={message.content ? "8px 16px" : "2px"}
                sx={{
                  maxWidth: "100%",
                }}>
                {hasMessage && <Markdown>{message.content}</Markdown>}
                {!hasMessage && <Loader />}
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
}
