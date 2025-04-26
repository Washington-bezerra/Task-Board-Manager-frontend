import { create } from 'zustand';
import { nanoid } from 'nanoid';

export interface CardField {
  name: string;
  type: 'text' | 'number' | 'date' | 'currency'; // pode expandir depois
  value: any;
}

export interface CardFieldTemplate {
  name: string;
  type: 'text' | 'number' | 'date' | 'currency';
}

export interface Card {
  id: string;
  name: string;
  fields: { name: string; type: string; value: any }[];
}

export interface List {
  id: string;
  name: string;
  columns: {
    id: string;
    name: string;
    cards: Card[];
  }[];
  cardTemplate: CardFieldTemplate[];
  isExpanded: boolean;
}

interface ListStore {
  lists: List[];
  addList: (name: string, columns: string[], cardTemplate: CardFieldTemplate[]) => void;
  addCard: (listId: string, columnId: string, card: Omit<Card, 'id'>) => void;
  toggleListExpansion: (id: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
  moveCard: (listId: string, fromColumnId: string, cardId: string, toColumnId: string) => void;
  editCard: (listId: string, colId: string, cardId: string, newCard: Partial<Card>) => void;
  deleteCard: (listId: string, colId: string, cardId: string) => void;
  editList: (
    listId: string,
    newName: string,
    newColumns: {
      id: string;
      name: string;
      cards: Card[];
    }[]
  ) => void;
  deleteList: (listId: string) => void;
}

export const useListStore = create<ListStore>((set) => ({
  lists: [],
  addList: (name, columns, cardTemplate) =>
    set((state) => ({
      lists: [
        ...state.lists,
        {
          id: nanoid(),
          name,
          columns: columns.map((col) => ({
            id: nanoid(),
            name: col,
            cards: [],
          })),
          cardTemplate,
          isExpanded: true,
        },
      ],
    })),
  addCard: (listId, columnId, card) =>
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              columns: list.columns.map((col) =>
                col.id === columnId
                  ? {
                      ...col,
                      cards: [
                        ...col.cards,
                        { ...card, id: nanoid() },
                      ],
                    }
                  : col
              ),
            }
          : list
      ),
    })),
  toggleListExpansion: (id) =>
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === id ? { ...list, isExpanded: !list.isExpanded } : list
      ),
    })),
  expandAll: () =>
    set((state) => ({
      lists: state.lists.map((list) => ({ ...list, isExpanded: true })),
    })),
  collapseAll: () =>
    set((state) => ({
      lists: state.lists.map((list) => ({ ...list, isExpanded: false })),
    })),
  moveCard: (listId, fromColumnId, cardId, toColumnId) =>
    set((state) => ({
      lists: state.lists.map((list) => {
        if (list.id !== listId) return list;
        // Encontra as colunas
        const fromColIdx = list.columns.findIndex((col) => col.id === fromColumnId);
        const toColIdx = list.columns.findIndex((col) => col.id === toColumnId);
        if (fromColIdx === -1 || toColIdx === -1) return list;
        // Remove o card da coluna de origem
        const cardIdx = list.columns[fromColIdx].cards.findIndex((c) => c.id === cardId);
        if (cardIdx === -1) return list;
        const [card] = list.columns[fromColIdx].cards.splice(cardIdx, 1);
        // Adiciona o card na coluna de destino
        list.columns[toColIdx].cards.push(card);
        return { ...list, columns: [...list.columns] };
      }),
    })),
  editCard: (listId, colId, cardId, newCard) =>
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              columns: list.columns.map((col) =>
                col.id === colId
                  ? {
                      ...col,
                      cards: col.cards.map((c) =>
                        c.id === cardId ? { ...c, ...newCard } : c
                      ),
                    }
                  : col
              ),
            }
          : list
      ),
    })),
  deleteCard: (listId, colId, cardId) =>
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              columns: list.columns.map((col) =>
                col.id === colId
                  ? { ...col, cards: col.cards.filter((c) => c.id !== cardId) }
                  : col
              ),
            }
          : list
      ),
    })),
  editList: (
    listId: string,
    newName: string,
    newColumns: {
      id: string;
      name: string;
      cards: Card[];
    }[]
  ) =>
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              name: newName,
              columns: newColumns,
            }
          : list
      ),
    })),
  deleteList: (listId) =>
    set((state) => ({
      lists: state.lists.filter((list) => list.id !== listId),
    })),
})); 