"use client"

import Messages from "@/components/Messages"
import { AppContext } from "@/contexts/AppContext"
import { Container, Typography, CircularProgress } from "@mui/material"
import { useContext } from "react"
  
export default function Home() {
  const { signedInUser } = useContext(AppContext)

  if (!signedInUser) {
    return <div className="fixed h-fit w-fit inset-0 m-auto flex flex-col items-center gap-3">
      <CircularProgress />
      <Typography sx={{ fontWeight: 500 }}>Verifying your authentication...</Typography>
    </div>
  }

  return (
    <Container>
      <Messages />
    </Container>
  );
}
