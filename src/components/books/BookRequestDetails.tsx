// src/components/books/BookRequestDetails.tsx

'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { BookRequest } from '@/types/books';
import {
  moodLabels,
  volumeLabels,
  paceLabels,
} from '@/constants/books.constants';

interface BookRequestDetailsProps {
  request: BookRequest;
  createdAt?: Date;
  title?: string;
  className?: string;
  showDate?: boolean;
}

export function BookRequestDetails({ 
  request, 
  createdAt,
  title = 'Детали запроса',
  className = '',
  showDate = true
}: BookRequestDetailsProps) {
  return (
    <div className={`bg-card rounded-2xl shadow-lg p-6 md:p-8 ${className}`}>
      <h2 className="text-xl text-foreground mb-4">{title}</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Настроение */}
        {request.readingMood && request.readingMood !== 'any' && (
          <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
            <span className="mr-1">❤️</span>
            {moodLabels[request.readingMood]}
          </span>
        )}
        
        {/* Жанры */}
        {request.preferredGenres?.map((genre, index) => (
          <span key={index} className="px-3 py-1 bg-primary-foreground text-primary rounded-full text-sm">
            {genre}
          </span>
        ))}
        
        {/* Объем */}
        {request.bookLength && request.bookLength !== 'any' && (
          <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            <Clock size={12} className="mr-1" />
            {volumeLabels[request.bookLength]}
          </span>
        )}
        
        {/* Темп */}
        {request.narrativePace && request.narrativePace !== 'any' && (
          <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            <span className="mr-1">🏃</span>
            {paceLabels[request.narrativePace]}
          </span>
        )}
      </div>

      {showDate && createdAt && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t border-border">
          <Clock size={14} />
          <span>Сохранено {createdAt.toLocaleDateString('ru-RU')}</span>
        </div>
      )}
    </div>
  );
}