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

interface ApiMovieData {
  // Поля которые могут прийти из API
  genre?: string | string[];
  actors?: string | string[];
  streamingPlatforms?: string | string[];
  tags?: string | string[];
  releaseYear?: string | number;
  kinopoiskRating?: string | number;
  imdbRating?: string | number;
  title?: string;
  description?: string;
  duration?: string | number;
  type?: string;
  whyMatch?: string;
  runtime?: string;
  productionCountry?: string;
  poster?: string;
  director?: string;
  streamingLink?: string;
  [key: string]: unknown;
}

export function MovieGenerator({
  onMovieGenerated,
  isGenerating = false,
  onGeneratingChange,
  currentRequest = {},
  onClearMovie
}: MovieGeneratorProps) {
  const [activeSection, setActiveSection] = useState<'context' | 'mood' | 'filters'>('context');
  const { movieRequest, isValid, handleRequestChange } = useMovieGeneration(currentRequest);
  const { generateRandomRequest } = useRandomMovies();

  // const handleGenerate = async () => {
  //   if (!isValid || isGenerating) return;
  //   onClearMovie?.();
  //   onGeneratingChange?.(true);
  
  //   // 🔍 ЛОГИРУЕМ ГОТОВЫЙ ОБЪЕКТ ДЛЯ БЭКЕНДА
  //   console.log('🎬 ОТПРАВЛЯЕМ НА БЭКЕНД:', movieRequest);
  
  //   // TODO: Заменить на реальный API вызов
  //   setTimeout(() => {
  //     const mockMovie: MovieResponse = {
  //       recommendation: {
  //         id: '1',
  //         title: 'Один дома',
  //         type: 'movie',
  //         genre: ['комедия', 'семейный'],
  //         releaseYear: 1990,
  //         description: 'Мальчик Кевин остался один дома на Рождество и защищает свой дом от грабителей.',
  //         whyMatch: 'Идеально для семейного просмотра - смешная и добрая комедия',
  //         runtime: '1ч 43м',
  //         productionCountry: 'США'
  //       },
  //       generationId: '123'
  //     };
      
  //     onMovieGenerated?.(mockMovie);
  //     onGeneratingChange?.(false);
  //   }, 2000);
  // };
  

  const handleGenerate = async () => {
    if (!isValid || isGenerating) return;
    onClearMovie?.();
    onGeneratingChange?.(true);

    try {
      const requestBody = {
        category: "Films",
        parameters: {
          context: movieRequest.context,
          mood: movieRequest.mood,
          genres: movieRequest.genres || [],
          format: movieRequest.format || [],
          duration: movieRequest.duration,
          year: movieRequest.year,
          country: movieRequest.country,
          rating: movieRequest.rating
        }
      };

      console.log('🎬 Отправляем запрос:', requestBody);

      const response = await fetch('/api/prompt-templates/generate-structured', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка API: ${response.status} - ${errorText}`);
      }

      const apiResponse = await response.json();
      console.log('🎬 Получен ответ:', apiResponse);

      // Функция адаптации данных от API
      const adaptApiResponse = (apiData: ApiMovieData): MovieResponse['recommendation'] => {
        return {
          // Обязательные поля с значениями по умолчанию
          id: Date.now().toString(),
          title: apiData.title || 'Название не указано',
          type: apiData.type || 'movie',
          description: apiData.description || 'Описание отсутствует',
          whyMatch: apiData.whyMatch || 'Отлично подходит под ваши предпочтения',
          
          // Исправляем runtime - преобразуем число в строку
          runtime: typeof apiData.runtime === 'string' 
            ? apiData.runtime 
            : typeof apiData.duration === 'string'
              ? apiData.duration
              : typeof apiData.duration === 'number'
                ? `${apiData.duration} мин`
                : '120 мин',
          
          productionCountry: apiData.productionCountry || 'США',
          
          // Преобразованные поля
          genre: typeof apiData.genre === 'string' 
            ? apiData.genre.split(', ').map((g: string) => g.trim())
            : Array.isArray(apiData.genre) ? apiData.genre : [],
          
          releaseYear: typeof apiData.releaseYear === 'string' 
            ? parseInt(apiData.releaseYear) 
            : typeof apiData.releaseYear === 'number' ? apiData.releaseYear : new Date().getFullYear(),
          
          // Остальные поля без изменений
          poster: apiData.poster,
          director: apiData.director,
          
          actors: typeof apiData.actors === 'string'
            ? apiData.actors.split(', ').map((a: string) => a.trim())
            : Array.isArray(apiData.actors) ? apiData.actors : undefined,
          
          kinopoiskRating: typeof apiData.kinopoiskRating === 'string'
            ? parseFloat(apiData.kinopoiskRating)
            : typeof apiData.kinopoiskRating === 'number' ? apiData.kinopoiskRating : undefined,
          
          imdbRating: typeof apiData.imdbRating === 'string'
            ? parseFloat(apiData.imdbRating)
            : typeof apiData.imdbRating === 'number' ? apiData.imdbRating : undefined,
          
          streamingPlatforms: typeof apiData.streamingPlatforms === 'string'
            ? apiData.streamingPlatforms.split(', ').map((p: string) => p.trim())
            : Array.isArray(apiData.streamingPlatforms) ? apiData.streamingPlatforms : undefined,
          
          streamingLink: apiData.streamingLink,
          
          tags: typeof apiData.tags === 'string'
            ? apiData.tags.split(', ').map((t: string) => t.trim())
            : Array.isArray(apiData.tags) ? apiData.tags : undefined
        };
      };


      const movieData: MovieResponse = {
        recommendation: {
          ...adaptApiResponse(apiResponse.jsonStructuredResponse),
          id: Date.now().toString(),
        },
        generationId: Date.now().toString()
      };

      console.log('🎬 Адаптированные данные:', movieData);
      onMovieGenerated?.(movieData);

    } catch (error) {
      console.error('❌ Ошибка генерации фильма:', error);
    } finally {
      onGeneratingChange?.(false);
    }
  };

  // const handleLucky = async () => {
  //   onClearMovie?.();
  //   onGeneratingChange?.(true);
    
  //   const randomRequest = generateRandomRequest();
    
  //   // 🔍 ЛОГИРУЕМ РАНДОМНЫЙ ОБЪЕКТ ДЛЯ БЭКЕНДА
  //   console.log('🎲 ОТПРАВЛЯЕМ РАНДОМНЫЙ ЗАПРОС:', randomRequest);
  
  //   // TODO: Заменить на реальный API вызов
  //   setTimeout(() => {
  //     const mockMovie: MovieResponse = {
  //       recommendation: {
  //         id: `lucky-${Date.now()}`,
  //         title: 'Случайный фильм',
  //         type: 'movie',
  //         genre: randomRequest.genres || [],
  //         releaseYear: 2020,
  //         description: 'Отличный выбор для случайного просмотра!',
  //         whyMatch: 'Идеально подходит для разнообразия',
  //         runtime: '1ч 30м - 2ч 10м',
  //         productionCountry: 'США'
  //       },
  //       generationId: `lucky-${Date.now()}`
  //     };
      
  //     onMovieGenerated?.(mockMovie);
  //     onGeneratingChange?.(false);
  //   }, 2000);
  // };

  const handleLucky = async () => {
    onClearMovie?.();
    onGeneratingChange?.(true);
    
    const randomRequest = generateRandomRequest();
    
    try {
      const response = await fetch('/api/prompt-templates/generate-structured', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateName: "smart_movie_recommendation",
          category: "Movies", 
          parameters: randomRequest
        })
      });

      if (!response.ok) throw new Error('Ошибка API');

      const apiResponse = await response.json();
      const movieData: MovieResponse = {
        recommendation: {
          ...apiResponse.jsonStructuredResponse,
          id: `lucky-${Date.now()}`
        },
        generationId: `lucky-${Date.now()}`
      };

      onMovieGenerated?.(movieData);
    } catch (error) {
      console.error('Ошибка случайного фильма:', error);
    } finally {
      onGeneratingChange?.(false);
    }
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
          isFormValid={isValid} // 👈 Явно говорим TypeScript что это boolean
          isGenerating={isGenerating}
          onGenerate={handleGenerate}
          onLucky={handleLucky}
        />

        {!isValid && (
          <p className="text-sm text-muted-foreground mt-3 text-center">
            Выберите с кем смотрим и добавьте настроение или 2+ жанра
          </p>
        )}
      </div>
    </div>
  );
}