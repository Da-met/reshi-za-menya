'use client';

import { GiftRequest } from '@/types/gifts';

interface FiltersSectionProps {
  request: GiftRequest;
  onChange: (updates: Partial<GiftRequest>) => void;
}

const occasions = ['День рождения', 'Новый год', '8 Марта', '23 Февраля', 'Свадьба', 'Юбилей'];
const budgets = ['до 1000₽', '1000-3000₽', '3000-5000₽', '5000+₽'];
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
        <h3 className="text-l md:text-xl font-accent font-semibold mb-2 text-foreground">
          Дополнительные фильтры
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
          Уточните параметры для более точного поиска
        </p>
      </div>

      {/* Повод */}
      <div>
        <h4 className="font-semibold mb-2 md:mb-3 text-foreground text-sm md:text-base">🎉 Повод</h4>
        <div className="flex flex-wrap gap-1 md:gap-2">
          {occasions.map(occasion => (
            <button
              key={occasion}
              onClick={() => handleSingleSelect('occasion', occasion)}
              className={`px-2 py-1 md:px-4 md:py-2 rounded-lg border transition-all text-xs md:text-sm ${
                request.occasion === occasion
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
        <h4 className="font-semibold mb-2 md:mb-3 text-foreground text-sm md:text-base">💰 Бюджет</h4>
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
        <h4 className="font-semibold mb-2 md:mb-3 text-foreground text-sm md:text-base">🎁 Тип подарка</h4>
        <div className="flex flex-wrap gap-1 md:gap-2">
          {giftTypes.map(type => (
            <button
              key={type}
              onClick={() => {
                onChange({ giftTypes: toggleArrayItem(request.giftTypes, type) });
              }}
              className={`px-2 py-1 md:px-4 md:py-2 rounded-lg border transition-all text-xs md:text-sm ${
                request.giftTypes?.includes(type)
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