'use client';

import { useEffect } from 'react';
import { useThemeStore } from '../../stores/theme-store';

export function ThemeProvider() {
  const { theme } = useThemeStore();

  useEffect(() => {
    console.log('ThemeProvider: применяем тему', theme);
    
    const html = document.documentElement;
    
    // Удаляем все возможные классы тем
    html.classList.remove('light', 'dark', 'ocean', 'night', 'sky');
    
    // Добавляем текущую тему
    html.classList.add(theme);
    
    // Принудительно применяем стили
    document.body.style.backgroundColor = '';
    document.body.style.color = '';
  }, [theme]);

  return null; // Этот компонент ничего не рендерит
}