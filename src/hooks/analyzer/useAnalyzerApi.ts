// src/hooks/analyzer/useAnalyzerApi.ts
'use client';

import { useState, useCallback } from 'react';
import { AnalyzerRequest, AnalysisResponse } from '@/types/analyzer';
import { AppError, withTimeout, retryWithBackoff, createAnalyzerError } from '@/lib/error-handling';
import { withCache, generateAnalyzerCacheKey, analyzerCache } from '@/lib/cache';

interface UseAnalyzerApiProps {
  onSuccess?: (response: AnalysisResponse) => void;
  onError?: (error: AppError) => void;
  timeoutMs?: number;
  maxRetries?: number;
  enableCache?: boolean;
  cacheTTL?: number;
}

export function useAnalyzerApi({
  onSuccess,
  onError,
  timeoutMs = 30000,
  maxRetries = 2,
  enableCache = true,
  cacheTTL = 3600000, // 1 час
}: UseAnalyzerApiProps = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const analyzeProduct = useCallback(async (
    request: AnalyzerRequest
  ): Promise<AnalysisResponse> => {
    // Проверяем, не выполняется ли уже операция
    if (isLoading) {
      throw createAnalyzerError(new Error('Операция уже выполняется'), 'analyzeProduct');
    }

    // Проверяем, что название продукта не пустое
    if (!request.productName?.trim()) {
      throw createAnalyzerError(new Error('Название продукта не может быть пустым'), 'analyzeProduct');
    }

    setIsLoading(true);
    setError(null);

    try {
      const operation = async (): Promise<AnalysisResponse> => {
        console.log(`🔍 Анализируем продукт: "${request.productName}"`);
        
        const response = await fetch('/api/prompt-templates/generate-structured', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              templateName: "skincare_analysis",     // ← ЭТО ПРАВИЛЬНО
              category: "SkincareAnalysis",          // ← ЭТО ПРАВИЛЬНО
              parameters: {
                productName: request.productName
              }
            })
          });


        if (!response.ok) {
          const errorText = await response.text().catch(() => 'Нет описания ошибки');
          throw new Error(`HTTP ${response.status}: ${response.statusText || errorText}`);
        }

        const apiResponse = await response.json();

        if (!apiResponse.jsonStructuredResponse) {
          throw new Error('Некорректный ответ от сервера: отсутствует jsonStructuredResponse');
        }

        const rawData = apiResponse.jsonStructuredResponse;

        // Проверяем, что получили минимально необходимые данные
        if (!rawData.name && !rawData.brand) {
          throw new Error('Не удалось найти информацию о продукте');
        }

        // Формируем ответ в нужной структуре
        const analysisData: AnalysisResponse = {
          product: {
            id: rawData.id || `product-${Date.now()}`,
            name: rawData.name || request.productName,
            brand: rawData.brand || 'Не указан',
            description: rawData.description || 'Описание отсутствует',
            type: rawData.type,
            price: rawData.price,
            price_range: rawData.price_range,
            image: rawData.image,
            category: rawData.category,
            features: Array.isArray(rawData.features) ? rawData.features : [],
            ingredients: Array.isArray(rawData.ingredients) ? rawData.ingredients : [],
            safetyScore: typeof rawData.safetyScore === 'number' ? rawData.safetyScore : 0,
            skinTypeCompatibility: rawData.skinTypeCompatibility || {},
            warnings: Array.isArray(rawData.warnings) ? rawData.warnings : [],
            recommendations: Array.isArray(rawData.recommendations) ? rawData.recommendations : [],
            reasoning: rawData.reasoning,
            tags: (() => {
              const tags = rawData.tags;
              if (Array.isArray(tags)) return tags;
              if (typeof tags === 'string') return tags.split(',').map((t: string) => t.trim());
              if (tags != null) return [String(tags)];
              return [];
            })(),
            purchaseLink: rawData.purchaseLink,
            purchaseLinks: rawData.purchaseLinks
          },
          generationId: Date.now().toString()
        };

        // Проверяем, что ингредиенты пришли (хотя бы пустой массив)
        if (!analysisData.product.ingredients || analysisData.product.ingredients.length === 0) {
          console.warn('⚠️ Анализ вернулся без ингредиентов');
        }

        console.log('✅ Анализ успешно завершен, оценка безопасности:', analysisData.product.safetyScore);
        return analysisData;
      };

      let result: AnalysisResponse;

      if (enableCache) {
        // Создаем ключ кэша на основе названия продукта
        const cacheKey = generateAnalyzerCacheKey({ 
          productName: request.productName,
          _type: 'analyzer' 
        });
        
        result = await withCache(
          cacheKey,
          () => withTimeout(retryWithBackoff(operation, maxRetries), timeoutMs),
          cacheTTL,
          analyzerCache
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
      const analyzerError = error instanceof AppError
        ? error
        : createAnalyzerError(error, 'analyzeProduct');
      
      setError(analyzerError);
      onError?.(analyzerError);
      throw analyzerError;

    } finally {
      setIsLoading(false);
    }
  }, [isLoading, onSuccess, onError, timeoutMs, maxRetries, enableCache, cacheTTL]);

  return {
    analyzeProduct,
    isLoading,
    error,
    clearError
  };
}