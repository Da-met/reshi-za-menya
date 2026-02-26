'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { MovieRequest } from '@/types/movies';
import { MovieOptionTag } from './MovieOptionTag';
import { 
  contextLabels, 
  moodLabels, 
  formatLabels, 
  durationLabels, 
  yearLabels, 
  countryLabels,
  ratingLabels 
} from '@/constants/movies.constants';
import { SafeContent } from '../ui/safe/SafeContent';

interface MovieRequestDetailsProps {
  request: MovieRequest;
  createdAt?: Date;
  title?: string;
  className?: string;
  showDate?: boolean;
}

function MovieRequestDetailsComponent({
  request,
  createdAt,
  title = 'Детали запроса',
  className = '',
  showDate = true
}: MovieRequestDetailsProps) {
  return (
    <div className={`bg-card rounded-2xl shadow-lg p-6 md:p-8 ${className}`}>
      <h2 className="text-lg md:text-xl text-foreground mb-4">{title}</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {/* Контекст просмотра */}
        {request.context && (
          <MovieOptionTag
            type="context"
            label={contextLabels[request.context] || request.context}
            value={request.context}
          />
        )}

        {/* Настроение */}
        {request.mood && request.mood !== 'any' && (
          <MovieOptionTag
            type="mood"
            label={moodLabels[request.mood] || request.mood}
            value={request.mood}
          />
        )}

        {/* Жанры */}
        {request.genres?.map((genre, i) => (
          <MovieOptionTag
            key={i}
            type="genre"
            label={genre}
            value={genre}
          />
        ))}

        {/* Формат */}
        {request.format?.map((format, i) => (
          <MovieOptionTag
            key={i}
            type="format"
            label={formatLabels[format] || format}
            value={format}
          />
        ))}

        {/* Длительность */}
        {request.duration && request.duration !== 'any' && (
          <MovieOptionTag
            type="duration"
            label={durationLabels[request.duration] || request.duration}
            value={request.duration}
          />
        )}

        {/* Год */}
        {request.year && request.year !== 'any' && (
          <MovieOptionTag
            type="year"
            label={yearLabels[request.year] || request.year}
            value={request.year}
          />
        )}

        {/* Страна */}
        {request.country && request.country !== 'any' && (
          <MovieOptionTag
            type="country"
            label={countryLabels[request.country] || request.country}
            value={request.country}
          />
        )}

        {/* Рейтинг */}
        {request.rating && request.rating !== 'any' && (
          <MovieOptionTag
            type="rating"
            label={ratingLabels[request.rating] || request.rating}
            value={request.rating}
          />
        )}
      </div>

      {showDate && createdAt && (
        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground pt-4 border-t border-border">
          <Clock size={12} />
          <SafeContent
            content={`Сохранено ${createdAt.toLocaleDateString('ru-RU')}`}
            type="text"
          />
        </div>
      )}
    </div>
  );
}

export const MovieRequestDetails = React.memo(MovieRequestDetailsComponent);