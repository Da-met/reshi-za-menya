'use client';

import React from 'react';
import { SkincareRequest } from '@/types/skincare';
import { AGE_GROUPS, BUDGET_RANGES } from '@/constants/skincare.constants';

interface FiltersSectionProps {
  request: SkincareRequest;
  onChange: (updates: Partial<SkincareRequest>) => void;
}

const brands = [
  'La Roche-Posay', 'Avene', 'Vichy', 'CeraVe', 'The Ordinary',
  'Bioderma', 'Eucerin', 'L\'Oreal', 'Garnier', 'Nivea',
  'Neutrogena', 'Clinique', 'Estee Lauder', 'Lancome', 'Shiseido'
] as const;

function FiltersSectionComponent({ request, onChange }: FiltersSectionProps) {
  const toggleArrayItem = (array: string[] | undefined, item: string) => {
    const current = array || [];
    return current.includes(item)
      ? current.filter(i => i !== item)
      : [...current, item];
  };

  const handleSingleSelect = (field: keyof SkincareRequest, value: string) => {
    if (request[field] === value) {
      onChange({ [field]: undefined });
    } else {
      onChange({ [field]: value });
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h3 className="text-xl md:text-2xl lg:text-3xl font-accent mb-3 md:mb-4 text-foreground">
          Дополнительные фильтры
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
          Уточните параметры для более точного поиска
        </p>
      </div>

      {/* Бюджет */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">💰 Бюджет</h4>
        <div className="flex flex-wrap gap-1 md:gap-2">
          {BUDGET_RANGES.map((budget) => (
            <button
              key={budget.id} // ← используем id как key
              onClick={() => handleSingleSelect('budget', budget.id)} // ← передаем id
              className={`px-2 py-1 md:px-4 md:py-2 rounded-lg border transition-all text-xs md:text-sm ${
                request.budget === budget.id // ← сравниваем с id
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              {budget.label} 
            </button>
          ))}
        </div>
      </div>

      {/* Возрастная группа */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">👵 Возрастная группа</h4>
        <div className="flex flex-wrap gap-1 md:gap-2">
          {AGE_GROUPS.map((age) => (
            <button
              key={age.id}
              onClick={() => handleSingleSelect('age_group', age.id)}
              className={`px-2 py-1 md:px-4 md:py-2 rounded-lg border transition-all text-xs md:text-sm ${
                request.age_group === age.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              {age.label}
            </button>
          ))}
        </div>
      </div>

      {/* Предпочитаемые бренды */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">🏷️ Предпочитаемые бренды</h4>
        <div className="flex flex-wrap gap-1 md:gap-2">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => {
                onChange({ brand_preference: toggleArrayItem(request.brand_preference, brand) });
              }}
              className={`px-2 py-1 md:px-4 md:py-2 rounded-lg border transition-all text-xs md:text-sm ${
                request.brand_preference?.includes(brand)
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* SPF */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">☀️ Солнцезащита</h4>
        <div className="flex gap-2">
          <button
            onClick={() => onChange({ spf_needed: true })}
            className={`px-4 py-2 rounded-lg border transition-all ${
              request.spf_needed === true ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border'
            }`}
          >
            Нужен SPF
          </button>
          <button
            onClick={() => onChange({ spf_needed: false })}
            className={`px-4 py-2 rounded-lg border transition-all ${
              request.spf_needed === false ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border'
            }`}
          >
            Без SPF
          </button>
          <button
            onClick={() => onChange({ spf_needed: undefined })}
            className="px-4 py-2 rounded-lg border border-border bg-card"
          >
            Не важно
          </button>
        </div>
      </div>
    </div>
  );
}

export const FiltersSection = React.memo(FiltersSectionComponent);