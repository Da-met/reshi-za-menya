'use client';

import { MovieRequest, MovieOption } from '@/types/movies';

interface ContextSectionProps {
  request: MovieRequest;
  onChange: (updates: Partial<MovieRequest>) => void;
}

const contextOptions: MovieOption[] = [
  {
    id: 'family',
    label: 'Семьей',
    emoji: '👨‍👩‍👧‍👦',
    hints: ['Комедия', 'Приключения', 'Семейные']
  },
  {
    id: 'child', 
    label: 'С ребенком',
    emoji: '👶',
    hints: ['Мультфильмы', 'Приключения', 'Семейные']
  },
  {
    id: 'friends',
    label: 'С друзьями', 
    emoji: '👫',
    hints: ['Комедия', 'Ужасы', 'Триллер']
  },
  {
    id: 'romance',
    label: 'На свидании',
    emoji: '💕',
    hints: ['Романтика', 'Драма', 'Мелодрама']
  },
  {
    id: 'solo',
    label: 'В одиночку',
    emoji: '🧘',
    hints: ['Драма', 'Триллер', 'Арт-хаус']
  },
  {
    id: 'party',
    label: 'На вечеринке',
    emoji: '🎉',
    hints: ['Комедия', 'Музыкальный', 'Культовый']
  },
  {
    id: 'parents',
    label: 'С родителями',
    emoji: '👴👵',
    hints: ['Драма', 'Классика', 'Исторический']
  },
  {
    id: 'colleagues',
    label: 'С коллегами',
    emoji: '💼',
    hints: ['Детектив', 'Триллер', 'Комедия']
  }
];

export function ContextSection({ request, onChange }: ContextSectionProps) {
  const handleContextSelect = (contextId: string) => {
    onChange({ context: contextId });
  };

  return (
    <div>
      <h3 className="
          text-xl md:text-2xl lg:text-3xl font-accent 
          mb-3 md:mb-4 text-foreground
      ">
        С кем планируете смотреть?
      </h3>
      <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
        Выберите вариант — мы подскажем подходящие жанры
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
        {contextOptions.map((option) => (
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
            💡 Часто выбирают: {contextOptions.find(c => c.id === request.context)?.hints?.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}