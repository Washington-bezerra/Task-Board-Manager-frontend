import { create } from 'zustand';

interface ThemeStore {
  mode: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark') => void;
  toggleMode: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  mode: 'light',
  setMode: (mode) => set({ mode }),
  toggleMode: () =>
    set((state) => ({
      mode: state.mode === 'light' ? 'dark' : 'light',
    })),
}));
