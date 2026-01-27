'use client';

import { SkincareRequest } from '@/types/skincare';

interface SkinTypeSectionProps {
  request: SkincareRequest;
  onChange: (updates: Partial<SkincareRequest>) => void;
}

const skinTypes = [
  { id: 'normal', label: 'Нормальная', emoji: '😊', description: 'Сбалансированная кожа без проблем' },
  { id: 'dry', label: 'Сухая', emoji: '🍂', description: 'Чувство стянутости, шелушения' },
  { id: 'oily', label: 'Жирная', emoji: '✨', description: 'Блеск, расширенные поры' },
  { id: 'combination', label: 'Комбинированная', emoji: '🎭', description: 'Жирная Т-зона, сухие щеки' },
  { id: 'sensitive', label: 'Чувствительная', emoji: '🌿', description: 'Склонность к раздражениям' },
  { id: 'mature', label: 'Зрелая', emoji: '👵', description: 'Морщины, потеря упругости' },
  { id: 'acne-prone', label: 'Склонная к акне', emoji: '🔴', description: 'Высыпания, воспаления' },
  { id: 'dehydrated', label: 'Обезвоженная', emoji: '💧', description: 'Нехватка влаги, тусклость' },
];

export function SkinTypeSection({ request, onChange }: SkinTypeSectionProps) {
  return (
    <div>
      <h3 className="text-xl md:text-2xl lg:text-3xl font-accent mb-3 md:mb-4 text-foreground">
        Какой у вас тип кожи?
      </h3>
      <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
        Выберите тип кожи для персонализированных рекомендаций
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
        {skinTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onChange({ skin_type: type.id })}
            className={`p-3 md:p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center space-y-1 md:space-y-2 ${
              request.skin_type === type.id
                ? 'bg-primary border-primary text-primary-foreground shadow-md scale-105'
                : 'bg-card border-border text-foreground hover:border-primary hover:shadow-md'
            }`}
          >
            <span className="text-xl md:text-2xl">{type.emoji}</span>
            <span className="font-medium text-xs md:text-sm text-center">{type.label}</span>
            <span className="text-xs text-muted-foreground text-center hidden sm:block">{type.description}</span>
          </button>
        ))}
      </div>
      
      {request.skin_type && (
        <div className="mt-3 md:mt-4 p-2 md:p-3 bg-accent rounded-lg">
          <p className="text-xs md:text-sm text-accent-foreground">
            ✅ Выбрано: {skinTypes.find(t => t.id === request.skin_type)?.label}
          </p>
        </div>
      )}
    </div>
  );
}