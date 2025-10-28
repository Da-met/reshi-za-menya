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
  const [imageError, setImageError] = useState(false); // 👈 ДОБАВЛЯЕМ ЭТО

  const handleSave = () => {
    onSave();
    setSaved(true);
  };

  const handleWatchClick = () => {
    window.open('https://start.ru/partner-link', '_blank');
  };

  return (
    <div className="min-h-screen bg-background py-6 md:py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Блок "МЫ НАШЛИ ИДЕАЛЬНЫЙ ФИЛЬМ" */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <Sparkles size={24} className="text-primary" />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-accent text-foreground">
              МЫ НАШЛИ ИДЕАЛЬНЫЙ ФИЛЬМ!
            </h1>
            <Sparkles size={24} className="text-secondary" />
          </div>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Вот что мы предлагаем для вашего настроения
          </p>
        </div>

        {/* Основной контент */}
        <div className="space-y-8">
          {/* Основной блок с фильмом */}
          <div className="bg-card rounded-2xl shadow-lg p-4 md:p-8">
            
            {/* Заголовок */}
            <div className="mb-4">
              <h1 className="text-2xl md:text-3xl text-foreground mb-3">
                {movie.recommendation.title}
              </h1>
            </div>

            {/* Чипы */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">
                {movie.recommendation.type === 'series' ? 'Сериал' : 'Фильм'}
              </span>
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm">
                <Calendar size={12} className="sm:size-[14px] mr-1" />
                {movie.recommendation.releaseYear}
              </span>
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm">
                <Clock size={12} className="sm:size-[14px] mr-1" />
                {movie.recommendation.runtime}
              </span>
              {movie.recommendation.kinopoiskRating && (
                <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs sm:text-sm">
                  <span className="mr-1">⭐</span>
                  {movie.recommendation.kinopoiskRating}
                </span>
              )}
            </div>

            {/* Постер и детали - горизонтально на десктопе */}
            <div className="flex flex-col lg:flex-row gap-8 mb-6">
              
              {/* Постер - такой же размер как в saved/[id] */}
              <div className="lg:w-2/5">
                {movie.recommendation.poster && !imageError ? (
                  <div className="w-full max-w-sm mx-auto lg:max-w-full relative rounded-lg overflow-hidden shadow-lg">
                    <div className="aspect-[3/4] relative">
                      <Image 
                        src={movie.recommendation.poster}
                        alt={movie.recommendation.title}
                        width={0}
                        height={0}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)} // 👈 ОБРАБОТКА ОШИБКИ
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-full max-w-sm mx-auto lg:max-w-full aspect-[3/4] bg-muted rounded-lg flex items-center justify-center shadow-lg">
                    <Film size={48} className="text-muted-foreground/50" />
                  </div>
                )}
              </div>

              {/* Детали фильма */}
              <div className="lg:w-3/5">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg text-foreground mb-2">Информация</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Длительность:</span>
                        <span className="text-foreground">{movie.recommendation.runtime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Страна:</span>
                        <span className="text-foreground">{movie.recommendation.productionCountry}</span>
                      </div>
                      {movie.recommendation.director && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Режиссер:</span>
                          <span className="text-foreground text-right">{movie.recommendation.director}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Жанры */}
                  <div>
                    <h3 className="text-lg text-foreground mb-2">Жанры</h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.recommendation.genre.map((genre, index) => (
                        <span key={index} className="px-2 py-1 bg-primary-foreground text-primary rounded text-sm">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Актеры */}
                  {movie.recommendation.actors && (
                    <div>
                      <h3 className="text-lg text-foreground mb-2">В ролях</h3>
                      <p className="text-sm text-muted-foreground">
                        {movie.recommendation.actors.slice(0, 3).join(', ')}
                        {movie.recommendation.actors.length > 3 && '...'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Кнопка "Смотреть" */}
            <div className="mb-6 p-4 bg-gradient-to-r from-primary/20 to-primary/30 rounded-xl border border-primary/20">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-sm text-muted-foreground">Доступно для просмотра</p>
                  <p className="text-2xl font-bold text-primary">Кинопоиск, ivi, Netflix</p>
                </div>
                <button 
                  onClick={handleWatchClick}
                  className="
                    flex items-center justify-center gap-2
                    px-4 py-3 sm:py-2
                    bg-green-600 text-white
                    rounded-lg
                    font-medium
                    hover:bg-green-700
                    transition-colors
                    w-full sm:w-auto
                  "
                >
                  <Play size={20} />
                  <span>Смотреть онлайн</span>
                </button>
              </div>
            </div>

            {/* Описание фильма */}
            <div className="mb-6">
              <h2 className="text-xl text-foreground mb-3">О фильме</h2>
              <p className="text-muted-foreground leading-normal text-sm md:text-base font-medium">
                {movie.recommendation.description}
              </p>
            </div>

            {/* Почему подходит */}
            <div className="mb-2">
              <h2 className="text-xl text-foreground mb-3">Почему это хорошая рекомендация</h2>
              <p className="text-muted-foreground leading-normal text-sm md:text-base font-medium">
                {movie.recommendation.whyMatch}
              </p>
            </div>
          </div>

          {/* Кнопки действий - АДАПТИВНЫЕ */}
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
                  {saved ? <Check size={18} className="flex-shrink-0" /> : <Heart size={18} className="flex-shrink-0" />}
                  <span className="font-semibold text-sm sm:text-base truncate">
                    {saved ? 'Сохранено!' : 'Сохранить фильм'}
                  </span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-secondary/90 transition-colors flex-1 min-w-0">
                  <Share2 size={18} className="flex-shrink-0" />
                  <span className="text-sm sm:text-base truncate">Поделиться</span>
                </button>
              </div>

              {/* Кнопка другой вариант */}
              <button
                onClick={onGenerateAnother}
                className="flex items-center justify-center gap-2 py-3 px-4 border border-border text-foreground rounded-xl font-semibold hover:bg-accent transition-colors min-w-0"
              >
                <RotateCw size={18} className="flex-shrink-0" />
                <span className="text-sm sm:text-base truncate">Другой вариант</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}