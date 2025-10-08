'use client';

import { BookRequest } from '@/types/books';

export function useRandomBooks() {
  const generateRandomRequest = (): BookRequest => {
    const popularCombinations = [
      { 
        mood: 'relax', 
        interests: ['Детектив', 'Юмор', 'Современная проза'],
        volume: 'single',
        pace: 'moderate',
        emotional: 'light',
        features: ['бестселлер', 'современный автор'],
        region: 'russian',
        period: 'modern',
        audience: 'adult',
        popularity: 'bestseller'
      },
      { 
        mood: 'inspire', 
        interests: ['Биографии', 'Саморазвитие', 'Психология'],
        volume: 'single',
        pace: 'moderate',
        emotional: 'emotional',
        features: ['интеллектуальная', 'практическая польза'],
        region: 'europe_america',
        period: 'recent',
        audience: 'adult',
        popularity: 'bestseller'
      },
      { 
        mood: 'think', 
        interests: ['Философия', 'Наука', 'История'],
        volume: 'single',
        pace: 'leisurely',
        emotional: 'emotional',
        features: ['интеллектуальная', 'философская глубина'],
        region: 'europe_america',
        period: '20th',
        audience: 'adult',
        popularity: 'average'
      }
      // ... остальные комбинации
    ];

    const randomCombination = popularCombinations[
      Math.floor(Math.random() * popularCombinations.length)
    ];

    // Возвращаем ВСЕ поля, даже если некоторые undefined
    return {
      mood: randomCombination.mood,
      interests: randomCombination.interests,
      volume: randomCombination.volume,
      pace: randomCombination.pace,
      emotional: randomCombination.emotional,
      features: randomCombination.features,
      region: randomCombination.region,
      period: randomCombination.period,
      audience: randomCombination.audience,
      popularity: randomCombination.popularity
    };
  };

  return { generateRandomRequest };
}