// src/hooks/useLoadingState.ts
'use client';

import { useState, useCallback } from 'react'; // Убрали useRef

interface UseLoadingStateProps {
  /** Сообщение по умолчанию */
  defaultMessage?: string;
  
  /** Автоматически скроллить к лоадеру */
  autoScroll?: boolean; // Оставляем в интерфейсе, но не используем в теле
  
  /** Показать успех после завершения */
  showSuccess?: boolean;
}

export function useLoadingState({
  defaultMessage = "Обрабатываем ваш запрос...",
  showSuccess = false
}: UseLoadingStateProps = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(defaultMessage);
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [loadingKey, setLoadingKey] = useState(0); // Для принудительного ререндера
  
  const startLoading = useCallback((message?: string) => {
    setIsLoading(true);
    if (message) setLoadingMessage(message);
    setProgress(0);
    setLoadingKey(prev => prev + 1);
  }, []);
  
  const updateProgress = useCallback((value: number) => {
    setProgress(value);
  }, []);
  
  const updateMessage = useCallback((message: string) => {
    setLoadingMessage(message);
  }, []);
  
  const stopLoading = useCallback((success = true) => {
    if (success && showSuccess) {
      // Небольшая задержка перед скрытием для показа анимации успеха
      setTimeout(() => {
        setIsLoading(false);
        setProgress(undefined);
      }, 1000);
    } else {
      setIsLoading(false);
      setProgress(undefined);
    }
  }, [showSuccess]);
  
  const resetLoading = useCallback(() => {
    setIsLoading(false);
    setLoadingMessage(defaultMessage);
    setProgress(undefined);
  }, [defaultMessage]);
  
  return {
    isLoading,
    loadingMessage,
    progress,
    loadingKey,
    startLoading,
    stopLoading,
    updateProgress,
    updateMessage,
    resetLoading
  };
}