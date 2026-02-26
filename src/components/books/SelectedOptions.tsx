'use client';

import React from 'react';
import { BookRequest } from '@/types/books';
import { Heart, BookOpen, Clock, Calendar, Globe, Users, Star } from 'lucide-react';


interface SelectedOptionsProps {
  request: BookRequest;
}

const moodLabels: Record<string, string> = {
  relax: 'Расслабиться',
  inspire: 'Вдохновиться',
  think: 'Подумать',
  entertain: 'Развлечься',
  learn: 'Узнать новое',
  emotions: 'Пережить эмоции',
  escape: 'Погрузиться в мир',
  any: 'Любое'
};

const volumeLabels: Record<string, string> = {
  single: 'Одна книга',
  short_series: 'Короткая серия',
  long_series: 'Длинная серия',
  any: 'Любой объем'
};

const paceLabels: Record<string, string> = {
  dynamic: 'Динамичный',
  moderate: 'Умеренный',
  leisurely: 'Неторопливый',
  any: 'Любой'
};

const emotionalLabels: Record<string, string> = {
  light: 'Легкая',
  emotional: 'Эмоциональная',
  dramatic: 'Драматичная',
  any: 'Любая'
};

const regionLabels: Record<string, string> = {
  russian: 'Русскоязычная',
  europe_america: 'Европа и Америка',
  asia: 'Азия',
  other: 'Другие регионы',
  any: 'Любой регион'
};

const periodLabels: Record<string, string> = {
  modern: 'Современная',
  recent: 'Новейшая',
  '20th': 'XX век',
  classic: 'Классика',
  any: 'Любое время'
};

const audienceLabels: Record<string, string> = {
  child: 'Детская',
  teen: 'Подростковая',
  adult: 'Взрослая',
  any: 'Любая'
};

const popularityLabels: Record<string, string> = {
  bestseller: 'Бестселлер',
  average: 'Средняя популярность',
  hidden_gem: 'Малоизвестная жемчужина',
  any: 'Любая'
};

const SelectedOptionsComponent = ({ request }: SelectedOptionsProps) => {
  const hasSelections =
    request.readingMood ||
    request.preferredGenres?.length ||
    request.bookLength ||
    request.narrativePace ||
    request.emotionalIntensity ||
    request.specialFeatures?.length ||
    request.authorRegion ||
    request.publicationPeriod ||
    request.targetAudience ||
    request.popularityLevel;

  if (!hasSelections) {
    return null;
  }

  // Считаем общее количество выбранных параметров
  const totalSelections =
    (request.readingMood ? 1 : 0) +
    (request.preferredGenres?.length || 0) +
    (request.bookLength ? 1 : 0) +
    (request.narrativePace ? 1 : 0) +
    (request.emotionalIntensity ? 1 : 0) +
    (request.specialFeatures?.length || 0) +
    (request.authorRegion ? 1 : 0) +
    (request.publicationPeriod ? 1 : 0) +
    (request.targetAudience ? 1 : 0) +
    (request.popularityLevel ? 1 : 0);

  return (
    <div className="bg-card rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border-l-4 border-primary">
      <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-foreground">
        Вы выбрали:
      </h3>
      
      {/* Контейнер для выбранных опций */}
      <div className="flex flex-wrap gap-1 md:gap-2">
        {/* Настроение */}
        {request.readingMood && request.readingMood !== 'any' && (
          <span className="
            bg-section-development/20 text-section-development
            px-2 py-1 md:px-3 md:py-1
            rounded-full
            text-xs md:text-sm
            font-medium
            flex items-center space-x-1
            flex-shrink-0
          ">
            <Heart size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{moodLabels[request.readingMood]}</span>
          </span>
        )}

        {/* Жанры и интересы */}
        {request.preferredGenres?.map(preferredGenres => (
          <span key={preferredGenres} className="
            bg-blue-100 text-blue-800
            px-2 py-1 md:px-3 md:py-1
            rounded-full
            text-xs md:text-sm
            flex items-center space-x-1
            flex-shrink-0
          ">
            <BookOpen size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{preferredGenres}</span>
          </span>
        ))}

        {/* Объем */}
        {request.bookLength && request.bookLength !== 'any' && (
          <span className="
            bg-green-100 text-green-800
            px-2 py-1 md:px-3 md:py-1
            rounded-full
            text-xs md:text-sm
            flex items-center space-x-1
            flex-shrink-0
          ">
            <Clock size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{volumeLabels[request.bookLength]}</span>
          </span>
        )}

        {/* Темп */}
        {request.narrativePace && request.narrativePace !== 'any' && (
          <span className="
            bg-purple-100 text-purple-800
            px-2 py-1 md:px-3 md:py-1
            rounded-full
            text-xs md:text-sm
            flex items-center space-x-1
            flex-shrink-0
          ">
            <span className="truncate">🏃 {paceLabels[request.narrativePace]}</span>
          </span>
        )}

        {/* Эмоциональная насыщенность */}
        {request.emotionalIntensity && request.emotionalIntensity !== 'any' && (
          <span className="
            bg-pink-100 text-pink-800
            px-2 py-1 md:px-3 md:py-1
            rounded-full
            text-xs md:text-sm
            flex items-center space-x-1
            flex-shrink-0
          ">
            <span className="truncate">💫 {emotionalLabels[request.emotionalIntensity]}</span>
          </span>
        )}

        {/* Особенности */}
        {request.specialFeatures?.map(feature => (
          <span key={feature} className="
            bg-yellow-100 text-yellow-800
            px-2 py-1 md:px-3 md:py-1
            rounded-full
            text-xs md:text-sm
            flex items-center space-x-1
            flex-shrink-0
          ">
            <Star size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{feature}</span>
          </span>
        ))}

        {/* Регион */}
        {request.authorRegion && request.authorRegion !== 'any' && (
          <span className="
            bg-indigo-100 text-indigo-800
            px-2 py-1 md:px-3 md:py-1
            rounded-full
            text-xs md:text-sm
            flex items-center space-x-1
            flex-shrink-0
          ">
            <Globe size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{regionLabels[request.authorRegion]}</span>
          </span>
        )}

        {/* Период */}
        {request.publicationPeriod && request.publicationPeriod !== 'any' && (
          <span className="
            bg-orange-100 text-orange-800
            px-2 py-1 md:px-3 md:py-1
            rounded-full
            text-xs md:text-sm
            flex items-center space-x-1
            flex-shrink-0
          ">
            <Calendar size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{periodLabels[request.publicationPeriod]}</span>
          </span>
        )}

        {/* Аудитория */}
        {request.targetAudience && request.targetAudience !== 'any' && (
          <span className="
            bg-teal-100 text-teal-800
            px-2 py-1 md:px-3 md:py-1
            rounded-full
            text-xs md:text-sm
            flex items-center space-x-1
            flex-shrink-0
          ">
            <Users size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{audienceLabels[request.targetAudience]}</span>
          </span>
        )}

        {/* Популярность */}
        {request.popularityLevel && request.popularityLevel !== 'any' && (
          <span className="
            bg-red-100 text-red-800
            px-2 py-1 md:px-3 md:py-1
            rounded-full
            text-xs md:text-sm
            flex items-center space-x-1
            flex-shrink-0
          ">
            <Star size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{popularityLabels[request.popularityLevel]}</span>
          </span>
        )}
      </div>
      
      {/* Счетчик выбранных параметров */}
      <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-border">
        <p className="text-xs md:text-sm text-muted-foreground">
          Выбрано параметров: {totalSelections}
        </p>
      </div>
    </div>
  );
}


export const SelectedOptions = React.memo(SelectedOptionsComponent);
SelectedOptions.displayName = 'SelectedOptions';