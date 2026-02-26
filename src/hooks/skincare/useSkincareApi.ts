'use client';

import { useState, useCallback } from 'react';
import { SkincareRequest, SkincareResponse } from '@/types/skincare';
import { AppError, withTimeout, retryWithBackoff, createSkincareError } from '@/lib/error-handling';
import { withCache, generateCacheKey, skincareCache } from '@/lib/cache';

interface UseSkincareApiProps {
  onSuccess?: (response: SkincareResponse) => void;
  onError?: (error: AppError) => void;
  timeoutMs?: number;
  maxRetries?: number;
  enableCache?: boolean;
  cacheTTL?: number;
}


export function useSkincareApi({
  onSuccess,
  onError,
  timeoutMs = 30000,
  maxRetries = 2,
  enableCache = true,
  cacheTTL = 3600000,
}: UseSkincareApiProps = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const generateRecommendations = useCallback(async (
    request: SkincareRequest,
    excludeTitle?: string
  ): Promise<SkincareResponse> => {
    if (isLoading) {
      throw createSkincareError(new Error('Операция уже выполняется'), 'generateRecommendations');
    }

    setIsLoading(true);
    setError(null);

    try {
      const operation = async (): Promise<SkincareResponse> => {
        const response = await fetch('/api/prompt-templates/generate-structured', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            templateName: "smart_skincare_recommendation",
            category: "SkincareRecommendation",
            parameters: {
              ...request,
              ...(excludeTitle && { excludeTitles: [excludeTitle] })
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

        const rawData = apiResponse.jsonStructuredResponse;
        
        // Создаем массив из одного продукта
        const products = rawData 
          ? [{
              id: rawData.id || `product-${Date.now()}`,
              name: rawData.name || 'Средство ухода',
              brand: rawData.brand || 'Не указан',
              description: rawData.description || '',
              price: rawData.price || 'Цена не указана',
              price_range: rawData.price_range,
              image: rawData.image,
              recommended_product_type: rawData.recommended_product_type || 'Уход',
              key_ingredients: Array.isArray(rawData.key_ingredients) 
                ? rawData.key_ingredients 
                : [],
              features: Array.isArray(rawData.features) 
                ? rawData.features 
                : [],
              reasons: Array.isArray(rawData.reasons) 
                ? rawData.reasons 
                : [],
              reasoning: rawData.reasoning,
              purchaseLink: rawData.purchaseLink,
              where_to_buy: Array.isArray(rawData.where_to_buy) 
                ? rawData.where_to_buy 
                : [],
              // 👇 УСИЛЕННАЯ ЗАЩИТА ДЛЯ TAGS
              tags: (() => {
                const tags = rawData.tags;
                
                // Если массив - оставляем
                if (Array.isArray(tags)) {
                  return tags;
                }
                
                // Если строка - разбиваем
                if (typeof tags === 'string') {
                  return tags.split(',').map((t: string) => t.trim());
                }
                
                // Если число или другой тип - превращаем в строку и в массив
                if (tags != null) {
                  return [String(tags)];
                }
                return [];
              })(),
              rating: rawData.rating,
              size: rawData.size,
              image_search_query: rawData.image_search_query
            }]
          : [];

        const skincareData: SkincareResponse = {
          products,
          recommendations: rawData.recommendations || '',
          generationId: Date.now().toString()
        };

        return skincareData;
      };

      let result: SkincareResponse;

      if (enableCache && !excludeTitle) {
        const cacheKey = generateCacheKey({ ...request, _type: 'skincare' });
        result = await withCache(
          cacheKey,
          () => withTimeout(retryWithBackoff(operation, maxRetries), timeoutMs),
          cacheTTL,
          skincareCache
        );
      } else {
        result = await withTimeout(
          retryWithBackoff(operation, maxRetries),
          timeoutMs
        );
      }

      onSuccess?.(result);
      return result;

    } catch (error) {
      const skincareError = error instanceof AppError
        ? error
        : createSkincareError(error, 'generateRecommendations');

      setError(skincareError);
      onError?.(skincareError);
      throw skincareError;
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, onSuccess, onError, timeoutMs, maxRetries, enableCache, cacheTTL]);

  return {
    generateRecommendations,
    isLoading,
    error,
    clearError
  };
}