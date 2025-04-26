'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { CardFieldTemplate } from '@/stores/listStore';

interface AddCardModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (card: { name: string; fields: { name: string; type: string; value: any }[] }) => void;
  template: CardFieldTemplate[];
  initialData?: Card;
  isEdit?: boolean;
}

const fieldTypes = [
  { value: 'text', label: 'Texto' },
  { value: 'number', label: 'Número' },
  { value: 'date', label: 'Data' },
  { value: 'currency', label: 'Monetário' },
];

export default function AddCardModal({ open, onClose, onAdd, template, initialData, isEdit }: AddCardModalProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [fields, setFields] = useState(
    initialData
      ? initialData.fields
      : template.map((f) => ({ ...f, value: '' }))
  );

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setFields(initialData.fields);
    } else {
      setName('');
      setFields(template.map((f) => ({ ...f, value: '' })));
    }
  }, [initialData, template]);

  const handleFieldValueChange = (idx: number, value: any) => {
    setFields((prev) =>
      prev.map((f, i) => (i === idx ? { ...f, value } : f))
    );
  };

  const handleSubmit = () => {
    if (name.trim()) {
      onAdd({ name, fields });
      setName('');
      setFields(template.map((f) => ({ ...f, value: '' })));
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Novo Card</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nome do Card"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Box mt={2}>
          <Typography variant="subtitle1" gutterBottom>
            Campos do Card
          </Typography>
          {fields.map((field, idx) => (
            <TextField
              key={idx}
              label={field.name}
              type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
              value={field.value}
              onChange={(e) => handleFieldValueChange(idx, e.target.value)}
              fullWidth
              margin="dense"
              InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={!name.trim()}
        >
          {isEdit ? 'Salvar' : 'Criar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
