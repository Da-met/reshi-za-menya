'use client';
import React from 'react';
import { MovieRequest } from '@/types/movies';
import { CONTEXT_OPTIONS, MOOD_OPTIONS } from '@/constants/movies.constants';

interface ContextSectionProps {
  request: MovieRequest;
  onChange: (updates: Partial<MovieRequest>) => void;
}

export function ContextSectionComponent({ request, onChange }: ContextSectionProps) {
  const handleContextSelect = (contextId: string) => {
    onChange({ context: contextId });
  };

  return (
    <div>
      <h3 className="text-xl md:text-2xl lg:text-3xl font-accent mb-3 md:mb-4 text-foreground">
        С кем планируете смотреть?
      </h3>
      <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
        Выберите вариант — мы подскажем подходящие жанры
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
        {CONTEXT_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => handleContextSelect(option.id)}
            className={`
              p-3 md:p-4 rounded-xl border-2 transition-all duration-200
              flex flex-col items-center justify-center space-y-1 md:space-y-2
              ${request.context === option.id
                ? 'bg-primary border-primary text-primary-foreground shadow-md scale-105'
                : 'bg-card border-border text-foreground hover:border-primary hover:shadow-md'
              }
            `}
          >
            <span className="text-xl md:text-2xl">{option.emoji}</span>
            <span className="font-medium text-xs md:text-sm text-center">{option.label}</span>
          </button>
        ))}
      </div>

      {request.context && (
        <div className="mt-3 md:mt-4 p-2 md:p-3 bg-accent rounded-lg">
          <p className="text-xs md:text-sm text-accent-foreground">
            ✅ Автоматически установлено: {CONTEXT_OPTIONS.find(c => c.id === request.context)?.label}
            {request.mood && `, Настроение: ${MOOD_OPTIONS.find(m => m.id === request.mood)?.label || 'не найдено'}`}
          </p>
        </div>
      )}
    </div>
  );
}

export const ContextSection = React.memo(ContextSectionComponent);