import { useState } from 'react';
import { MovieRequest } from '@/types/movies';

export function useMovieGeneration(initialRequest: MovieRequest = {}) {
  const [movieRequest, setMovieRequest] = useState<MovieRequest>(initialRequest);
  const [isGenerating, setIsGenerating] = useState(false);

  const isFormValid = (): boolean => {
    const hasContext = !!movieRequest.context;
    const hasMoodOrGenres = !!movieRequest.mood || (movieRequest.genres?.length || 0) >= 2;
    return hasContext && hasMoodOrGenres;
  };

  const handleRequestChange = (updates: Partial<MovieRequest>) => {
    setMovieRequest(prev => ({ ...prev, ...updates }));
  };

  return {
    movieRequest,
    setMovieRequest,
    isGenerating,
    setIsGenerating,
    isFormValid,
    handleRequestChange
  };
}