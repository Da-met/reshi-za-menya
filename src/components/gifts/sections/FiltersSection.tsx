'use client';

import { GiftRequest } from '@/types/gifts';

interface FiltersSectionProps {
  request: GiftRequest;
  onChange: (updates: Partial<GiftRequest>) => void;
}

const occasions = [
  // 🎂 Личные праздники
  'День рождения',
  'Юбилей',
  'Выпускной',
  'Повышение на работе',
  'Защита диплома',
  
  // 💕 Романтические
  'Свадьба',
  'Годовщина отношений',
  'День святого Валентина',
  'Предложение',
  
  // 🏠 Семейные и домашние
  'Новоселье',
  'Рождение ребенка',
  'Крестины',
  'Семейное торжество',
  
  // 🎅 Сезонные праздники
  'Новый год',
  'Рождество',
  '8 Марта', 
  '23 Февраля',
  'День матери',
  'День отца',
  
  // 🎓 Профессиональные
  'День учителя',
  'День медицинского работника',
  'Профессиональный праздник',
  'Выход на пенсию',
  
  // ✨ Просто так
  'Без повода',
  'В знак благодарности',
  'Для поддержки',
  'Сюрприз',
  
  // 🏆 Достижения
  'Спортивная победа',
  'Завершение проекта',
  'Личное достижение',
  'Преодоление трудностей',
  
  // 🌍 Путешествия и события
  'Отпуск',
  'Командировка', 
  'Переезд в другой город',
  'Напутствие в дорогу'
];
const budgets = [
  'до 500₽', 
  '500-1000₽', 
  '1000-3000₽', 
  '3000-5000₽', 
  '5000-10000₽', 
  '10000-20000₽',
  '20000+₽'
];
const giftTypes = ['Вещь', 'Впечатление', 'Сделай сам'];

export function FiltersSection({ request, onChange }: FiltersSectionProps) {
  const toggleArrayItem = (array: string[] | undefined, item: string) => {
    const current = array || [];
    return current.includes(item) 
      ? current.filter(i => i !== item)
      : [...current, item];
  };

  const handleSingleSelect = (field: keyof GiftRequest, value: string) => {
    if (request[field] === value) {
      onChange({ [field]: undefined });
    } else {
      onChange({ [field]: value });
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h3 className="
          text-xl md:text-2xl lg:text-3xl font-accent 
          mb-3 md:mb-4 text-foreground
        ">
          Дополнительные фильтры
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
          Уточните параметры для более точного поиска
        </p>
      </div>

      {/* Повод */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">🎉 Повод</h4>
        <div className="flex flex-wrap gap-1 md:gap-2">
          {occasions.map(occasion => (
            <button
              key={occasion}
              onClick={() => handleSingleSelect('gift_occasion', occasion)}
              className={`px-2 py-1 md:px-4 md:py-2 rounded-lg border transition-all text-xs md:text-sm ${
                request.gift_occasion === occasion
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              {occasion}
            </button>
          ))}
        </div>
      </div>

      {/* Бюджет */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">💰 Бюджет</h4>
        <div className="flex flex-wrap gap-1 md:gap-2">
          {budgets.map(budget => (
            <button
              key={budget}
              onClick={() => handleSingleSelect('budget', budget)}
              className={`px-2 py-1 md:px-4 md:py-2 rounded-lg border transition-all text-xs md:text-sm ${
                request.budget === budget
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              {budget}
            </button>
          ))}
        </div>
      </div>

      {/* Тип подарка */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">🎁 Тип подарка</h4>
        <div className="flex flex-wrap gap-1 md:gap-2">
          {giftTypes.map(type => (
            <button
              key={type}
              onClick={() => {
                onChange({ gift_format: toggleArrayItem(request.gift_format, type) });
              }}
              className={`px-2 py-1 md:px-4 md:py-2 rounded-lg border transition-all text-xs md:text-sm ${
                request.gift_format?.includes(type)
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}