'use client';

import { MovieRequest } from '@/types/movies';
import { Users, Film, Clock, Calendar, Globe } from 'lucide-react';

interface SelectedOptionsProps {
  request: MovieRequest;
}

const contextLabels: Record<string, string> = {
  family: 'Семьей',
  child: 'С ребенком', 
  friends: 'С друзьями',
  romance: 'На свидании',
  solo: 'В одиночку'
};

const moodLabels: Record<string, string> = {
  funny: 'Посмеяться',
  thrilling: 'Поволноваться',
  thoughtful: 'Подумать',
  any: 'Любое'
};

const durationLabels: Record<string, string> = {
  short: 'Короткий',
  medium: 'Средний', 
  long: 'Длинный',
  any: 'Любая'
};

const countryLabels: Record<string, string> = {
  russia: 'Россия',
  usa: 'США',
  europe: 'Европа', 
  korea: 'Корея',
  any: 'Любая'
};

export function SelectedOptions({ request }: SelectedOptionsProps) {
  const hasSelections =
    request.context ||
    request.mood ||
    request.genres?.length ||
    request.format?.length ||
    request.duration ||
    request.year ||
    request.country;

  if (!hasSelections) {
    return null;
  }

  // Считаем общее количество выбранных параметров
  const totalSelections =
    (request.context ? 1 : 0) +
    (request.mood ? 1 : 0) +
    (request.genres?.length || 0) +
    (request.format?.length || 0) +
    (request.duration ? 1 : 0) +
    (request.year ? 1 : 0) +
    (request.country ? 1 : 0);

  return (
    <div className="bg-card rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border-l-4 border-primary">
      <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-foreground">
        Вы выбрали:
      </h3>
      
      {/* Контейнер для выбранных опций */}
      <div className="flex flex-wrap gap-1 md:gap-2">
        {/* Контекст */}
        {request.context && (
          <span className="
            bg-section-development/20 text-section-development
            px-2 py-1 md:px-3 md:py-1
            rounded-full
            text-xs md:text-sm
            font-medium
            flex items-center space-x-1
            flex-shrink-0
          ">
            <Users size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{contextLabels[request.context]}</span>
          </span>
        )}
        
        {/* Настроение */}
        {request.mood && (
          <span className="
            bg-blue-100 text-blue-800
            px-2 py-1 md:px-3 md:py-1
            rounded-full
            text-xs md:text-sm
            flex items-center space-x-1
            flex-shrink-0
          ">
            <Film size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{moodLabels[request.mood]}</span>
          </span>
        )}
        
        {/* Жанры */}
        {request.genres?.map(genre => (
          <span key={genre} className="
            bg-green-100 text-green-800
            px-2 py-1 md:px-3 md:py-1
            rounded-full
            text-xs md:text-sm
            flex items-center space-x-1
            flex-shrink-0
          ">
            <span className="truncate">🎭 {genre}</span>
          </span>
        ))}
        
        {/* Форматы */}
        {request.format?.map(format => (
          <span key={format} className="
            bg-purple-100 text-purple-800
            px-2 py-1 md:px-3 md:py-1
            rounded-full
            text-xs md:text-sm
            flex items-center space-x-1
            flex-shrink-0
          ">
            <span className="truncate">
              {format === 'movie' ? '🎬 Фильм' : 
               format === 'series' ? '📺 Сериал' :
               format === 'cartoon' ? '🐰 Мультфильм' : '🇯🇵 Аниме'}
            </span>
          </span>
        ))}
        
        {/* Длительность */}
        {request.duration && request.duration !== 'any' && (
          <span className="
            bg-yellow-100 text-yellow-800
            px-2 py-1 md:px-3 md:py-1
            rounded-full
            text-xs md:text-sm
            flex items-center space-x-1
            flex-shrink-0
          ">
            <Clock size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{durationLabels[request.duration]}</span>
          </span>
        )}
        
        {/* Год */}
        {request.year && request.year !== 'any' && (
          <span className="
            bg-pink-100 text-pink-800
            px-2 py-1 md:px-3 md:py-1
            rounded-full
            text-xs md:text-sm
            flex items-center space-x-1
            flex-shrink-0
          ">
            <Calendar size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{request.year}</span>
          </span>
        )}
        
        {/* Страна */}
        {request.country && request.country !== 'any' && (
          <span className="
            bg-indigo-100 text-indigo-800
            px-2 py-1 md:px-3 md:py-1
            rounded-full
            text-xs md:text-sm
            flex items-center space-x-1
            flex-shrink-0
          ">
            <Globe size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{countryLabels[request.country]}</span>
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