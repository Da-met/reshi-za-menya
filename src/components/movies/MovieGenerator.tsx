'use client';

import { MovieRequest, MovieResponse } from '@/types/movies';
import { ContextSection } from './sections/ContextSection';
import { MoodSection } from './sections/MoodSection';
import { FiltersSection } from './sections/FiltersSection';
import { SelectedOptions } from './SelectedOptions';
import { TrendingBanner } from './TrendingBanner';
import { MovieActions } from './MovieActions';
import { useMovieGeneration } from './hooks/useMovieGeneration';
import { useRandomMovies } from './hooks/useRandomMovies';
import { User, Film, Settings } from 'lucide-react';
import { useState } from 'react';

interface MovieGeneratorProps {
  onMovieGenerated?: (movie: MovieResponse) => void;
  isGenerating?: boolean;
  onGeneratingChange?: (generating: boolean) => void;
  onRequestChange?: (request: MovieRequest) => void;
  currentRequest?: MovieRequest;
  onClearMovie?: () => void;
}

export function MovieGenerator({
  onMovieGenerated,
  isGenerating = false,
  onGeneratingChange,
  currentRequest = {},
  onClearMovie
}: MovieGeneratorProps) {
  const [activeSection, setActiveSection] = useState<'context' | 'mood' | 'filters'>('context');
  const { movieRequest, isFormValid, handleRequestChange } = useMovieGeneration(currentRequest);
  const { generateRandomRequest } = useRandomMovies();

  const handleGenerate = async () => {
    if (!isFormValid() || isGenerating) return;
    onClearMovie?.();
    onGeneratingChange?.(true);
    
    // TODO: Реальный API вызов
    setTimeout(() => {
      const mockMovie: MovieResponse = {
        recommendation: {
          id: '1',
          title: 'Один дома',
          type: 'movie',
          genre: ['комедия', 'семейный'],
          year: 1990,
          description: 'Мальчик Кевин остался один дома на Рождество и защищает свой дом от грабителей.',
          whyMatch: 'Идеально для семейного просмотра - смешная и добрая комедия',
          duration: '1ч 43м',
          country: 'США'
        },
        generationId: '123'
      };
      
      onMovieGenerated?.(mockMovie);
      onGeneratingChange?.(false);
    }, 2000);
  };

  const handleLucky = async () => {
    onClearMovie?.();
    onGeneratingChange?.(true);
    
    const randomRequest = generateRandomRequest();
    console.log('🎲 Рандомный запрос:', randomRequest);
    
    // TODO: Реальный API вызов с randomRequest
    setTimeout(() => {
      const mockMovie: MovieResponse = {
        recommendation: {
          id: `lucky-${Date.now()}`,
          title: 'Случайный фильм',
          type: 'movie',
          genre: randomRequest.genres || [],
          year: 2020,
          description: 'Отличный выбор для случайного просмотра!',
          whyMatch: 'Идеально подходит для разнообразия',
          duration: '1ч 30м - 2ч 10м',
          country: 'США'
        },
        generationId: `lucky-${Date.now()}`
      };
      
      onMovieGenerated?.(mockMovie);
      onGeneratingChange?.(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <TrendingBanner />
      <SelectedOptions request={movieRequest} />
      
      <div className="bg-card rounded-2xl shadow-lg p-6">
        {/* Навигация по секциям */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 mb-6 md:mb-8 p-2 sm:p-1 bg-muted rounded-xl">
          {[
            { id: 'context' as const, label: 'С кем смотрим', icon: <User size={16} /> },
            { id: 'mood' as const, label: 'Настроение', icon: <Film size={16} /> },
            { id: 'filters' as const, label: 'Фильтры', icon: <Settings size={16} /> }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-all flex-1 justify-center text-sm sm:text-base ${
                activeSection === section.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {section.icon}
              <span className="font-medium">{section.label}</span>
            </button>
          ))}
        </div>

        {/* Секции формы */}
        <div className="mb-6 min-h-[300px]">
          {activeSection === 'context' && (
            <ContextSection request={movieRequest} onChange={handleRequestChange} />
          )}
          {activeSection === 'mood' && (
            <MoodSection request={movieRequest} onChange={handleRequestChange} />
          )}
          {activeSection === 'filters' && (
            <FiltersSection request={movieRequest} onChange={handleRequestChange} />
          )}
        </div>

        {/* Кнопки действий */}
        <MovieActions
          isFormValid={isFormValid()}
          isGenerating={isGenerating}
          onGenerate={handleGenerate}
          onLucky={handleLucky}
        />

        {!isFormValid() && (
          <p className="text-sm text-muted-foreground mt-3 text-center">
            Выберите с кем смотрим и добавьте настроение или 2+ жанра
          </p>
        )}
      </div>
    </div>
  );
}