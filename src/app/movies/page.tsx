
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { MovieResponse, MovieRequest } from '@/types/movies';
import { MovieGenerator } from '@/components/movies/MovieGenerator';
import { MovieResult } from '@/components/movies/MovieResult';
import { SavedMovies } from '@/components/movies/SavedMovies'; // Добавляем импорт

export default function MoviesPage() {
  const searchParams = useSearchParams();
  const [currentView, setCurrentView] = useState<'generator' | 'saved'>('generator');
  const [currentMovie, setCurrentMovie] = useState<MovieResponse | null>(null);
  const [currentRequest, setCurrentRequest] = useState<MovieRequest>({});
  const [isGenerating, setIsGenerating] = useState(false);

  // При загрузке проверяем параметр URL
  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'saved') {
      setCurrentView('saved');
    }
  }, [searchParams]);

  // Функция для переключения вкладок с обновлением URL
  const handleViewChange = (view: 'generator' | 'saved') => {
    setCurrentView(view);
    // Здесь можно добавить обновление URL если нужно
  };

  const handleMovieGenerated = (movie: MovieResponse) => {
    setCurrentMovie(movie);
  };

  const handleClearMovie = () => {
    setCurrentMovie(null);
  };

  const handleRequestChange = (request: MovieRequest) => {
    setCurrentRequest(request);
  };

  const handleSaveMovie = () => {
    console.log('Сохранение фильма:', currentMovie);
    // Здесь будет логика сохранения
  };

  return (
    <div className="min-h-screen bg-background py-6 md:py-8 lg:py-10">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Заголовок и навигация */}
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <h1 className="
            text-4xl md:text-5xl lg:text-6xl 
            font-accent
            text-foreground
            mb-3 md:mb-4
          ">
            Что посмотреть?
          </h1>
          <p className="
            text-base md:text-lg lg:text-xl
            text-muted-foreground
            mb-6 md:mb-8
            max-w-2xl
            mx-auto
          ">
            Найдем идеальный фильм или сериал для вашего настроения
          </p>
          
          {/* Переключение между вкладками */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-6 md:mb-8">
            <button
              onClick={() => setCurrentView('generator')}
              className={`
                px-5 py-3 md:px-6 md:py-3
                rounded-full
                font-medium
                transition-all
                text-sm md:text-base
                ${currentView === 'generator'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
                }
              `}
            >
              🎬 Генератор фильмов
            </button>
            <button
              onClick={() => setCurrentView('saved')}
              className={`
                px-5 py-3 md:px-6 md:py-3
                rounded-full
                font-medium
                transition-all
                text-sm md:text-base
                ${currentView === 'saved'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
                }
              `}
            >
              💾 Мои фильмы
            </button>
          </div>
        </div>

        {currentView === 'generator' ? (
          <>
            <MovieGenerator
              onMovieGenerated={handleMovieGenerated}
              isGenerating={isGenerating}
              onGeneratingChange={setIsGenerating}
              onRequestChange={handleRequestChange}
              currentRequest={currentRequest}
              onClearMovie={handleClearMovie}
            />
            
            {currentMovie && (
              <MovieResult
                movie={currentMovie}
                onSave={handleSaveMovie}
                onGenerateAnother={() => setCurrentMovie(null)}
              />
            )}
          </>
        ) : (
          <SavedMovies /> // Теперь используем полноценный компонент
        )}
      </div>
    </div>
  );
}