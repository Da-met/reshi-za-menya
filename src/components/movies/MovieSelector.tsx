'use client';

import { useState, useEffect, useRef } from 'react';
import { MovieRequest, MovieResponse } from '@/types/movies';
import { ContextSection } from './sections/ContextSection';
import { MoodSection } from './sections/MoodSection';
import { FiltersSection } from './sections/FiltersSection';
import { SelectedOptions } from './SelectedOptions';
import { PromotionalBanner } from '@/components/ui/shared';
import { MovieActions } from './MovieActions';
import { useMoviesForm } from '@/hooks/movies/useMoviesForm';
import { useMoviesApi } from '@/hooks/movies/useMoviesApi';
// import { useMovieErrorHandler } from '@/lib/error-handling';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { LUCKY_COMBINATIONS, MOVIE_SECTIONS } from '@/constants/movies.constants';
import { MOVIES_BANNER } from '@/constants/movies.constants';
import { UniversalLoader } from '../ui/UniversalLoader';
import { MovieResult } from './MovieResult';

interface MovieSelectorProps {
  onMovieGenerated?: (movie: MovieResponse) => void;
  onRequestChange?: (request: MovieRequest) => void;
  currentRequest?: MovieRequest;
}

export function MovieSelector({
  onMovieGenerated,
  onRequestChange,
  currentRequest = {}
}: MovieSelectorProps) {
  
  const [activeSection, setActiveSection] = useState<'context' | 'mood' | 'filters'>('context');
  const [result, setResult] = useState<MovieResponse | null>(null);
  
  const loaderContainerRef = useRef<HTMLDivElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const errorContainerRef = useRef<HTMLDivElement>(null);

  const { request: movieRequest, isValid, updateRequest, resetRequest } = useMoviesForm(currentRequest);
  
  const { generateRecommendation, isLoading: apiIsLoading, error, clearError } = useMoviesApi({
    onSuccess: (movie) => {
      setResult(movie);
      onMovieGenerated?.(movie);
    },
    enableCache: true,
    cacheTTL: 3600000
  });

  // const { showMovieInfo, handleMovieError } = useMovieErrorHandler();

  useEffect(() => {
    onRequestChange?.(movieRequest);
  }, [movieRequest, onRequestChange]);

  useEffect(() => {
    if (apiIsLoading && loaderContainerRef.current) {
      console.log('🎬 Скроллим к лоадеру!');
      loaderContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [apiIsLoading]);

  // . Скролл к ошибке
  useEffect(() => {
    if (error && errorContainerRef.current) {
      setTimeout(() => {
        errorContainerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 100);
    }
  }, [error]);

  useEffect(() => {
    if (result && resultsContainerRef.current) {
      resultsContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [result]);



  const handleGenerate = async (excludeTitle?: string) => {
    if (excludeTitle && typeof excludeTitle !== 'string') {
      excludeTitle = undefined;
    }
    
    if (!isValid || apiIsLoading) return;
    
    setResult(null);
    clearError();

    try {
      // 👇 СОЗДАЁМ НОВЫЙ ОБЪЕКТ ЗАПРОСА С ИСКЛЮЧЕНИЕМ
      const requestWithExclude = {
        ...movieRequest,
        ...(excludeTitle && { exclude_titles: [excludeTitle] })
      };
      const movieData = await generateRecommendation(requestWithExclude);
      setResult(movieData);
    } catch (error) {
      console.error('❌ Ошибка случайного выбора:', error);
    }
  };

  const handleLucky = async () => {
    setResult(null);
    clearError();

    try {
      const randomIndex = Math.floor(Math.random() * LUCKY_COMBINATIONS.length);
      const randomCombination = LUCKY_COMBINATIONS[randomIndex];

      resetRequest();
      updateRequest({
        context: randomCombination.context,
        mood: randomCombination.mood,
        genres: [...randomCombination.genres]
      });


      const luckyRequest = {
        context: randomCombination.context,
        mood: randomCombination.mood,
        genres: [...randomCombination.genres],
        format: [],
        duration: 'any',
        year: 'any',
        country: 'any',
        rating: 'any'
      };

      const movieData = await generateRecommendation(luckyRequest);
      setResult(movieData);
    } catch (error) {
      console.error('❌ Ошибка случайного выбора:', error);
    }
  };



  return (
    <div className="space-y-6">
      <PromotionalBanner
        title={MOVIES_BANNER.title}
        description={MOVIES_BANNER.description}
        route={MOVIES_BANNER.route}
        emoji={MOVIES_BANNER.emoji}
      />
      
      <SelectedOptions request={movieRequest} />
      
      <div className="bg-card rounded-2xl shadow-lg p-6">
        {/* Навигация */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 mb-6 p-2 sm:p-1 bg-muted rounded-xl">
          {MOVIE_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-all flex-1 justify-center text-sm sm:text-base ${
                activeSection === section.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>{section.icon}</span>
              <span className="font-medium">{section.label}</span>
            </button>
          ))}
        </div>

        {/* Секции */}
        <div className="mb-6 min-h-[300px]">
          {activeSection === 'context' && (
            <ContextSection request={movieRequest} onChange={updateRequest} />
          )}
          {activeSection === 'mood' && (
            <MoodSection request={movieRequest} onChange={updateRequest} />
          )}
          {activeSection === 'filters' && (
            <FiltersSection request={movieRequest} onChange={updateRequest} />
          )}
        </div>

        {/* Кнопки */}
        <MovieActions
          isFormValid={isValid}
          isGenerating={apiIsLoading}
          onGenerate={() => handleGenerate()}
          onLucky={handleLucky}
        />
        
        {!isValid && (
          <p className="text-sm text-muted-foreground mt-3 text-center">
            Выберите с кем смотрим и добавьте настроение или 2+ жанра
          </p>
        )}
      </div>

      {/* Лоадер */}
      <div ref={loaderContainerRef}>
        <UniversalLoader
          isVisible={apiIsLoading}
          title="Ищем идеальный фильм"
          message="Анализируем ваши предпочтения..."
        />
      </div>


      {/* ⚠️ БЛОК ОШИБКИ — на том же месте, где будет результат! */}
      <div ref={errorContainerRef} className="scroll-mt-24">
        {error && !apiIsLoading && (
          <ErrorDisplay
            error={error}
            onRetry={handleGenerate}
            onDismiss={clearError}
            module="movies"
          />
        )}
      </div>

      {/* Результат */}
      <div ref={resultsContainerRef} className="scroll-mt-24">
        {result && !apiIsLoading && (
          <MovieResult
            movie={result}
            onSave={() => console.log('Сохранение фильма:', result)}
            onGenerateAnother={(excludeTitle) => handleGenerate(excludeTitle)}
          />
        )}
      </div>
    </div>
  );
}