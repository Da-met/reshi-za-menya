'use client';

import { SkincareRequest } from '@/types/skincare';

interface ProductTypeSectionProps {
  request: SkincareRequest;
  onChange: (updates: Partial<SkincareRequest>) => void;
}

const productTypes = [
  { id: 'cleanser', label: 'Очищение', emoji: '🧼', description: 'Гели, пенки, мицеллярная вода' },
  { id: 'toner', label: 'Тоник', emoji: '💦', description: 'Тоники, лосьоны, эссенции' },
  { id: 'serum', label: 'Сыворотка', emoji: '⚗️', description: 'Концентрированные средства' },
  { id: 'moisturizer', label: 'Увлажнение', emoji: '💧', description: 'Кремы, гели, эмульсии' },
  { id: 'eye-cream', label: 'Для глаз', emoji: '👁️', description: 'Кремы и патчи для области глаз' },
  { id: 'sunscreen', label: 'Солнцезащита', emoji: '☀️', description: 'SPF средства' },
  { id: 'mask', label: 'Маски', emoji: '🧖', description: 'Тканевые, кремовые, глиняные' },
  { id: 'exfoliator', label: 'Пилинг', emoji: '🌀', description: 'Химические и механические пилинги' },
  { id: 'treatment', label: 'Лечение', emoji: '🩹', description: 'Средства для проблемной кожи' },
  { id: 'oil', label: 'Масло', emoji: '🛢️', description: 'Фейс-масла' },
  { id: 'mist', label: 'Спрей', emoji: '🌫️', description: 'Термальная вода, спреи' },
  { id: 'balm', label: 'Бальзам', emoji: '💄', description: 'Для губ и сухих участков' },
];

export function ProductTypeSection({ request, onChange }: ProductTypeSectionProps) {
  return (
    <div>
      <h3 className="text-xl md:text-2xl lg:text-3xl font-accent mb-3 md:mb-4 text-foreground">
        Какое средство вы ищете?
      </h3>
      <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
        Выберите тип уходового средства
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
        {productTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onChange({ desired_product_type: type.id })}
            className={`p-3 md:p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center space-y-1 md:space-y-2 ${
              request.desired_product_type === type.id
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
      
      {request.desired_product_type && (
        <div className="mt-3 md:mt-4 p-2 md:p-3 bg-accent rounded-lg">
          <p className="text-xs md:text-sm text-accent-foreground">
            ✅ Выбрано: {productTypes.find(t => t.id === request.desired_product_type)?.label}
          </p>
        </div>
      )}
    </div>
  );
}