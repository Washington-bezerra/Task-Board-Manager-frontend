'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Box,
  Typography,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useListStore, CardFieldTemplate } from '@/stores/listStore';

interface CreateListModalProps {
  open: boolean;
  onClose: () => void;
}

const fieldTypes = [
  { value: 'text', label: 'Texto' },
  { value: 'number', label: 'Número' },
  { value: 'date', label: 'Data' },
  { value: 'currency', label: 'Monetário' },
];

export default function CreateListModal({ open, onClose }: CreateListModalProps) {
  const [name, setName] = useState('');
  const [columns, setColumns] = useState<string[]>(['']);
  const [cardTemplate, setCardTemplate] = useState<CardFieldTemplate[]>([]);
  const addList = useListStore((state) => state.addList);

  const handleColumnNameChange = (idx: number, value: string) => {
    setColumns((prev) => prev.map((col, i) => (i === idx ? value : col)));
  };

  const handleAddColumn = () => {
    if (columns.length < 7) setColumns((prev) => [...prev, '']);
  };

  const handleRemoveColumn = (idx: number) => {
    if (columns.length > 1) setColumns((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleTemplateChange = (idx: number, key: keyof CardFieldTemplate, value: any) => {
    setCardTemplate((prev) =>
      prev.map((f, i) => (i === idx ? { ...f, [key]: value } : f))
    );
  };

  const handleAddTemplateField = () => {
    setCardTemplate((prev) => [...prev, { name: '', type: 'text' }]);
  };

  const handleRemoveTemplateField = (idx: number) => {
    setCardTemplate((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = () => {
    if (
      name.trim() &&
      columns.length >= 1 &&
      columns.length <= 7 &&
      columns.every((col) => col.trim()) &&
      cardTemplate.length > 0 &&
      cardTemplate.every((f) => f.name.trim())
    ) {
      addList(name, columns, cardTemplate);
      setName('');
      setColumns(['']);
      setCardTemplate([]);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Criar Nova Lista</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
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
          {columns.map((col, idx) => (
            <Box key={idx} display="flex" alignItems="center" mb={1}>
              <TextField
                label={`Nome da Coluna ${idx + 1}`}
                value={col}
                onChange={(e) => handleColumnNameChange(idx, e.target.value)}
                fullWidth
              />
              <IconButton
                aria-label="remover coluna"
                onClick={() => handleRemoveColumn(idx)}
                disabled={columns.length === 1}
                color="error"
                sx={{ ml: 1 }}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddColumn}
            disabled={columns.length >= 7}
            sx={{ mt: 1 }}
          >
            Adicionar Coluna
          </Button>
        </Box>
        <Box mt={3}>
          <Typography variant="subtitle1" gutterBottom>
            Template de Campos do Card
          </Typography>
          {cardTemplate.map((field, idx) => (
            <Box key={idx} display="flex" alignItems="center" gap={1} mb={1}>
              <TextField
                label="Nome do Campo"
                value={field.name}
                onChange={(e) => handleTemplateChange(idx, 'name', e.target.value)}
                size="small"
              />
              <TextField
                select
                label="Tipo"
                value={field.type}
                onChange={(e) => handleTemplateChange(idx, 'type', e.target.value)}
                size="small"
                sx={{ minWidth: 100 }}
              >
                {fieldTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <IconButton
                aria-label="remover campo"
                onClick={() => handleRemoveTemplateField(idx)}
                color="error"
                size="small"
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddTemplateField}
            sx={{ mt: 1 }}
            size="small"
          >
            Adicionar Campo ao Card
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
            columns.some((col) => !col.trim()) ||
            cardTemplate.length === 0 ||
            cardTemplate.some((f) => !f.name.trim())
          }
        >
          Criar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
