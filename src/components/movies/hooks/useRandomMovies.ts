import { MovieRequest } from '@/types/movies';

export function useRandomMovies() {
  const generateRandomRequest = (): MovieRequest => {
    const popularCombinations = [
      { context: 'family', mood: 'funny', genres: ['Комедия', 'Семейные'] },
      { context: 'friends', mood: 'thrilling', genres: ['Триллер', 'Детектив'] },
      { context: 'romance', mood: 'any', genres: ['Романтика', 'Драма'] },
      { context: 'solo', mood: 'thoughtful', genres: ['Драма', 'Фантастика'] },
      { context: 'party', mood: 'funny', genres: ['Комедия', 'Музыкальный'] },
      { context: 'parents', mood: 'thoughtful', genres: ['Драма', 'Исторический'] },
      { context: 'couple', mood: 'any', genres: ['Романтика', 'Мелодрама'] },
      { context: 'colleagues', mood: 'thrilling', genres: ['Детектив', 'Криминал'] }
    ];

    const randomCombination = popularCombinations[Math.floor(Math.random() * popularCombinations.length)];
    
    return {
      context: randomCombination.context,
      mood: randomCombination.mood,
      genres: randomCombination.genres,
      format: [],
      duration: 'any',
      year: 'any',
      country: 'any'
    };
  };

  return { generateRandomRequest };
}