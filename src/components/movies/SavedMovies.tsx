'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Trash2, Clock, MoreVertical, Eye, EyeOff, Star } from 'lucide-react';
import { SavedMovie } from '@/types/movies';
import { MovieOptionTag } from './MovieOptionTag';
import { EmptyState, PromotionalBanner } from '@/components/ui/shared';
import { MOVIES_BANNER } from '@/constants/movies.constants';
import { 
  contextLabels, 
  moodLabels, 
  formatLabels 
} from '@/constants/movies.constants';



// Временные данные
const mockSavedMovies: SavedMovie[] = [
  {
    id: '1',
    movieData: {
      recommendation: {
        id: 'movie-1',
        title: 'Назад в будущее',
        type: 'movie',
        genre: ['фантастика', 'комедия', 'приключения'],
        releaseYear: 1985,
        description: 'Подросток Марти Макфлай случайно попадает в прошлое на машине времени, построенной его другом-учёным доком Брауном.',
        whyMatch: 'Идеально подходит для семейного просмотра, сочетает юмор и захватывающий сюжет',
        runtime: '116 мин',
        productionCountry: 'США',
        kinopoiskRating: 8.5
      },
      generationId: 'gen-1'
    },
    requestData: {
      context: 'family',
      mood: 'funny',
      genres: ['comedy', 'adventure'],
      format: ['movie'],
      year: '80s'
    },
    createdAt: new Date('2024-01-15'),
    userComment: 'Отличный фильм для просмотра с детьми-подростками',
    userRating: 9,
    watched: true,
    watchDate: new Date('2024-01-20')
  },
  {
    id: '2',
    movieData: {
      recommendation: {
        id: 'movie-2',
        title: 'Острые козырьки',
        type: 'series',
        genre: ['криминал', 'драма'],
        releaseYear: 2013,
        description: 'Британская криминальная драма о семье Шелби, которая контролирует криминальный мир Бирмингема 1920-х годов.',
        whyMatch: 'Подходит для любителей интеллектуальных криминальных драм с глубокими персонажами',
        runtime: '6 сезонов',
        productionCountry: 'Великобритания',
        kinopoiskRating: 8.8
      },
      generationId: 'gen-2'
    },
    requestData: {
      context: 'solo',
      mood: 'thrilling',
      genres: ['drama', 'crime'],
      format: ['series'],
      year: '2010s'
    },
    createdAt: new Date('2024-01-10')
  }
];

export function SavedMoviesComponent() {
  const router = useRouter();
  const [savedMovies, setSavedMovies] = useState<SavedMovie[]>(mockSavedMovies);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDeleteMovie = (movieId: string) => {
    console.log('Удаление фильма:', movieId);
    setSavedMovies(prev => prev.filter(movie => movie.id !== movieId));
    setActiveDropdown(null);
  };

  const handleToggleWatched = (movieId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedMovies(prev => prev.map(movie => 
      movie.id === movieId 
        ? { ...movie, watched: !movie.watched, watchDate: !movie.watched ? new Date() : undefined }
        : movie
    ));
  };

  const handleOpenMovie = (movieId: string) => {
    router.push(`/movies/saved/${movieId}`);
  };

  const toggleDropdown = (movieId: string) => {
    setActiveDropdown(activeDropdown === movieId ? null : movieId);
  };

  if (savedMovies.length === 0) {
    return (
      <>
        <PromotionalBanner
          title={MOVIES_BANNER.title}
          description={MOVIES_BANNER.description}
          route={MOVIES_BANNER.route}
          emoji={MOVIES_BANNER.emoji}
        />
        <EmptyState
          icon="🎬"
          title="Нет сохраненных фильмов"
          description="Сохраняйте понравившиеся рекомендации фильмов и сериалов, чтобы вернуться к ним позже"
          variant="compact"
        />
      </>
    );
  }

  return (
    <div className="space-y-6">
      <PromotionalBanner
        title={MOVIES_BANNER.title}
        description={MOVIES_BANNER.description}
        route={MOVIES_BANNER.route}
        emoji={MOVIES_BANNER.emoji}
      />
      <div className="flex items-center justify-between mb-3">
        <div>
          {/* <h2 className="text-2xl text-foreground mb-2">Мои фильмы</h2> */}
          <p className="text-muted-foreground">
            {savedMovies.length} сохранен{savedMovies.length === 1 ? 'ый' : 'ых'} фильм{savedMovies.length === 1 ? '' : 'а'}
          </p>
        </div>
      </div>

      <div className="grid gap-5">
        {savedMovies.map((savedMovie) => {
          const isDropdownOpen = activeDropdown === savedMovie.id;
          
          return (
            <div
              key={savedMovie.id}
              className="group bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-200 hover:shadow-sm cursor-pointer"
              onClick={() => handleOpenMovie(savedMovie.id)}
            >
              <div className="p-6">
                {/* Заголовок и меню */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl md:text-3xl text-foreground leading-tight break-words group-hover:text-primary transition-colors">
                      {savedMovie.movieData.recommendation.title}
                    </h3>
                    
                    {/* Мета-информация */}
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span className="text-lg text-primary font-semibold">
                        {savedMovie.movieData.recommendation.releaseYear}
                      </span>
                      <span className="text-lg text-primary font-semibold">
                        {savedMovie.movieData.recommendation.type === 'series' ? 'Сериал' : 'Фильм'}
                      </span>
                      {savedMovie.movieData.recommendation.kinopoiskRating && (
                        <span className="flex items-center gap-1 text-lg text-yellow-600 font-semibold">
                          <Star size={16} className="fill-yellow-500" />
                          {savedMovie.movieData.recommendation.kinopoiskRating}
                        </span>
                      )}
                      {savedMovie.userRating && (
                        <span className="flex items-center gap-1 text-lg text-blue-600 font-semibold">
                          <Star size={16} className="fill-blue-500" />
                          {savedMovie.userRating}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Выпадающее меню */}
                  <div className="relative flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(savedMovie.id);
                      }}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                    >
                      <MoreVertical size={16} />
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute right-0 top-full mt-1 w-32 bg-card border border-border rounded-lg shadow-lg z-10 py-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleWatched(savedMovie.id, e);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                        >
                          {savedMovie.watched ? <EyeOff size={14} /> : <Eye size={14} />}
                          {savedMovie.watched ? 'Не смотрел' : 'Посмотрел'}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteMovie(savedMovie.id);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                        >
                          <Trash2 size={14} />
                          Удалить
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Описание */}
                <p className="text-muted-foreground leading-relaxed text-sm mb-4 line-clamp-2">
                  {savedMovie.movieData.recommendation.description}
                </p>

                {/* Теги параметров */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {savedMovie.requestData.context && (
                    <MovieOptionTag
                      type="context"
                      label={contextLabels[savedMovie.requestData.context]}
                      value={savedMovie.requestData.context}
                    />
                  )}
                  
                  {savedMovie.requestData.mood && (
                    <MovieOptionTag
                      type="mood"
                      label={moodLabels[savedMovie.requestData.mood]}
                      value={savedMovie.requestData.mood}
                    />
                  )}
                  
                  {savedMovie.requestData.format?.slice(0, 1).map(format => (
                    <MovieOptionTag
                      key={format}
                      type="format"
                      label={formatLabels[format]}
                      value={format}
                    />
                  ))}

                  {savedMovie.movieData.recommendation.genre.slice(0, 2).map(genre => (
                    <MovieOptionTag
                      key={genre}
                      type="genre"
                      label={genre}
                      value={genre}
                    />
                  ))}
                </div>

                {/* Статус просмотра */}
                <div className="flex items-center gap-2 mb-4">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleWatched(savedMovie.id, e);
                    }}
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
                      savedMovie.watched 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {savedMovie.watched ? <Eye size={12} /> : <EyeOff size={12} />}
                    {savedMovie.watched ? 'Просмотрено' : 'Не просмотрено'}
                  </button>
                </div>

                {/* Комментарий */}
                {savedMovie.userComment && (
                  <div className="mb-4 p-3 bg-primary/20 border border-primary/30 rounded-lg">
                    <p className="text-sm text-foreground break-words">{savedMovie.userComment}</p>
                  </div>
                )}

                {/* Футер с датой */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock size={12} />
                    <span>Сохранено {savedMovie.createdAt.toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const SavedMovies = React.memo(SavedMoviesComponent);