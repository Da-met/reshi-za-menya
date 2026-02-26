// src/components/books/sections/InterestsSection.tsx

'use client';

import React from 'react';
import { BookRequest } from '@/types/books';
import { FICTION_GENRES, NONFICTION_GENRES } from '@/constants/books.constants';

interface InterestsSectionProps {
  request: BookRequest;
  onChange: (updates: Partial<BookRequest>) => void;
}

function InterestsSectionComponent({ request, onChange }: InterestsSectionProps) {
  const toggleGenre = (genre: string) => {
    const currentGenres = request.preferredGenres || [];
    const newGenres = currentGenres.includes(genre)
      ? currentGenres.filter(g => g !== genre)
      : [...currentGenres, genre];
    
    onChange({ preferredGenres: newGenres });
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h3 className="text-xl md:text-2xl lg:text-3xl font-accent mb-3 md:mb-4 text-foreground">
          Какие жанры и темы интересуют?
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
          Мы уже подобрали 2 жанра под ваше настроение. Можете добавить ещё или изменить
        </p>
      </div>

      {/* Художественная литература */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">
          📖 Художественная литература
        </h4>
        <div className="flex flex-wrap gap-1 md:gap-2">
          {FICTION_GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`px-2 py-1 md:px-3 md:py-2 rounded-lg border transition-all text-xs md:text-sm ${
                request.preferredGenres?.includes(genre)
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Нехудожественная литература */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">
          📚 Нехудожественная литература
        </h4>
        <div className="flex flex-wrap gap-1 md:gap-2">
          {NONFICTION_GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`px-2 py-1 md:px-3 md:py-2 rounded-lg border transition-all text-xs md:text-sm ${
                request.preferredGenres?.includes(genre)
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Блок "Уже выбрано" */}
      <div className="p-3 bg-accent rounded-lg">
        <p className="text-sm text-accent-foreground">
          ✅ Уже выбрано жанров: <span className="font-bold">{request.preferredGenres?.length || 0}</span>
          {request.preferredGenres && request.preferredGenres.length > 0 && (
            <span>: {request.preferredGenres.join(', ')}</span>
          )}
        </p>
      </div>
    </div>
  );
}

export const InterestsSection = React.memo(InterestsSectionComponent);
InterestsSection.displayName = 'InterestsSection';