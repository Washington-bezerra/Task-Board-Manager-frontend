'use client';

import { useState } from 'react';
import { Box, Button, Container, Typography, IconButton, AppBar, Toolbar, Stack } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CreateListModal from '@/components/CreateListModal';
import ListDisplay from '@/components/ListDisplay';
import { useThemeStore } from '@/stores/themeStore';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  const [open, setOpen] = useState(false);
  const mode = useThemeStore((state) => state.mode);
  const toggleMode = useThemeStore((state) => state.toggleMode);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);

  return (
    <>
      <Sidebar selectedListId={selectedListId} onSelectList={setSelectedListId} />
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: { xs: 1, md: 2 },
            py: 2,
            mb: 2,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          {/* Esquerda vazia para balancear */}
          <Box sx={{ width: 160 }} />
          {/* Centro */}
          <Box sx={{ textAlign: 'center', flex: 1 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 800,
                letterSpacing: '-1px',
                color: 'primary.main',
                mb: 0.5,
              }}
            >
              Let <span style={{ color: '#e25555' }}>♥</span>
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontWeight: 500, fontSize: { xs: '1rem', md: '1.25rem' } }}
            >
              Task Board Manager
            </Typography>
          </Box>
          {/* Direita: botões */}
          <Stack direction="row" spacing={1} sx={{ minWidth: 160, justifyContent: 'flex-end' }}>
            <IconButton onClick={toggleMode} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              sx={{ borderRadius: 3, fontWeight: 700, minWidth: 120 }}
              onClick={() => setOpen(true)}
            >
              Criar Lista
            </Button>
          </Stack>
        </Box>
        <Container maxWidth={false} sx={{ px: { xs: 1, md: 4 }, maxWidth: '1600px !important' }}>
          <CreateListModal open={open} onClose={() => setOpen(false)} />
          <ListDisplay
            onCreateList={() => setOpen(true)}
            selectedListId={selectedListId}
          />
        </Container>
      </Box>
    </>
  );
}
