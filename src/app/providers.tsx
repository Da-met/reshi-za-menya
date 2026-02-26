'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useThemeStore } from '../stores/theme-store';
import { Toaster } from 'sonner';
import { KeycloakProvider } from './providers/KeycloakProvider'; // Добавляем импорт

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'night', 'sky');
    root.classList.add(theme);    
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <KeycloakProvider> {/* Оборачиваем в KeycloakProvider */}
        {children}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 5000,
            classNames: {
              toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
              description: 'group-[.toast]:text-muted-foreground',
              actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
              cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
            },
          }}
        />
      </KeycloakProvider>
    </QueryClientProvider>
  );
}