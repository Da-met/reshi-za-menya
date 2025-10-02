'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useThemeStore } from '../stores/theme-store';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();
  
  console.log('Текущая тема:', theme); // Это поможет нам отладить

  useEffect(() => {
    console.log('Применяем тему:', theme);
    
    const root = document.documentElement; // Это <html> элемент
    
    // Убираем все классы тем
    root.classList.remove('light', 'night', 'sky');
    
    // Добавляем текущую тему
    root.classList.add(theme);
    
    console.log('Классы на html:', root.classList);
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}