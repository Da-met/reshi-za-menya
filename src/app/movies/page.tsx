'use client';

import { Suspense, lazy, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { MovieResponse, MovieRequest } from '@/types/movies';

// Ленивая загрузка компонентов
const MovieSelector = lazy(() => 
  import('@/components/movies/MovieSelector').then(mod => ({
    default: mod.MovieSelector
  }))
);

const SavedMovies = lazy(() => 
  import('@/components/movies/SavedMovies').then(mod => ({
    default: mod.SavedMovies
  }))
);


// Компонент загрузки
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Загрузка модуля фильмов...</p>
      </div>
    </div>
  );
}

function MoviesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentView, setCurrentView] = useState<'generator' | 'saved'>('generator');
  const [currentRequest, setCurrentRequest] = useState<MovieRequest>({});

  // При загрузке проверяем параметр URL
  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'saved') {
      setCurrentView('saved');
    }
  }, [searchParams]);

  const handleMovieGenerated = (movie: MovieResponse) => {
    console.log('Фильм сгенерирован:', movie);
  };

  const handleRequestChange = (request: MovieRequest) => {
    setCurrentRequest(request);
  };

  const handleViewChange = (view: 'generator' | 'saved') => {
    setCurrentView(view);
    const newParams = new URLSearchParams(searchParams.toString());
    if (view === 'saved') {
      newParams.set('view', 'saved');
    } else {
      newParams.delete('view');
    }
    router.replace(`/movies?${newParams.toString()}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-background py-6 md:py-8 lg:py-10">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Заголовок и навигация */}
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-accent text-foreground mb-3 md:mb-4">
            Что посмотреть?
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
            Найдем идеальный фильм или сериал для вашего настроения
          </p>

          {/* Переключение между вкладками */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-6 md:mb-8">
            <button
              onClick={() => handleViewChange('generator')}
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
              onClick={() => handleViewChange('saved')}
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

        {/* Динамическая загрузка компонентов */}
        <Suspense fallback={
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Загрузка...</p>
            </div>
          </div>
        }>
          {currentView === 'generator' ? (
            <MovieSelector
              onMovieGenerated={handleMovieGenerated}
              onRequestChange={handleRequestChange}
              currentRequest={currentRequest}
            />
          ) : (
            <SavedMovies />
          )}
        </Suspense>
      </div>
    </div>
  );
}

export default function MoviesPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <MoviesContent />
    </Suspense>
  );
}