// src/hooks/books/useBooksForm.ts

'use client';

import { useState, useCallback, useMemo } from 'react';
import { BookRequest } from '@/types/books';
import { 
  DEFAULT_BOOK_REQUEST, 
  BOOK_VALIDATION 
} from '@/constants/books.constants';

export const useBooksForm = (initialRequest?: Partial<BookRequest>) => {
  
  // 👇 Состояние формы
  const [formRequest, setFormRequest] = useState<BookRequest>(() => ({
    readingMood: DEFAULT_BOOK_REQUEST.readingMood,
    preferredGenres: [...DEFAULT_BOOK_REQUEST.preferredGenres], // копируем массив
    bookLength: DEFAULT_BOOK_REQUEST.bookLength,
    narrativePace: DEFAULT_BOOK_REQUEST.narrativePace,
    emotionalIntensity: DEFAULT_BOOK_REQUEST.emotionalIntensity,
    specialFeatures: [],
    authorRegion: DEFAULT_BOOK_REQUEST.authorRegion,
    publicationPeriod: DEFAULT_BOOK_REQUEST.publicationPeriod,
    targetAudience: DEFAULT_BOOK_REQUEST.targetAudience,
    popularityLevel: DEFAULT_BOOK_REQUEST.popularityLevel,
    ...initialRequest,
    // Для массивов особая обработка
    ...(initialRequest?.preferredGenres && { 
      preferredGenres: [...initialRequest.preferredGenres] 
    }),
    ...(initialRequest?.specialFeatures && { 
      specialFeatures: [...initialRequest.specialFeatures] 
    })
  }));

  // 👇 Обновление с мемоизацией (предотвращает лишние рендеры)
  const updateRequest = useCallback((updates: Partial<BookRequest>) => {
    setFormRequest(prev => {
      // Проверяем, есть ли реальные изменения
      let hasChanges = false;
      
      for (const key in updates) {
        const typedKey = key as keyof BookRequest;
        const newValue = updates[typedKey];
        const oldValue = prev[typedKey];
        
        // Специальная обработка для массивов
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

  // 👇 Сброс к значениям по умолчанию
  const resetRequest = useCallback(() => {
    setFormRequest({
      readingMood: DEFAULT_BOOK_REQUEST.readingMood,
      preferredGenres: [...DEFAULT_BOOK_REQUEST.preferredGenres],
      bookLength: DEFAULT_BOOK_REQUEST.bookLength,
      narrativePace: DEFAULT_BOOK_REQUEST.narrativePace,
      emotionalIntensity: DEFAULT_BOOK_REQUEST.emotionalIntensity,
      specialFeatures: [],
      authorRegion: DEFAULT_BOOK_REQUEST.authorRegion,
      publicationPeriod: DEFAULT_BOOK_REQUEST.publicationPeriod,
      targetAudience: DEFAULT_BOOK_REQUEST.targetAudience,
      popularityLevel: DEFAULT_BOOK_REQUEST.popularityLevel
    });
  }, []);

  // 👇 Валидация формы (мемоизирована)
  const isValid = useMemo(() => {
    const hasMood = !!formRequest.readingMood;
    const hasEnoughGenres = Array.isArray(formRequest.preferredGenres) && 
                           formRequest.preferredGenres.length >= BOOK_VALIDATION.MIN_GENRES_FOR_VALID;
    
    return hasMood && hasEnoughGenres;
  }, [formRequest.readingMood, formRequest.preferredGenres]);

  // 👇 Подсчёт выбранных параметров (мемоизирован)
  const selectedCount = useMemo(() => {
    let count = 0;
    
    if (formRequest.readingMood && formRequest.readingMood !== 'any') count++;
    if (formRequest.preferredGenres?.length) count += formRequest.preferredGenres.length;
    if (formRequest.bookLength && formRequest.bookLength !== 'any') count++;
    if (formRequest.narrativePace && formRequest.narrativePace !== 'any') count++;
    if (formRequest.emotionalIntensity && formRequest.emotionalIntensity !== 'any') count++;
    if (formRequest.specialFeatures?.length) count += formRequest.specialFeatures.length;
    if (formRequest.authorRegion && formRequest.authorRegion !== 'any') count++;
    if (formRequest.publicationPeriod && formRequest.publicationPeriod !== 'any') count++;
    if (formRequest.targetAudience && formRequest.targetAudience !== 'any') count++;
    if (formRequest.popularityLevel && formRequest.popularityLevel !== 'any') count++;
    
    return count;
  }, [
    formRequest.readingMood,
    formRequest.preferredGenres,
    formRequest.bookLength,
    formRequest.narrativePace,
    formRequest.emotionalIntensity,
    formRequest.specialFeatures,
    formRequest.authorRegion,
    formRequest.publicationPeriod,
    formRequest.targetAudience,
    formRequest.popularityLevel
  ]);

  return {
    request: formRequest,        // 👈 наружу отдаём как request (для обратной совместимости)
    updateRequest,
    resetRequest,
    isValid,
    selectedCount
  };
};