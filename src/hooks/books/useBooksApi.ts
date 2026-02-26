// src/hooks/books/useBooksApi.ts

'use client';

import { useState, useCallback, useRef } from 'react';
import { BookRequest, BookResponse } from '@/types/books';
import { AppError, withTimeout, retryWithBackoff, createBookError } from '@/lib/error-handling';
import { withCache, booksCache } from '@/lib/cache';

interface UseBooksApiProps {
  onSuccess?: (response: BookResponse) => void;
  onError?: (error: AppError) => void;
  timeoutMs?: number;
  maxRetries?: number;
  enableCache?: boolean;
  cacheTTL?: number;
}

export function useBooksApi({
  onSuccess,
  onError,
  timeoutMs = 30000,
  maxRetries = 2,
  enableCache = true,
  cacheTTL = 3600000,
}: UseBooksApiProps = {}) {
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const isGeneratingRef = useRef(false);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const generateRecommendation = useCallback(async (
    request: BookRequest,

  ): Promise<BookResponse> => {

    // 👇 Защита ТОЛЬКО через ref!
    if (isGeneratingRef.current) {
      throw createBookError(new Error('Операция уже выполняется'), 'generateRecommendation');
    }

    setIsLoading(true);
    isGeneratingRef.current = true;
    setError(null);

    try {
      const operation = async (): Promise<BookResponse> => {

        console.log('🚀 ====== FETCH PARAMETERS ======');
        console.log('📤 templateName:', "smart_book_recommendation");
        console.log('📤 category:', "Books");
        console.log('📤 parameters:', JSON.stringify(request, null, 2)); // 👉 просто request!
        console.log('================================');

        const response = await fetch('/api/prompt-templates/generate-structured', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            templateName: "smart_book_recommendation",
            category: "Books",
            parameters: {
              ...request,
            }
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const apiResponse = await response.json();

        if (!apiResponse.jsonStructuredResponse) {
          throw new Error('Некорректный ответ от сервера');
        }

        const bookData: BookResponse = {
          book: {
            id: Date.now().toString(),
            title: apiResponse.jsonStructuredResponse.title || 'Название не указано',
            author: apiResponse.jsonStructuredResponse.author || 'Автор не указан',
            description: apiResponse.jsonStructuredResponse.description || 'Описание отсутствует',
            whyMatch: apiResponse.jsonStructuredResponse.whyMatch || 'Отлично подходит под ваши предпочтения',
            genres: Array.isArray(apiResponse.jsonStructuredResponse.genres)
              ? apiResponse.jsonStructuredResponse.genres
              : typeof apiResponse.jsonStructuredResponse.genres === 'string'
                ? apiResponse.jsonStructuredResponse.genres.split(',').map((g: string) => g.trim())
                : [],
            length: apiResponse.jsonStructuredResponse.length || '300 страниц',
            readingComplexity: apiResponse.jsonStructuredResponse.readingComplexity || 'Средняя',
            year: apiResponse.jsonStructuredResponse.year,
            country: apiResponse.jsonStructuredResponse.country,
            features: apiResponse.jsonStructuredResponse.features,
            coverImage: apiResponse.jsonStructuredResponse.coverImage,
          },
          generationId: Date.now().toString()
        };

        return bookData;
      };

      let result: BookResponse;
      
      if (enableCache) {
        const cacheKey = JSON.stringify({ ...request, _type: 'book' });
        result = await withCache(
          cacheKey,
          () => withTimeout(retryWithBackoff(operation, maxRetries), timeoutMs),
          cacheTTL,
          booksCache
        );
      } else {
        result = await withTimeout(
          retryWithBackoff(operation, maxRetries),
          timeoutMs
        );
      }

      // 👇 Вызываем onSuccess ДО сброса флага
      onSuccess?.(result);
      return result;

    } catch (error) {
      console.log('❌ [API] Ошибка:', error);
      const bookError = error instanceof AppError
        ? error
        : createBookError(error, 'generateRecommendation');
      
      setError(bookError);
      onError?.(bookError);
      throw bookError;

    } finally {
      setIsLoading(false);
      isGeneratingRef.current = false;
    }
    
    // 👇 Убираем isLoading из зависимостей!
  },  [onSuccess, onError, timeoutMs, maxRetries, enableCache, cacheTTL]);

  return {
    generateRecommendation,
    isLoading,
    error,
    clearError
  };
}