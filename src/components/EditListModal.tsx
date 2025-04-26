'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  Typography,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useListStore } from '@/stores/listStore';
import { nanoid } from 'nanoid';

interface EditListModalProps {
  open: boolean;
  onClose: () => void;
  list: {
    id: string;
    name: string;
    columns: { id: string; name: string; cards: any[] }[];
  };
}

export default function EditListModal({ open, onClose, list }: EditListModalProps) {
  const [name, setName] = useState(list.name);
  const [columns, setColumns] = useState(list.columns.map((col) => ({ ...col })));
  const editList = useListStore((state) => state.editList);

  // Editar nome da coluna
  const handleColumnNameChange = (idx: number, value: string) => {
    setColumns((prev) => prev.map((col, i) => (i === idx ? { ...col, name: value } : col)));
  };

  // Adicionar coluna
  const handleAddColumn = () => {
    if (columns.length < 7) {
      setColumns((prev) => [
        ...prev,
        { id: nanoid(), name: '', cards: [] },
      ]);
    }
  };

  // Excluir coluna
  const handleRemoveColumn = (idx: number) => {
    if (
      columns.length > 1 &&
      columns[idx].cards.length === 0
    ) {
      setColumns((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  const handleSubmit = () => {
    if (name.trim() && columns.every((col) => col.name.trim())) {
      editList(list.id, name, columns);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Lista</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Nome da Lista"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Box mt={2}>
          <Typography variant="subtitle1" gutterBottom>
            Colunas
          </Typography>
          {columns.map((col, idx) => {
            const isLastColumn = columns.length === 1;
            const hasCards = col.cards.length > 0;
            const disableRemove = isLastColumn || hasCards;
            const tooltipMsg = isLastColumn
              ? 'Não é possível excluir a última coluna da lista.'
              : hasCards
                ? 'Só é possível excluir colunas vazias.'
                : '';

            return (
              <Box key={col.id} display="flex" alignItems="center" mb={1}>
                <TextField
                  label={`Nome da Coluna ${idx + 1}`}
                  value={col.name}
                  onChange={(e) => handleColumnNameChange(idx, e.target.value)}
                  fullWidth
                />
                <Tooltip title={disableRemove ? tooltipMsg : ''} arrow>
                  <span>
                    <IconButton
                      aria-label="remover coluna"
                      onClick={() => handleRemoveColumn(idx)}
                      disabled={disableRemove}
                      color="error"
                      sx={{ ml: 1 }}
                      size="small"
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Box>
            );
          })}
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddColumn}
            disabled={columns.length >= 7}
            sx={{ mt: 1 }}
          >
            Adicionar Coluna
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={
            !name.trim() ||
            columns.length < 1 ||
            columns.length > 7 ||
            columns.some((col) => !col.name.trim())
          }
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
