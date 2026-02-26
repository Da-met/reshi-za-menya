// src/hooks/movies/useMoviesForm.ts

'use client';

import { useState, useCallback, useMemo } from 'react';
import { MovieRequest } from '@/types/movies';
import { DEFAULT_MOVIE_REQUEST, MOVIE_VALIDATION } from '@/constants/movies.constants';

export const useMoviesForm = (initialRequest?: Partial<MovieRequest>) => {
  
  // 👇 Переименовали с request на formRequest
  const [formRequest, setFormRequest] = useState<MovieRequest>(() => ({
    context: DEFAULT_MOVIE_REQUEST.context,
    mood: DEFAULT_MOVIE_REQUEST.mood,
    genres: [], // мутабельный массив
    format: [], // мутабельный массив
    duration: DEFAULT_MOVIE_REQUEST.duration,
    year: DEFAULT_MOVIE_REQUEST.year,
    country: DEFAULT_MOVIE_REQUEST.country,
    rating: DEFAULT_MOVIE_REQUEST.rating,
    ...initialRequest
  }));

  const updateRequest = useCallback((updates: Partial<MovieRequest>) => {
    setFormRequest(prev => {
      let hasChanges = false;

      for (const key in updates) {
        const typedKey = key as keyof MovieRequest;
        const newValue = updates[typedKey];
        const oldValue = prev[typedKey];

        if (Array.isArray(newValue) && Array.isArray(oldValue)) {
          if (newValue.length !== oldValue.length ||
              !newValue.every((val, idx) => val === oldValue[idx])) {
            hasChanges = true;
            break;
          }
        } else if (newValue !== oldValue) {
          hasChanges = true;
          break;
        }
      }

      return hasChanges ? { ...prev, ...updates } : prev;
    });
  }, []);

  const resetRequest = useCallback(() => {
    setFormRequest({
      context: DEFAULT_MOVIE_REQUEST.context,
      mood: DEFAULT_MOVIE_REQUEST.mood,
      genres: [],
      format: [],
      duration: DEFAULT_MOVIE_REQUEST.duration,
      year: DEFAULT_MOVIE_REQUEST.year,
      country: DEFAULT_MOVIE_REQUEST.country,
      rating: DEFAULT_MOVIE_REQUEST.rating
    });
  }, []);

  const isValid = useMemo(() => {
    const hasContext = !!formRequest.context;
    const hasValidMood = formRequest.mood && formRequest.mood !== 'any';
    const hasEnoughGenres = Array.isArray(formRequest.genres) && formRequest.genres.length >= MOVIE_VALIDATION.MIN_GENRES_FOR_VALID;

    return hasContext && (hasValidMood || hasEnoughGenres);
  }, [formRequest.context, formRequest.mood, formRequest.genres]);

  const selectedCount = useMemo(() => {
    let count = 0;
    if (formRequest.context) count++;
    if (formRequest.mood && formRequest.mood !== 'any') count++;
    if (formRequest.genres?.length) count += formRequest.genres.length;
    if (formRequest.format?.length) count += formRequest.format.length;
    if (formRequest.duration && formRequest.duration !== 'any') count++;
    if (formRequest.year && formRequest.year !== 'any') count++;
    if (formRequest.country && formRequest.country !== 'any') count++;
    if (formRequest.rating && formRequest.rating !== 'any') count++;
    return count;
  }, [
    formRequest.context,
    formRequest.mood,
    formRequest.genres,
    formRequest.format,
    formRequest.duration,
    formRequest.year,
    formRequest.country,
    formRequest.rating
  ]);

  return {
    request: formRequest, // 👈 наружу отдаём под именем request
    updateRequest,
    resetRequest,
    isValid,
    selectedCount
  };
};