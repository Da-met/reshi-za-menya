'use client';

import React from 'react';
import { BookRequest } from '@/types/books';


interface MoodSectionProps {
  request: BookRequest;
  onChange: (updates: Partial<BookRequest>) => void;
}

const moodOptions = [
  { 
    id: 'relax', 
    label: 'Расслабиться', 
    emoji: '😌', 
    autoGenres: ['Юмор', 'Детектив'] // РОВНО 2
  },
  { 
    id: 'inspire', 
    label: 'Вдохновиться', 
    emoji: '✨', 
    autoGenres: ['Биографии', 'Саморазвитие'] // РОВНО 2
  },
  { 
    id: 'think', 
    label: 'Подумать', 
    emoji: '🤔', 
    autoGenres: ['Философия', 'Наука'] // РОВНО 2
  },
  { 
    id: 'entertain', 
    label: 'Развлечься', 
    emoji: '😄', 
    autoGenres: ['Триллер', 'Фэнтези'] // РОВНО 2
  },
  { 
    id: 'learn', 
    label: 'Узнать новое', 
    emoji: '📚', 
    autoGenres: ['Наука', 'История'] // РОВНО 2
  },
  { 
    id: 'emotions', 
    label: 'Пережить эмоции', 
    emoji: '💕', 
    autoGenres: ['Драма', 'Роман'] // РОВНО 2
  },
  { 
    id: 'escape', 
    label: 'Погрузиться в мир', 
    emoji: '🌌', 
    autoGenres: ['Фэнтези', 'Фантастика'] // РОВНО 2
  },
  { 
    id: 'any', 
    label: 'Любое', 
    emoji: '🎯', 
    autoGenres: ['Классика', 'Современная проза'] // РОВНО 2
  }
];

const MoodSectionComponent = ({ request, onChange }: MoodSectionProps) => {
  const handleMoodSelect = (moodId: string) => {
    const selectedMood = moodOptions.find(m => m.id === moodId);
    
    const updates: Partial<BookRequest> = {
      readingMood: moodId,
      preferredGenres: selectedMood?.autoGenres.slice(0, 2) || [] // Берем только 2 жанра
    };
    
    onChange(updates);
  };

  return (
    <div>
      <h3 className="
        text-xl md:text-2xl lg:text-3xl font-accent
        mb-3 md:mb-4 text-foreground
      ">
        Какое у вас настроение?
      </h3>
      <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
        Выберите цель чтения — мы автоматически подберем подходящие жанры
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
        {moodOptions.map((mood) => (
          <button
            key={mood.id}
            onClick={() => handleMoodSelect(mood.id)}
            className={`
              p-3 md:p-4 rounded-xl border-2 transition-all duration-200
              flex flex-col items-center justify-center space-y-1 md:space-y-2
              ${request.readingMood === mood.id
                ? 'bg-primary border-primary text-primary-foreground shadow-md scale-105'
                : 'bg-card border-border text-foreground hover:border-primary hover:shadow-md'
              }
            `}
          >
            <span className="text-xl md:text-2xl">{mood.emoji}</span>
            <span className="font-medium text-xs md:text-sm text-center">{mood.label}</span>
          </button>
        ))}
      </div>
      
      {/* ВСЕГДА показываем что выбрано */}
      <div className="mt-3 md:mt-4 p-2 md:p-3 bg-accent rounded-lg">
        <p className="text-xs md:text-sm text-accent-foreground">
          ✅ Автоматически установлено: {moodOptions.find(m => m.id === request.readingMood)?.label}
          {request.preferredGenres && request.preferredGenres.length > 0 && (
            <span>, Жанры: {request.preferredGenres.join(', ')}</span>
          )}
        </p>
      </div>
    </div>
  );
}

export const MoodSection = React.memo(MoodSectionComponent);
MoodSection.displayName = 'MoodSection';