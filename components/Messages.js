import { Box, Stack, Typography } from "@mui/material";
import { MessagesContext } from "@/contexts/MessagesContext";
import { Fragment, useContext } from "react";
import Loader from "./Loader";

export default function Messages() {
  const { messages } = useContext(MessagesContext);

  return (
    <Stack
      direction={"column"}
      width="100%"
      padding="0 200px 100px 200px"
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{
        overflow: "auto",
      }}>
      <Stack
        direction={"column"}
        spacing={2}
        flexGrow={1}
        overflow="auto"
        sx={{
          width: "100%",
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
                maxWidth: "90%",
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
                {hasMessage &&
                  message.content.split(/\d+\.\s*/).map((sentence, index) => (
                    <Fragment key={`message-${index + 1}`}>
                      {index !== 0 && <br />}
                      <Typography>{sentence}</Typography>
                    </Fragment>
                  ))}

                {!hasMessage && <Loader />}
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
}