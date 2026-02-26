'use client';

import React from 'react';
import { MovieRequest } from '@/types/movies';
import { 
  contextLabels, 
  moodLabels, 
  durationLabels, 
  countryLabels,
  yearLabels 
} from '@/constants/movies.constants';
import { Users, Film, Clock, Calendar, Globe } from 'lucide-react';

interface SelectedOptionsProps {
  request: MovieRequest;
}

function SelectedOptionsComponent({ request }: SelectedOptionsProps) {
  const hasSelections = 
    request.context ||
    request.mood ||
    request.genres?.length ||
    request.format?.length ||
    request.duration ||
    request.year ||
    request.country ||
    request.rating;

  if (!hasSelections) {
    return null;
  }

  const totalSelections = 
    (request.context ? 1 : 0) +
    (request.mood && request.mood !== 'any' ? 1 : 0) +
    (request.genres?.length || 0) +
    (request.format?.length || 0) +
    (request.duration && request.duration !== 'any' ? 1 : 0) +
    (request.year && request.year !== 'any' ? 1 : 0) +
    (request.country && request.country !== 'any' ? 1 : 0) +
    (request.rating && request.rating !== 'any' ? 1 : 0);

  return (
    <div className="bg-card rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border-l-4 border-primary">
      <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-foreground">
        Вы выбрали:
      </h3>

      <div className="flex flex-wrap gap-1 md:gap-2">
        {/* Контекст */}
        {request.context && (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm flex items-center space-x-1 flex-shrink-0">
            <Users size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{contextLabels[request.context]}</span>
          </span>
        )}

        {/* Настроение */}
        {request.mood && request.mood !== 'any' && (
          <span className="bg-purple-100 text-purple-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm flex items-center space-x-1 flex-shrink-0">
            <Film size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{moodLabels[request.mood]}</span>
          </span>
        )}

        {/* Жанры */}
        {request.genres?.map(genre => (
          <span key={genre} className="bg-green-100 text-green-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm flex items-center space-x-1 flex-shrink-0">
            <span className="truncate">🎭 {genre}</span>
          </span>
        ))}

        {/* Форматы */}
        {request.format?.map(format => (
          <span key={format} className="bg-orange-100 text-orange-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm flex items-center space-x-1 flex-shrink-0">
            <span className="truncate">
              {format === 'movie' ? '🎬 Фильм' :
               format === 'series' ? '📺 Сериал' :
               format === 'cartoon' ? '🐰 Мультфильм' : '🇯🇵 Аниме'}
            </span>
          </span>
        ))}

        {/* Длительность */}
        {request.duration && request.duration !== 'any' && (
          <span className="bg-red-100 text-red-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm flex items-center space-x-1 flex-shrink-0">
            <Clock size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{durationLabels[request.duration]}</span>
          </span>
        )}

        {/* Год */}
        {request.year && request.year !== 'any' && (
          <span className="bg-pink-100 text-pink-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm flex items-center space-x-1 flex-shrink-0">
            <Calendar size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{yearLabels[request.year]}</span>
          </span>
        )}

        {/* Страна */}
        {request.country && request.country !== 'any' && (
          <span className="bg-cyan-100 text-cyan-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm flex items-center space-x-1 flex-shrink-0">
            <Globe size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{countryLabels[request.country]}</span>
          </span>
        )}

        {/* Рейтинг - новый */}
        {request.rating && request.rating !== 'any' && (
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm flex items-center space-x-1 flex-shrink-0">
            <span className="truncate">⭐ {request.rating === 'high' ? '8.0+' : 
                                          request.rating === 'good' ? '7.0-8.0' : 
                                          request.rating === 'average' ? '6.0-7.0' : ''}</span>
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