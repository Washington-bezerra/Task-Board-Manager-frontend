'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from '@/styles/theme';
import { useThemeStore } from '@/stores/themeStore';
import { useSystemTheme } from '@/hooks/useSystemTheme';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  useSystemTheme(); // Sincroniza com o sistema
  const mode = useThemeStore((state) => state.mode);

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
} 