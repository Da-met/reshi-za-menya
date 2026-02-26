'use client';

import { useState, useCallback } from 'react';
import { MovieRequest, MovieResponse } from '@/types/movies';

import { AppError, withTimeout, retryWithBackoff, createMovieError } from '@/lib/error-handling';
import { withCache, moviesCache } from '@/lib/cache';

interface UseMoviesApiProps {
  onSuccess?: (response: MovieResponse) => void;
  onError?: (error: AppError) => void;
  timeoutMs?: number;
  maxRetries?: number;
  enableCache?: boolean;
  cacheTTL?: number;
}

export function useMoviesApi({
  onSuccess,
  onError,
  timeoutMs = 30000,
  maxRetries = 2,
  enableCache = true,
  cacheTTL = 3600000, // 1 час
}: UseMoviesApiProps = {}) {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const generateRecommendation = useCallback(async (
    request: MovieRequest,
    excludeTitle?: string
  ): Promise<MovieResponse> => {
    if (isLoading) {
      throw createMovieError(new Error('Операция уже выполняется'), 'generateRecommendation');
    }

    setIsLoading(true);
    setError(null);

    try {
      const operation = async (): Promise<MovieResponse> => {
        const response = await fetch('/api/prompt-templates/generate-structured', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            templateName: "smart_movie_recommendation",
            category: "Films",
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

        // Адаптируем ответ API к нашему формату
        const movieData: MovieResponse = {
          recommendation: {
            id: Date.now().toString(),
            title: apiResponse.jsonStructuredResponse.title || 'Название не указано',
            type: apiResponse.jsonStructuredResponse.type || 'movie',
            genre: Array.isArray(apiResponse.jsonStructuredResponse.genre)
              ? apiResponse.jsonStructuredResponse.genre
              : typeof apiResponse.jsonStructuredResponse.genre === 'string'
                ? apiResponse.jsonStructuredResponse.genre.split(', ').map((g: string) => g.trim())
                : [],
            releaseYear: apiResponse.jsonStructuredResponse.releaseYear || new Date().getFullYear(),
            description: apiResponse.jsonStructuredResponse.description || 'Описание отсутствует',
            whyMatch: apiResponse.jsonStructuredResponse.whyMatch || 'Отлично подходит под ваши предпочтения',
            runtime: apiResponse.jsonStructuredResponse.runtime || 
                     apiResponse.jsonStructuredResponse.duration || 
                     '120 мин',
            productionCountry: apiResponse.jsonStructuredResponse.productionCountry || 'США',
            poster: apiResponse.jsonStructuredResponse.poster,
            director: apiResponse.jsonStructuredResponse.director,
            actors: Array.isArray(apiResponse.jsonStructuredResponse.actors)
              ? apiResponse.jsonStructuredResponse.actors
              : typeof apiResponse.jsonStructuredResponse.actors === 'string'
                ? apiResponse.jsonStructuredResponse.actors.split(', ').map((a: string) => a.trim())
                : undefined,
            kinopoiskRating: apiResponse.jsonStructuredResponse.kinopoiskRating,
            imdbRating: apiResponse.jsonStructuredResponse.imdbRating,
            streamingPlatforms: Array.isArray(apiResponse.jsonStructuredResponse.streamingPlatforms)
              ? apiResponse.jsonStructuredResponse.streamingPlatforms
              : typeof apiResponse.jsonStructuredResponse.streamingPlatforms === 'string'
                ? apiResponse.jsonStructuredResponse.streamingPlatforms.split(', ').map((p: string) => p.trim())
                : undefined,
            streamingLink: apiResponse.jsonStructuredResponse.streamingLink,
            tags: Array.isArray(apiResponse.jsonStructuredResponse.tags)
              ? apiResponse.jsonStructuredResponse.tags
              : typeof apiResponse.jsonStructuredResponse.tags === 'string'
                ? apiResponse.jsonStructuredResponse.tags.split(', ').map((t: string) => t.trim())
                : undefined
          },
          generationId: Date.now().toString()
        };

        return movieData;
      };

      let result: MovieResponse;

      if (enableCache && !excludeTitle) {
        // Кэшируем только обычные запросы, "Другой вариант" - без кэша
        const cacheKey = JSON.stringify({ ...request, _type: 'movie' });

        result = await withCache(
          cacheKey,
          () => withTimeout(retryWithBackoff(operation, maxRetries), timeoutMs),
          cacheTTL,
          moviesCache
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
      const movieError = error instanceof AppError
        ? error
        : createMovieError(error, 'generateRecommendation');

      setError(movieError);
      onError?.(movieError);
      throw movieError;
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, onSuccess, onError, timeoutMs, maxRetries, enableCache, cacheTTL]);

  return {
    generateRecommendation,
    isLoading,
    error,
    clearError
  };
}