'use client';

import { GiftRequest } from '@/types/gifts';

interface CategorySectionProps {
  request: GiftRequest;
  onChange: (updates: Partial<GiftRequest>) => void;
}

const categories = [
  { id: 'mother', label: 'Маме', emoji: '👩', auto: { gender: 'female', age: 'adult' } },
  { id: 'father', label: 'Папе', emoji: '👨', auto: { gender: 'male', age: 'adult' } },
  { id: 'girlfriend', label: 'Девушке', emoji: '💃', auto: { gender: 'female', age: 'adult' } },
  { id: 'boyfriend', label: 'Парню', emoji: '🕺', auto: { gender: 'male', age: 'adult' } },
  { id: 'friend', label: 'Другу', emoji: '👨‍🤝‍👨', auto: { gender: 'male', age: 'adult' } },
  { id: 'friend_female', label: 'Подруге', emoji: '👩‍🤝‍👩', auto: { gender: 'female', age: 'adult' } },
  { id: 'child', label: 'Ребёнку', emoji: '🧒', auto: { age: 'child' } },
  { id: 'colleague', label: 'Коллеге', emoji: '💼', auto: { age: 'adult' } },
];

export function CategorySection({ request, onChange }: CategorySectionProps) {
  const handleCategorySelect = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    
    if (category) {
      onChange({
        category: categoryId,
        ...category.auto
      });
    }
  };

  return (
    <div>
      <h3 className="text-l md:text-xl font-accent font-semibold mb-3 md:mb-4 text-foreground">
        Кому ищем подарок?
      </h3>
      <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
        Выберите категорию — мы автоматически подставим пол и возраст
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            className={`
              p-3 md:p-4 rounded-xl border-2 transition-all duration-200
              flex flex-col items-center justify-center space-y-1 md:space-y-2
              ${request.category === category.id
                ? 'bg-primary border-primary text-primary-foreground shadow-md scale-105'
                : 'bg-card border-border text-foreground hover:border-primary hover:shadow-md'
              }
            `}
          >
            <span className="text-xl md:text-2xl">{category.emoji}</span>
            <span className="font-medium text-xs md:text-sm text-center">{category.label}</span>
          </button>
        ))}
      </div>
      
      {request.category && (
        <div className="mt-3 md:mt-4 p-2 md:p-3 bg-accent rounded-lg">
          <p className="text-xs md:text-sm text-accent-foreground">
            ✅ Автоматически установлено: {
              categories.find(c => c.id === request.category)?.auto.gender 
                ? `Пол: ${request.gender === 'female' ? 'женский' : 'мужской'}, ` 
                : ''
            }Возраст: {request.age === 'child' ? 'ребенок' : 'взрослый'}
          </p>
        </div>
      )}
    </div>
  );
}