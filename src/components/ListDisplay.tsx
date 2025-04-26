'use client';

import { Box, Card, CardContent, Typography, IconButton, Collapse, Button, Stack, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useListStore } from '@/stores/listStore';
import { useTheme } from '@mui/material/styles';
import AddCardModal from '@/components/AddCardModal';
import { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import EditListModal from '@/components/EditListModal';

interface ListDisplayProps {
  onCreateList: () => void;
  selectedListId?: string | null;
}

export default function ListDisplay({ onCreateList, selectedListId }: ListDisplayProps) {
  const lists = useListStore((state) => state.lists);
  const toggleListExpansion = useListStore((state) => state.toggleListExpansion);
  const expandAll = useListStore((state) => state.expandAll);
  const collapseAll = useListStore((state) => state.collapseAll);
  const addCard = useListStore((state) => state.addCard);
  const setLists = useListStore.setState;
  const theme = useTheme();
  const [addCardModal, setAddCardModal] = useState<{ open: boolean; listId: string; columnId: string } | null>(null);
  const moveCard = useListStore((state) => state.moveCard);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuCard, setMenuCard] = useState<{ listId: string; colId: string; cardId: string } | null>(null);
  const [listMenuAnchorEl, setListMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [listMenuId, setListMenuId] = useState<string | null>(null);
  const deleteCard = useListStore((state) => state.deleteCard);
  const [editCardModal, setEditCardModal] = useState<{
    open: boolean;
    listId: string;
    columnId: string;
    card: Card;
    template: CardFieldTemplate[];
  } | null>(null);
  const editCard = useListStore((state) => state.editCard);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    listId: string;
    colId: string;
    cardId: string;
  } | null>(null);
  const [editListModal, setEditListModal] = useState<{ open: boolean; list: any } | null>(null);
  const [deleteListDialog, setDeleteListDialog] = useState<{ open: boolean; listId: string } | null>(null);
  const deleteList = useListStore((state) => state.deleteList);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    listId: string,
    colId: string,
    cardId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuCard({ listId, colId, cardId });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuCard(null);
  };

  const filteredLists = selectedListId
    ? lists.filter((l) => l.id === selectedListId)
    : lists;

  if (filteredLists.length === 0) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="40vh"
        gap={2}
      >
        <PlaylistAddIcon sx={{ fontSize: 60, color: 'primary.main', mb: 1 }} />
        <Typography variant="h6" color="text.secondary" align="center">
          Nenhuma lista criada ainda.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<PlaylistAddIcon />}
          onClick={onCreateList}
          sx={{ borderRadius: 3, fontWeight: 700 }}
        >
          Criar sua primeira lista
        </Button>
      </Box>
    );
  }

  return (
    <Box mt={4}>
      {!selectedListId && (
        <Stack direction="row" spacing={2} mb={2}>
          <Button variant="outlined" onClick={expandAll}>
            Expandir todas
          </Button>
          <Button variant="outlined" onClick={collapseAll}>
            Encolher todas
          </Button>
        </Stack>
      )}
      {filteredLists.map((list) => {
        const colCount = list.columns.length;
        const isProportional = colCount <= 4;
        const colWidth = isProportional ? `${100 / colCount}%` : '260px';

        return (
          <Paper key={list.id} sx={{ mb: 2, p: 2, overflowX: 'auto', width: '100%' }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ cursor: 'pointer', userSelect: 'none', px: 1, py: 0.5 }}
              onClick={() => toggleListExpansion(list.id)}
            >
              <Typography variant="h6">{list.name}</Typography>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setListMenuAnchorEl(e.currentTarget);
                  setListMenuId(list.id);
                }}
                size="small"
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Box>
            <Collapse in={list.isExpanded}>
              <Box sx={{ width: '100%', overflowX: 'auto', pb: 2 }}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    minWidth: list.columns.length <= 4
                      ? '100%'
                      : `${list.columns.length * 260 + (list.columns.length - 1) * 16}px`,
                    width: list.columns.length <= 4 ? '100%' : 'fit-content',
                  }}
                >
                  {list.columns.map((col, colIdx) => (
                    <Paper
                      key={col.id}
                      sx={{
                        width: list.columns.length <= 4 ? `${100 / list.columns.length}%` : '260px',
                        minWidth: list.columns.length <= 4 ? `${100 / list.columns.length}%` : '260px',
                        maxWidth: list.columns.length <= 4 ? `${100 / list.columns.length}%` : '320px',
                        p: 2,
                        flex: list.columns.length <= 4 ? 1 : '0 0 auto',
                        background: (theme) => theme.palette.background.paper,
                        color: (theme) => theme.palette.text.primary,
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        minHeight: 120,
                        boxSizing: 'border-box',
                        transition: 'width 0.2s',
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        {col.name}
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ mb: 1 }}
                        onClick={() =>
                          setAddCardModal({
                            open: true,
                            listId: list.id,
                            columnId: col.id,
                          })
                        }
                      >
                        + Adicionar Card
                      </Button>
                      {col.cards.map((card) => (
                        <Box
                          key={card.id}
                          sx={{
                            mb: 1.5,
                            p: 2,
                            borderRadius: 2,
                            bgcolor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(255,255,255,0.04)'
                                : 'rgba(0,0,0,0.03)',
                            border: (theme) =>
                              theme.palette.mode === 'dark'
                                ? '1px solid #23262f'
                                : '1px solid #e0e0e0',
                            boxShadow: 1,
                            minHeight: 64,
                            transition: 'box-shadow 0.2s',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            maxWidth: '100%',
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                            position: 'relative',
                          }}
                        >
                          <Box
                            display="flex"
                            alignItems="flex-start"
                            justifyContent="space-between"
                            sx={{ mb: 1 }}
                          >
                            <Box display="flex" alignItems="center" gap={0.5}>
                              {colIdx > 0 && (
                                <IconButton
                                  size="small"
                                  sx={{ p: 0.5 }}
                                  onClick={() =>
                                    moveCard(list.id, col.id, card.id, list.columns[colIdx - 1].id)
                                  }
                                >
                                  <ArrowBackIosNewIcon fontSize="inherit" />
                                </IconButton>
                              )}
                              {colIdx < list.columns.length - 1 && (
                                <IconButton
                                  size="small"
                                  sx={{ p: 0.5 }}
                                  onClick={() =>
                                    moveCard(list.id, col.id, card.id, list.columns[colIdx + 1].id)
                                  }
                                >
                                  <ArrowForwardIosIcon fontSize="inherit" />
                                </IconButton>
                              )}
                            </Box>
                            <IconButton
                              size="small"
                              sx={{ p: 0.5 }}
                              onClick={(e) =>
                                handleMenuOpen(e, list.id, col.id, card.id)
                              }
                            >
                              <MoreVertIcon fontSize="inherit" />
                            </IconButton>
                          </Box>
                          <Box flex={1} sx={{ minWidth: 0 }}>
                            <Typography
                              fontWeight={600}
                              fontSize="1rem"
                              sx={{
                                mb: 0.5,
                                wordBreak: 'break-word',
                                overflowWrap: 'break-word',
                                whiteSpace: 'pre-line',
                                maxWidth: '100%',
                              }}
                            >
                              {card.name}
                            </Typography>
                            {card.fields.map((field, i) => (
                              <Typography
                                key={i}
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  fontSize: '0.92rem',
                                  pl: 0.5,
                                  pr: 0.5,
                                  wordBreak: 'break-word',
                                  overflowWrap: 'break-word',
                                  whiteSpace: 'pre-line',
                                  maxWidth: '100%',
                                }}
                              >
                                <strong>{field.name}:</strong> {String(field.value)}
                              </Typography>
                            ))}
                          </Box>
                        </Box>
                      ))}
                      {addCardModal?.open &&
                        addCardModal.listId === list.id &&
                        addCardModal.columnId === col.id && (
                          <AddCardModal
                            open={addCardModal.open}
                            onClose={() => setAddCardModal(null)}
                            template={list.cardTemplate}
                            onAdd={(card) => {
                              addCard(list.id, col.id, card);
                              setAddCardModal(null);
                            }}
                          />
                        )}
                    </Paper>
                  ))}
                </Stack>
              </Box>
            </Collapse>
            <Menu
              anchorEl={listMenuAnchorEl}
              open={Boolean(listMenuAnchorEl) && listMenuId === list.id}
              onClose={() => setListMenuAnchorEl(null)}
            >
              <MenuItem
                onClick={() => {
                  setEditListModal({ open: true, list });
                  setListMenuAnchorEl(null);
                }}
              >
                Editar lista
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setDeleteListDialog({ open: true, listId: list.id });
                  setListMenuAnchorEl(null);
                }}
                sx={{ color: 'error.main' }}
              >
                Excluir lista
              </MenuItem>
            </Menu>
          </Paper>
        );
      })}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {menuCard &&
          lists
            .find((l) => l.id === menuCard.listId)
            ?.columns
            .filter((c) => c.id !== menuCard.colId)
            .map((c) => (
              <MenuItem
                key={c.id}
                onClick={() => {
                  moveCard(menuCard.listId, menuCard.colId, menuCard.cardId, c.id);
                  handleMenuClose();
                }}
              >
                Mover para: {c.name}
              </MenuItem>
            ))}
        <MenuItem
          onClick={() => {
            const list = lists.find((l) => l.id === menuCard.listId);
            const col = list?.columns.find((c) => c.id === menuCard.colId);
            const card = col?.cards.find((c) => c.id === menuCard.cardId);
            if (card && list) {
              setEditCardModal({
                open: true,
                listId: menuCard.listId,
                columnId: menuCard.colId,
                card,
                template: list.cardTemplate,
              });
            }
            handleMenuClose();
          }}
        >
          Editar
        </MenuItem>
        <MenuItem
          onClick={() => {
            setDeleteDialog({
              open: true,
              listId: menuCard.listId,
              colId: menuCard.colId,
              cardId: menuCard.cardId,
            });
            handleMenuClose();
          }}
          sx={{ color: 'error.main' }}
        >
          Excluir
        </MenuItem>
      </Menu>
      {editCardModal?.open && (
        <AddCardModal
          open={editCardModal.open}
          onClose={() => setEditCardModal(null)}
          template={editCardModal.template}
          initialData={editCardModal.card}
          onAdd={(newCard) => {
            editCard(editCardModal.listId, editCardModal.columnId, editCardModal.card.id, newCard);
            setEditCardModal(null);
          }}
          isEdit
        />
      )}
      <Dialog
        open={!!deleteDialog}
        onClose={() => setDeleteDialog(null)}
      >
        <DialogTitle>Excluir Card</DialogTitle>
        <DialogContent>
          Tem certeza que deseja excluir este card? Esta ação não pode ser desfeita.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(null)}>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              if (deleteDialog) {
                deleteCard(deleteDialog.listId, deleteDialog.colId, deleteDialog.cardId);
                setDeleteDialog(null);
              }
            }}
            color="error"
            variant="contained"
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
      {editListModal?.open && (
        <EditListModal
          open={editListModal.open}
          onClose={() => setEditListModal(null)}
          list={editListModal.list}
        />
      )}
      <Dialog
        open={!!deleteListDialog}
        onClose={() => setDeleteListDialog(null)}
      >
        <DialogTitle>Excluir Lista</DialogTitle>
        <DialogContent>
          Tem certeza que deseja excluir esta lista? Esta ação não pode ser desfeita.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteListDialog(null)}>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              if (deleteListDialog) {
                deleteList(deleteListDialog.listId);
                setDeleteListDialog(null);
              }
            }}
            color="error"
            variant="contained"
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
