// src/components/movies/MovieProductCard.tsx

'use client';

import React from 'react';
import { Film, Clock, Calendar, Play, Star, Globe } from 'lucide-react';
import { SafeImage } from '@/components/ui/safe/SafeImage';


interface MovieProductCardProps {
  movie: {
    id: string;
    title: string;
    type: string;
    genre: string[];
    releaseYear: number;
    description: string;
    whyMatch: string;
    runtime: string;
    productionCountry: string;
    director?: string;
    actors?: string[];
    kinopoiskRating?: number;
    imdbRating?: number;
    poster?: string;
    streamingPlatforms?: string[];
    streamingLink?: string;
  };
  showWatchButton?: boolean;
  className?: string;
}

function MovieProductCardComponent({ 
  movie, 
  showWatchButton = true,
  className = '' 
}: MovieProductCardProps) {

  const handleWatchClick = () => {
    window.open(movie.streamingLink || 'https://start.ru/partner-link', '_blank');
  };

  return (
    <div className={`bg-card rounded-2xl shadow-lg overflow-hidden ${className}`}>
      {/* Верхняя часть - КАК В BookProductCard */}
      <div className="p-6 md:p-8">
        {/* Заголовок и автор (режиссёр) */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0 mr-4">
            <h1 className="text-2xl md:text-3xl text-foreground mb-3">
              {movie.title}
            </h1>
            {movie.director && (
              <p className="text-xl text-muted-foreground">
                Режиссёр: {movie.director}
              </p>
            )}
          </div>
        </div>

        {/* Чипы - КАК В BookProductCard */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">
            {movie.type === 'series' ? 'Сериал' : 'Фильм'}
          </span>
          <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm">
            <Calendar size={12} className="sm:size-[14px] mr-1" />
            {movie.releaseYear}
          </span>
          <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm">
            <Clock size={12} className="sm:size-[14px] mr-1" />
            {movie.runtime}
          </span>
          {movie.productionCountry && (
            <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm">
              <Globe size={12} className="sm:size-[14px] mr-1" />
              {movie.productionCountry}
            </span>
          )}
          {movie.kinopoiskRating && (
            <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs sm:text-sm">
              <Star size={12} className="sm:size-[14px] mr-1 fill-yellow-500" />
              {movie.kinopoiskRating}
            </span>
          )}
        </div>

        {/* Постер и детали - горизонтально на десктопе, КАК В BookProductCard */}
        <div className="flex flex-col lg:flex-row gap-8 mb-6">
          {/* Постер */}
          <div className="lg:w-2/5">
            {movie.poster ? (
              <div className="w-full max-w-sm mx-auto lg:max-w-full relative rounded-lg overflow-hidden shadow-lg">
                <div className="aspect-[3/4] relative">
                  <SafeImage
                    src={movie.poster}
                    alt={`Постер фильма "${movie.title}"`}
                    maxHeight="100%"
                  />
                </div>
              </div>
            ) : (
              <div className="w-full max-w-sm mx-auto lg:max-w-full aspect-[3/4] bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center shadow-lg">
                <div className="text-center p-6">
                  <Film className="w-16 h-16 text-purple-600 mb-4 mx-auto" />
                  <p className="text-sm text-purple-800 font-medium">{movie.title}</p>
                  <p className="text-xs text-purple-600 mt-1">{movie.type === 'series' ? 'Сериал' : 'Фильм'}</p>
                </div>
              </div>
            )}
          </div>

          {/* Детали фильма - КАК В BookProductCard */}
          <div className="lg:w-3/5">
            <div className="space-y-4">
              {/* Информация */}
              <div>
                <h3 className="text-lg text-foreground mb-2">Информация</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Тип:</span>
                    <span className="text-foreground">{movie.type === 'series' ? 'Сериал' : 'Фильм'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Год:</span>
                    <span className="text-foreground">{movie.releaseYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Длительность:</span>
                    <span className="text-foreground">{movie.runtime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Страна:</span>
                    <span className="text-foreground">{movie.productionCountry}</span>
                  </div>
                  {movie.director && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Режиссёр:</span>
                      <span className="text-foreground">{movie.director}</span>
                    </div>
                  )}
                  {movie.kinopoiskRating && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Рейтинг Кинопоиск:</span>
                      <span className="text-foreground">{movie.kinopoiskRating}</span>
                    </div>
                  )}
                  {movie.imdbRating && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Рейтинг IMDb:</span>
                      <span className="text-foreground">{movie.imdbRating}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Жанры - КАК В BookProductCard */}
              {movie.genre && movie.genre.length > 0 && (
                <div>
                  <h3 className="text-lg text-foreground mb-2">Жанры</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genre.map((genre, index) => (
                      <span key={index} className="px-2 py-1 bg-primary-foreground text-primary rounded text-sm">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Актёры - КАК В BookProductCard (как особенности) */}
              {movie.actors && movie.actors.length > 0 && (
                <div>
                  <h3 className="text-lg text-foreground mb-2">В ролях</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {movie.actors.slice(0, 8).map((actor, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {actor}
                      </li>
                    ))}
                    {movie.actors.length > 8 && (
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span className="text-muted-foreground">и ещё {movie.actors.length - 8}</span>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Кнопка "Смотреть" - КАК В BookProductCard */}
        {showWatchButton && (
          <div className="mb-6 p-4 bg-gradient-to-r from-primary/20 to-primary/30 rounded-xl border border-primary/20">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">Доступно для просмотра</p>
                <p className="text-2xl font-bold text-primary">
                  {movie.streamingPlatforms?.slice(0, 3).join(', ') || 'Кинопоиск, ivi, Netflix'}
                </p>
              </div>
              <button
                onClick={handleWatchClick}
                className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors w-full sm:w-auto"
              >
                <Play size={20} />
                <span>Смотреть онлайн</span>
              </button>
            </div>
          </div>
        )}

        {/* Описание - КАК В BookProductCard */}
        <div className="mb-6">
          <h2 className="text-xl text-foreground mb-3">О фильме</h2>
          <p className="text-muted-foreground leading-normal text-sm md:text-base font-medium">
            {movie.description}
          </p>
        </div>

        {/* Почему подходит - КАК В BookProductCard */}
        <div className="mb-2">
          <h2 className="text-xl text-foreground mb-3">Почему это хорошая рекомендация</h2>
          <p className="text-muted-foreground leading-normal text-sm md:text-base font-medium">
            {movie.whyMatch}
          </p>
        </div>
      </div>
    </div>
  );
}

export const MovieProductCard = React.memo(MovieProductCardComponent);
MovieProductCard.displayName = 'MovieProductCard';