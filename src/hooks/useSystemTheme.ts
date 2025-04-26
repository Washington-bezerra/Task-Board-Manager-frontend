'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/stores/themeStore';

export function useSystemTheme() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const setMode = useThemeStore.getState().setMode;
      setMode(mq.matches ? 'dark' : 'light');
      const listener = (e: MediaQueryListEvent) => setMode(e.matches ? 'dark' : 'light');
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    }
  }, []);
}
