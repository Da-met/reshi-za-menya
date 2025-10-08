'use client';

import { useState } from 'react';
import { BookRequest } from '@/types/books';

// Полный объект со всеми полями (undefined - это нормально для опциональных полей)
const emptyBookRequest: BookRequest = {
  mood: undefined,
  interests: undefined,
  volume: undefined,
  pace: undefined,
  emotional: undefined,
  features: undefined,
  region: undefined,
  period: undefined,
  audience: undefined,
  popularity: undefined
};

export function useBookGeneration(initialRequest: BookRequest = {}) {
  // Инициализируем со всеми полями
  const [bookRequest, setBookRequest] = useState<BookRequest>({
    ...emptyBookRequest,
    ...initialRequest
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const isFormValid = (): boolean => {
    const hasMood = !!bookRequest.mood;
    const hasEnoughGenres = (bookRequest.interests?.length || 0) >= 2;
    
    return hasMood || hasEnoughGenres;
  };

  const handleRequestChange = (updates: Partial<BookRequest>) => {
    setBookRequest(prev => ({ 
      ...prev, 
      ...updates 
    }));
  };

  const clearRequest = () => {
    setBookRequest({ ...emptyBookRequest });
  };

  return {
    bookRequest,
    setBookRequest,
    isGenerating,
    setIsGenerating,
    isFormValid,
    handleRequestChange,
    clearRequest
  };
}