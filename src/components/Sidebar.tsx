'use client';

import { Box, Drawer, List, ListItemButton, ListItemText, Typography, IconButton } from '@mui/material';
import { useListStore } from '@/stores/listStore';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

interface SidebarProps {
  selectedListId: string | null;
  onSelectList: (listId: string | null) => void;
}

export default function Sidebar({ selectedListId, onSelectList }: SidebarProps) {
  const lists = useListStore((state) => state.lists);
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: 'fixed',
            top: 24,
            left: 24,
            zIndex: 1400,
            bgcolor: 'background.paper',
            boxShadow: 2,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Listas
          </Typography>
          <List>
            <ListItemButton
              selected={selectedListId === null}
              onClick={() => {
                onSelectList(null);
                setOpen(false);
              }}
            >
              <ListItemText primary="Todas as listas" />
            </ListItemButton>
            {lists.map((list) => (
              <ListItemButton
                key={list.id}
                selected={selectedListId === list.id}
                onClick={() => {
                  onSelectList(list.id);
                  setOpen(false);
                }}
              >
                <ListItemText primary={list.name} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
