'use client';

import { useState } from 'react';
import { FoodRequest } from '@/types/food';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FiltersSectionProps {
  request: FoodRequest;
  onChange: (updates: Partial<FoodRequest>) => void;
}

const mainFilters = {
  dishType: [
    { id: 'breakfast', label: 'Завтрак' },
    { id: 'lunch', label: 'Обед' },
    { id: 'dinner', label: 'Ужин' },
    { id: 'dessert', label: 'Десерт' },
    { id: 'snack', label: 'Перекус' }
  ],
  cookingTime: [
    { id: '<15', label: 'До 15 мин' },
    { id: '<30', label: 'До 30 мин' },
    { id: '<45', label: 'До 45 мин' },
    { id: '<60', label: 'До 60 мин' },
    { id: '>60', label: 'Более 60 мин' }
  ],
  cuisine: [
    { id: 'russian', label: 'Русская' },
    { id: 'italian', label: 'Итальянская' },
    { id: 'asian', label: 'Азиатская' },
    { id: 'georgian', label: 'Грузинская' },
    { id: 'mexican', label: 'Мексиканская' }
  ]
};

const additionalFilters = {
  diet: [
    { id: 'vegetarian', label: 'Вегетарианское' },
    { id: 'vegan', label: 'Веганское' },
    { id: 'gluten-free', label: 'Безглютеновое' },
    { id: 'lactose-free', label: 'Безлактозное' },
    { id: 'keto', label: 'Низкоуглеводное' },
    { id: 'high-protein', label: 'Высокобелковое' }
  ],
  allergens: [
    { id: 'nuts', label: 'Орехи' },
    { id: 'seafood', label: 'Морепродукты' },
    { id: 'eggs', label: 'Яйца' },
    { id: 'milk', label: 'Молоко' },
    { id: 'gluten', label: 'Глютен' },
    { id: 'honey', label: 'Мед' }
  ],
  occasion: [
    { id: 'everyday', label: 'Повседневное' },
    { id: 'holiday', label: 'На праздник' },
    { id: 'romantic', label: 'Для романтического ужина' },
    { id: 'kids', label: 'Для детей' },
    { id: 'healthy', label: 'Здоровое питание' }
  ],
  difficulty: [
    { id: 'easy', label: 'Легко' },
    { id: 'medium', label: 'Средне' },
    { id: 'hard', label: 'Сложно' }
  ],
  cookingMethod: [
    { id: 'oven', label: 'В духовке' },
    { id: 'stove', label: 'На сковороде' },
    { id: 'multicooker', label: 'В мультиварке' },
    { id: 'grill', label: 'На гриле' },
    { id: 'no-cook', label: 'Без варки' },
    { id: 'steam', label: 'На пару' }
  ]
};

export function FiltersSection({ request, onChange }: FiltersSectionProps) {
  const [showAdditional, setShowAdditional] = useState(false);

  const handleFilterChange = (filterType: string, value: string | string[]) => {
    onChange({
      filters: {
        ...request.filters,
        [filterType]: value
      }
    });
  };

  const handleArrayFilterChange = (filterType: string, itemId: string) => {
    const currentArray = request.filters[filterType as keyof typeof request.filters] as string[] || [];
    const newArray = currentArray.includes(itemId)
      ? currentArray.filter(item => item !== itemId)
      : [...currentArray, itemId];
    
    handleFilterChange(filterType, newArray);
  };

  const renderFilterGroup = (
    title: string,
    filters: Array<{ id: string; label: string }>,
    filterType: string,
    isMultiple = false
  ) => (
    <div className="mb-6">
      <h4 className="font-semibold text-foreground mb-3 text-sm md:text-base">{title}</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {filters.map(filter => {
          const isSelected = isMultiple
            ? (request.filters[filterType as keyof typeof request.filters] as string[] || []).includes(filter.id)
            : request.filters[filterType as keyof typeof request.filters] === filter.id;

          return (
            <button
              key={filter.id}
              onClick={() => 
                isMultiple 
                  ? handleArrayFilterChange(filterType, filter.id)
                  : handleFilterChange(filterType, isSelected ? '' : filter.id)
              }
              className={`
                p-2 md:p-3 
                rounded-lg 
                border-2 
                text-xs md:text-sm 
                font-medium 
                transition-all 
                text-center
                ${isSelected
                  ? 'bg-primary border-primary text-primary-foreground shadow-sm'
                  : 'bg-card border-border text-foreground hover:border-primary hover:shadow-sm'
                }
              `}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg md:text-xl font-accent font-semibold mb-4 md:mb-6 text-foreground">
          Уточните параметры рецепта
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-6">
          Выберите подходящие фильтры для более точного подбора
        </p>

        {/* Основные фильтры */}
        {renderFilterGroup('Тип блюда', mainFilters.dishType, 'dishType')}
        {renderFilterGroup('Время приготовления', mainFilters.cookingTime, 'cookingTime')}
        {renderFilterGroup('Кухня мира', mainFilters.cuisine, 'cuisine')}

        {/* Дополнительные фильтры */}
        <div className="border-t border-border pt-6">
          <button
            onClick={() => setShowAdditional(!showAdditional)}
            className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors mb-4"
          >
            <span className="font-semibold text-sm md:text-base">Дополнительные фильтры</span>
            {showAdditional ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showAdditional && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {renderFilterGroup('Диета', additionalFilters.diet, 'diet')}
              {renderFilterGroup('Исключить аллергены', additionalFilters.allergens, 'allergens', true)}
              {renderFilterGroup('Повод', additionalFilters.occasion, 'occasion')}
              {renderFilterGroup('Сложность', additionalFilters.difficulty, 'difficulty')}
              {renderFilterGroup('Способ приготовления', additionalFilters.cookingMethod, 'cookingMethod')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}