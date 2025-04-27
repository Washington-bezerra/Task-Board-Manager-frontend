'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { Button, Box, Avatar, Typography } from "@mui/material";

export default function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  if (session) {
    return (
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar src={session.user?.image || undefined} />
        <Typography>{session.user?.name}</Typography>
        <Button variant="outlined" onClick={() => signOut()}>
          Sair
        </Button>
      </Box>
    );
  }

  return (
    <Box display="flex" gap={2}>
      <Button variant="contained" onClick={() => signIn("google")}>
        Entrar com Google
      </Button>
      <Button variant="contained" onClick={() => signIn("github")}>
        Entrar com GitHub
      </Button>
    </Box>
  );
}
