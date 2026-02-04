'use client';

import { MovieResponse } from '@/types/movies';
import { useState } from 'react';
import { RotateCw, Check, Sparkles, Film, Clock, Heart, Share2, Play, Calendar } from 'lucide-react';
import Image from 'next/image';

interface MovieResultProps {
  movie: MovieResponse;
  onSave: () => void;
  onGenerateAnother: () => void;
}

export function MovieResult({ movie, onSave, onGenerateAnother }: MovieResultProps) {
  const [saved, setSaved] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleSave = () => {
    onSave();
    setSaved(true);
  };

  const handleWatchClick = () => {
    window.open('https://start.ru/partner-link', '_blank');
  };

  const movieInfo = movie.recommendation;

  return (
    <div className="space-y-6 md:space-y-8 mt-8">
      {/* Блок "МЫ НАШЛИ ИДЕАЛЬНЫЙ ФИЛЬМ" */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-3">
          <Sparkles size={20} className="text-primary" />
          <h2 className="text-xl md:text-2xl lg:text-3xl font-accent text-foreground">
            МЫ НАШЛИ ИДЕАЛЬНЫЙ ФИЛЬМ!
          </h2>
          <Sparkles size={20} className="text-secondary" />
        </div>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          Вот что мы предлагаем для вашего настроения
        </p>
      </div>

      {/* Основной контент */}
      <div className="space-y-6">
        
        {/* Основной блок с фильмом */}
        <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
          
          {/* Верхняя часть */}
          <div className="p-6 md:p-8">
            <h1 className="text-xl md:text-2xl lg:text-3xl text-foreground mb-3">
              {movieInfo.title}
            </h1>
            
            {/* Чипы */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">
                {movieInfo.type === 'series' ? 'Сериал' : 'Фильм'}
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm">
                <Calendar size={12} className="mr-1" />
                {movieInfo.releaseYear}
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm">
                <Clock size={12} className="mr-1" />
                {movieInfo.runtime}
              </span>
              {movieInfo.kinopoiskRating && (
                <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs sm:text-sm">
                  <span className="mr-1">⭐</span>
                  {movieInfo.kinopoiskRating}
                </span>
              )}
            </div>
          </div>

          {/* Постер и детали */}
          <div className="border-t border-border p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              
              {/* Постер */}
              <div>
                {movieInfo.poster && !imageError ? (
                  <div className="relative rounded-lg overflow-hidden shadow-lg bg-muted/20">
                    <div className="aspect-[3/4] relative">
                      <Image 
                        src={movieInfo.poster}
                        alt={movieInfo.title}
                        fill
                        className="object-cover"
                        onError={() => setImageError(true)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center shadow-lg">
                    <Film className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground/50" />
                  </div>
                )}
              </div>

              {/* Детали фильма */}
              <div>
                <div className="space-y-4 md:space-y-6">
                  
                  {/* Информация */}
                  <div>
                    <h3 className="text-lg md:text-xl text-foreground mb-3">Информация</h3>
                    <div className="space-y-3 text-sm md:text-base">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Длительность:</span>
                        <span className="text-foreground">{movieInfo.runtime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Страна:</span>
                        <span className="text-foreground">{movieInfo.productionCountry}</span>
                      </div>
                      {movieInfo.director && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Режиссер:</span>
                          <span className="text-foreground text-right">{movieInfo.director}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Жанры */}
                  <div>
                    <h3 className="text-lg md:text-xl text-foreground mb-3">Жанры</h3>
                    <div className="flex flex-wrap gap-2">
                      {movieInfo.genre.map((genre, index) => (
                        <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs md:text-sm">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Актеры */}
                  {movieInfo.actors && movieInfo.actors.length > 0 && (
                    <div>
                      <h3 className="text-lg md:text-xl text-foreground mb-3">В ролях</h3>
                      <p className="text-sm md:text-base text-muted-foreground">
                        {movieInfo.actors.slice(0, 3).join(', ')}
                        {movieInfo.actors.length > 3 && '...'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Кнопка "Смотреть" */}
          <div className="border-t border-border p-6 md:p-8 bg-gradient-to-r from-primary/20 to-primary/30">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">Доступно для просмотра</p>
                <p className="text-lg md:text-xl font-bold text-primary">Кинопоиск, ivi, Netflix</p>
              </div>
              <button 
                onClick={handleWatchClick}
                className="
                  flex items-center justify-center gap-2
                  px-4 py-3
                  bg-green-600 text-white
                  rounded-lg
                  font-medium
                  hover:bg-green-700
                  transition-colors
                  w-full sm:w-auto
                  text-sm md:text-base
                "
              >
                <Play size={18} />
                <span>Смотреть онлайн</span>
              </button>
            </div>
          </div>

          {/* Описание фильма */}
          <div className="border-t border-border p-6 md:p-8">
            <div className="space-y-4">
              <h2 className="text-lg md:text-xl text-foreground">О фильме</h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {movieInfo.description}
              </p>
            </div>
          </div>

          {/* Почему подходит */}
          <div className="border-t border-border p-6 md:p-8 bg-primary/5">
            <div className="space-y-4">
              <h2 className="text-lg md:text-xl text-foreground">Почему это хорошая рекомендация</h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {movieInfo.whyMatch}
              </p>
            </div>
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="bg-card rounded-2xl shadow-lg p-4 md:p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Кнопки сохранить и поделиться */}
            <div className="flex flex-col xs:flex-row gap-3 flex-1">
              <button
                onClick={handleSave}
                disabled={saved}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-colors flex-1 min-w-0 ${
                  saved
                    ? 'bg-green-500 text-white cursor-not-allowed'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {saved ? <Check size={16} className="flex-shrink-0" /> : <Heart size={16} className="flex-shrink-0" />}
                <span className="font-semibold text-xs md:text-sm sm:text-base truncate">
                  {saved ? 'Сохранено!' : 'Сохранить фильм'}
                </span>
              </button>
              <button className="flex items-center justify-center gap-2 py-3 px-4 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-secondary/90 transition-colors flex-1 min-w-0">
                <Share2 size={16} className="flex-shrink-0" />
                <span className="text-xs md:text-sm sm:text-base truncate">Поделиться</span>
              </button>
            </div>
            
            {/* Кнопка другой вариант */}
            <button
              onClick={onGenerateAnother}
              className="flex items-center justify-center gap-2 py-3 px-4 border border-border text-foreground rounded-xl font-semibold hover:bg-accent transition-colors min-w-0"
            >
              <RotateCw size={16} className="flex-shrink-0" />
              <span className="text-xs md:text-sm sm:text-base truncate">Другой вариант</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}