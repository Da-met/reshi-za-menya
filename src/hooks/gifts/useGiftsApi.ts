// D:\МАЙО\JavaScript\ПРОЕКТЫ\РЕШИ ЗА МЕНЯ\reshi-za-menya\src\hooks\gifts\useGiftsApi.ts

'use client';

import { useState, useCallback } from 'react';
import { GiftRequest, GiftResponse } from '@/types/gifts';
import { AppError, ErrorCode, withTimeout, retryWithBackoff, createGiftError } from '@/lib/error-handling';
import { withCache, giftsCache } from '@/lib/cache';

interface UseGiftsApiProps {
  onSuccess?: (response: GiftResponse) => void;
  onError?: (error: AppError) => void;
  timeoutMs?: number;
  maxRetries?: number;
  enableCache?: boolean;
  cacheTTL?: number;
}

export function useGiftsApi({
  onSuccess,
  onError,
  timeoutMs = 30000,
  maxRetries = 2,
  enableCache = true,
  cacheTTL = 3600000,
}: UseGiftsApiProps = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Функция для генерации ключа кэша
  const generateCacheKey = useCallback((request: GiftRequest, excludeTitle?: string): string => {
    const normalizedRequest = {
      recipient_type: request.recipient_type,
      gift_occasion: request.gift_occasion,
      interests_hobbies: Array.isArray(request.interests_hobbies)
        ? [...request.interests_hobbies].sort().join(',')
        : '',
      profession: Array.isArray(request.profession)
        ? [...request.profession].sort().join(',')
        : '',
      budget: request.budget,
      age: request.age,
      gender: request.gender,
      gift_format: Array.isArray(request.gift_format)
        ? [...request.gift_format].sort().join(',')
        : '',
      excludeTitles: excludeTitle ? [excludeTitle] : undefined,
    };

    const jsonString = JSON.stringify(normalizedRequest);
    return `gift_${simpleHash(jsonString)}`;
  }, []);

  // Простая хэш-функция
  const simpleHash = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  };

  const generateGift = useCallback(async (
    request: GiftRequest,
    excludeTitle?: string
  ): Promise<GiftResponse> => {
    // Защита от множественных вызовов
    if (isLoading) {
      throw createGiftError(new Error('Операция уже выполняется'), 'generateGift');
    }

    setIsLoading(true);
    setError(null);

    try {
      // Операция для выполнения запроса - теперь excludeTitle берется из аргументов
      const operation = async (): Promise<GiftResponse> => {
        const response = await fetch('/api/prompt-templates/generate-structured', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            templateName: "smart_gift_recommendation",
            category: "Gifts",
            parameters: {
              ...request,
              // 👇 КЛЮЧЕВОЕ ИЗМЕНЕНИЕ: передаем excludeTitle в API
              ...(excludeTitle && { excludeTitles: [excludeTitle] })
            }
          })
        });

        if (!response.ok) {
          throw new AppError(
            `HTTP ${response.status}: ${response.statusText}`,
            ErrorCode.API_ERROR,
            'Ошибка при обращении к серверу',
            undefined,
            'API call'
          );
        }

        const apiResponse = await response.json();

        if (!apiResponse.jsonStructuredResponse) {
          throw new AppError(
            'Некорректный ответ от сервера',
            ErrorCode.API_ERROR,
            'Сервер вернул некорректные данные',
            undefined,
            'API response parsing'
          );
        }

        const giftData: GiftResponse = {
          gift: {
            ...apiResponse.jsonStructuredResponse,
            price: `${apiResponse.jsonStructuredResponse.price} ₽`,
            price_range: `${apiResponse.jsonStructuredResponse.price} ₽`
          },
          generationId: Date.now().toString()
        };

        return giftData;
      };

      let result: GiftResponse;

      // Логика кэширования
      if (enableCache && !excludeTitle) {
        // Для первого запроса используем кэш
        const cacheKey = generateCacheKey(request, excludeTitle);
        
        result = await withCache(
          cacheKey,
          () => withTimeout(retryWithBackoff(operation, maxRetries), timeoutMs),
          cacheTTL,
          giftsCache
        );
      } else {
        // Для "другого варианта" кэш не используем
        console.log('🔄 Ищем альтернативный вариант, пропускаем кэш');
        result = await withTimeout(
          retryWithBackoff(operation, maxRetries),
          timeoutMs
        );
      }

      onSuccess?.(result);
      return result;

    } catch (error) {
      const giftError = error instanceof AppError
        ? error
        : createGiftError(error, 'generateGift');

      setError(giftError);
      onError?.(giftError);
      throw giftError;
    } finally {
      setIsLoading(false);
    }
  }, [
    isLoading, 
    onSuccess, 
    onError, 
    timeoutMs, 
    maxRetries, 
    enableCache, 
    cacheTTL,
    generateCacheKey  // добавили зависимость
  ]);

  return {
    generateGift,
    isLoading,
    error,
    clearError
  };
}