'use client';

import { BookRequest } from '@/types/books';

interface MoodSectionProps {
  request: BookRequest;
  onChange: (updates: Partial<BookRequest>) => void;
}

const moodOptions = [
  { id: 'relax', label: 'Расслабиться', emoji: '😌', hints: ['Лёгкие романы', 'Юмор', 'Детективы'] },
  { id: 'inspire', label: 'Вдохновиться', emoji: '✨', hints: ['Биографии', 'Мотивация', 'Истории успеха'] },
  { id: 'think', label: 'Подумать', emoji: '🤔', hints: ['Философия', 'Научпоп', 'Психология'] },
  { id: 'entertain', label: 'Развлечься', emoji: '😄', hints: ['Триллеры', 'Фэнтези', 'Приключения'] },
  { id: 'learn', label: 'Узнать новое', emoji: '📚', hints: ['Научпоп', 'История', 'Культура'] },
  { id: 'emotions', label: 'Пережить эмоции', emoji: '💕', hints: ['Драма', 'Романтика', 'Психологический роман'] },
  { id: 'escape', label: 'Погрузиться в мир', emoji: '🌌', hints: ['Фэнтези', 'Научная фантастика', 'Исторический роман'] },
  { id: 'any', label: 'Любое', emoji: '🎯', hints: ['Разные жанры', 'Классика', 'Современная проза'] }
];

export function MoodSection({ request, onChange }: MoodSectionProps) {
  const handleMoodSelect = (moodId: string) => {
    onChange({ mood: moodId });
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
        Выберите цель чтения — мы подскажем подходящие жанры
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
        {moodOptions.map((mood) => (
          <button
            key={mood.id}
            onClick={() => handleMoodSelect(mood.id)}
            className={`
              p-3 md:p-4 rounded-xl border-2 transition-all duration-200
              flex flex-col items-center justify-center space-y-1 md:space-y-2
              ${request.mood === mood.id
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
      
      {request.mood && (
        <div className="mt-3 md:mt-4 p-2 md:p-3 bg-accent rounded-lg">
          <p className="text-xs md:text-sm text-accent-foreground">
            💡 Часто выбирают: {moodOptions.find(m => m.id === request.mood)?.hints?.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}