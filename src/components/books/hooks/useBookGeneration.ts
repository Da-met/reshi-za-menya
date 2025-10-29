'use client';

import { useState } from 'react';
import { BookRequest } from '@/types/books';

// ТОЛЬКО обязательные поля по умолчанию
const defaultBookRequest: BookRequest = {
  readingMood: 'relax', // ОДИН из mood
  preferredGenres: ['Юмор', 'Детектив'], // РОВНО ДВА из interests
  // Остальные поля НЕ устанавливаем по умолчанию
  bookLength: undefined,
  narrativePace: undefined, 
  emotionalIntensity: undefined,
  specialFeatures: undefined,
  authorRegion: undefined,
  publicationPeriod: undefined,
  targetAudience: undefined,
  popularityLevel: undefined
};

export function useBookGeneration(initialRequest: BookRequest = {}) {
  const [bookRequest, setBookRequest] = useState<BookRequest>({
    ...defaultBookRequest,
    ...initialRequest
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const isFormValid = (): boolean => {
    const hasMood = !!bookRequest.readingMood;
    const hasEnoughGenres = (bookRequest.preferredGenres?.length || 0) >= 2;
    
    return hasMood && hasEnoughGenres;
  };

  const handleRequestChange = (updates: Partial<BookRequest>) => {
    setBookRequest(prev => ({
      ...prev,
      ...updates
    }));
  };

  const clearRequest = () => {
    setBookRequest({ ...defaultBookRequest });
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