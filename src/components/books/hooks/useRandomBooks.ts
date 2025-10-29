'use client';

import { BookRequest } from '@/types/books';

export function useRandomBooks() {
  const generateRandomRequest = (): BookRequest => {
    const popularCombinations = [
      { 
        readingMood: 'relax', 
        preferredGenres: ['Детектив', 'Юмор', 'Современная проза'],
        bookLength: 'single',
        narrativePace: 'moderate',
        emotionalIntensity: 'light',
        specialFeatures: ['бестселлер', 'современный автор'],
        authorRegion: 'russian',
        publicationPeriod: 'modern',
        targetAudience: 'adult',
        popularityLevel: 'bestseller'
      },
      { 
        readingMood: 'inspire', 
        preferredGenres: ['Биографии', 'Саморазвитие', 'Психология'],
        bookLength: 'single',
        narrativePace: 'moderate',
        emotionalIntensity: 'emotional',
        specialFeatures: ['интеллектуальная', 'практическая польза'],
        authorRegion: 'europe_america',
        publicationPeriod: 'recent',
        targetAudience: 'adult',
        popularityLevel: 'bestseller'
      },
      { 
        readingMood: 'think', 
        preferredGenres: ['Философия', 'Наука', 'История'],
        bookLength: 'single',
        narrativePace: 'leisurely',
        emotionalIntensity: 'emotional',
        specialFeatures: ['интеллектуальная', 'философская глубина'],
        authorRegion: 'europe_america',
        publicationPeriod: '20th',
        targetAudience: 'adult',
        popularityLevel: 'average'
      }
      // ... остальные комбинации
    ];

    const randomCombination = popularCombinations[
      Math.floor(Math.random() * popularCombinations.length)
    ];

    // Возвращаем ВСЕ поля, даже если некоторые undefined
    return {
      readingMood: randomCombination.readingMood,
      preferredGenres: randomCombination.preferredGenres,
      bookLength: randomCombination.bookLength,
      narrativePace: randomCombination.narrativePace,
      emotionalIntensity: randomCombination.emotionalIntensity,
      specialFeatures: randomCombination.specialFeatures,
      authorRegion: randomCombination.authorRegion,
      publicationPeriod: randomCombination.publicationPeriod,
      targetAudience: randomCombination.targetAudience,
      popularityLevel: randomCombination.popularityLevel
    };
  };

  return { generateRandomRequest };
}