'use client';

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function SignInPage() {
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      window.location.href = "/";
    }
  }, [status]);

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="background.default"
    >
      <Paper sx={{ p: 4, borderRadius: 3, minWidth: 320, textAlign: 'center' }}>
        <Typography variant="h5" mb={3}>
          Faça login para acessar o Let
        </Typography>
        <Button
          fullWidth
          variant="contained"
          startIcon={<GoogleIcon />}
          sx={{ mb: 2 }}
          onClick={() => signIn("google")}
        >
          Entrar com Google
        </Button>
        <Button
          fullWidth
          variant="contained"
          startIcon={<GitHubIcon />}
          onClick={() => signIn("github")}
        >
          Entrar com GitHub
        </Button>
      </Paper>
    </Box>
  );
}
