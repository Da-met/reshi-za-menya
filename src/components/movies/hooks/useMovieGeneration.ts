import { useState, useCallback } from 'react';
import { MovieRequest } from '@/types/movies';

interface UseMovieGenerationReturn {
  movieRequest: MovieRequest;
  isGenerating: boolean;
  isValid: boolean;
  handleRequestChange: (updates: Partial<MovieRequest>) => void;
  setIsGenerating: (generating: boolean) => void;
}

export function useMovieGeneration(initialRequest: MovieRequest = {}): UseMovieGenerationReturn {
const [movieRequest, setMovieRequest] = useState<MovieRequest>({
    context: 'solo',
    mood: 'funny', // 👈 Меняем 'any' на валидное значение
    ...initialRequest
  });
  const [isGenerating, setIsGenerating] = useState(false);

  // Вычисляем валидность
  const isValid = Boolean(
    movieRequest.context && 
    (movieRequest.mood && movieRequest.mood !== 'any' || movieRequest.genres && movieRequest.genres.length >= 2)
  );

  const handleRequestChange = useCallback((updates: Partial<MovieRequest>) => {
    setMovieRequest(prev => ({ ...prev, ...updates }));
  }, []);

  return {
    movieRequest,
    isGenerating,
    isValid,
    handleRequestChange,
    setIsGenerating
  };
}