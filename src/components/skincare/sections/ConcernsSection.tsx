'use client';

import { SkincareRequest } from '@/types/skincare';

interface ConcernsSectionProps {
  request: SkincareRequest;
  onChange: (updates: Partial<SkincareRequest>) => void;
}

const skinConcerns = [
  { id: 'acne', label: 'Акне и высыпания', emoji: '🔴' },
  { id: 'dryness', label: 'Сухость и шелушение', emoji: '🍂' },
  { id: 'oiliness', label: 'Избыточный блеск', emoji: '✨' },
  { id: 'pigmentation', label: 'Пигментация', emoji: '🎨' },
  { id: 'wrinkles', label: 'Морщины', emoji: '👵' },
  { id: 'redness', label: 'Покраснения', emoji: '🔺' },
  { id: 'pores', label: 'Расширенные поры', emoji: '🕳️' },
  { id: 'dullness', label: 'Тусклый цвет лица', emoji: '🌑' },
  { id: 'sensitivity', label: 'Чувствительность', emoji: '🌿' },
  { id: 'hydration', label: 'Обезвоженность', emoji: '💧' },
  { id: 'dark-circles', label: 'Темные круги под глазами', emoji: '👁️' },
  { id: 'scarring', label: 'Постакне и шрамы', emoji: '🩹' },
];

export function ConcernsSection({ request, onChange }: ConcernsSectionProps) {
  const toggleConcern = (concernId: string) => {
    const currentConcerns = request.concerns || [];
    const newConcerns = currentConcerns.includes(concernId)
      ? currentConcerns.filter(id => id !== concernId)
      : [...currentConcerns, concernId];
    
    onChange({ concerns: newConcerns });
  };

  return (
    <div>
      <h3 className="text-xl md:text-2xl lg:text-3xl font-accent mb-3 md:mb-4 text-foreground">
        Какие проблемы кожи вас беспокоят?
      </h3>
      <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
        Можно выбрать несколько вариантов
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
        {skinConcerns.map((concern) => {
          const isSelected = request.concerns?.includes(concern.id);
          return (
            <button
              key={concern.id}
              onClick={() => toggleConcern(concern.id)}
              className={`p-3 md:p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center space-y-1 md:space-y-2 ${
                isSelected
                  ? 'bg-primary border-primary text-primary-foreground shadow-md scale-105'
                  : 'bg-card border-border text-foreground hover:border-primary hover:shadow-md'
              }`}
            >
              <span className="text-xl md:text-2xl">{concern.emoji}</span>
              <span className="font-medium text-xs md:text-sm text-center">{concern.label}</span>
            </button>
          );
        })}
      </div>
      
      {request.concerns && request.concerns.length > 0 && (
        <div className="mt-3 md:mt-4 p-2 md:p-3 bg-accent rounded-lg">
          <p className="text-xs md:text-sm text-accent-foreground">
            ✅ Выбрано проблем: {request.concerns.length}
          </p>
        </div>
      )}
    </div>
  );
}