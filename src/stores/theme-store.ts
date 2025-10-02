import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeState } from '@/types';

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme: ThemeState['theme']) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
);