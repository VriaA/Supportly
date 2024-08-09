"use client";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import useMessage from "@/hooks/useMessage";
import { Fragment } from "react";
export default function Messages() {
  const { setMessage, sendMessage, messages, message } = useMessage();

  return (
    <Stack
      direction={"column"}
      width="500px"
      height="85svh"
      p={2}
      spacing={3}
    >
      <Stack
        direction={"column"}
        spacing={2}
        flexGrow={1}
        overflow="auto"
        maxHeight="100%"
      >
        {messages.map((message, index) => (
          <Box
            key={`message-${index + 1}`}
            display="flex"
            justifyContent={
              message.role === "assistant" ? "flex-start" : "flex-end"
            }
          >
            <Box
              bgcolor={
                message.role === "assistant" ? "primary.main" : "secondary.main"
              }
              color="white"
              borderRadius="16px"
              padding="8px 16px"
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
