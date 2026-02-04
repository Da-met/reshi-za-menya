// components/analyzer/sections/ProductSearchSection.tsx
'use client';

import { AnalyzerRequest } from '@/types/analyzer';
import { Search } from 'lucide-react';
import { useState } from 'react';

interface ProductSearchSectionProps {
  request: AnalyzerRequest;
  onChange: (updates: Partial<AnalyzerRequest>) => void;
}

// Пример популярных продуктов
const popularProducts = [
  'La Roche-Posay Effaclar H',
  'Cerave Увлажняющий крем для лица',
  'The Ordinary Niacinamide 10% + Zinc 1%',
  'Cosrx Advanced Snail 96 Mucin Power Essence',
  'Nivea Soft увлажняющий крем',
  'Garnier BB Cream для проблемной кожи',
  'L\'Oreal Paris Revitalift Филлер',
  'Vichy Liftactiv Сыворотка',
  'Avene Cleanance КОМЕДОГЕН',
  'Bioderma Sensibio H2O Мицеллярная вода'
];

export function ProductSearchSection({ request, onChange }: ProductSearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState(request.productName || '');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onChange({ productName: value });
    
    if (value.trim().length > 2) {
      const filtered = popularProducts.filter(product =>
        product.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (product: string) => {
    setSearchQuery(product);
    onChange({ productName: product });
    setSuggestions([]);
  };

  return (
    <div className="space-y-6">
      {/* Основное поле ввода */}
      <div className="space-y-4">
        <div className="relative">
          <div className="flex items-center bg-background border-2 border-border rounded-xl px-4 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <Search className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Например: La Roche-Posay Effaclar H или Nivea Soft"
              className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-base"
              autoFocus
            />
          </div>
          
          {/* Подсказки */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
              {suggestions.map((product, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(product)}
                  className="w-full text-left px-4 py-3 hover:bg-accent transition-colors border-b border-border last:border-b-0 flex items-center gap-3"
                >
                  <Search size={16} className="text-muted-foreground flex-shrink-0" />
                  <span className="text-sm text-foreground">{product}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Информация */}
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-xs md:text-sm text-blue-800 dark:text-blue-300">
            💡 Просто введите название средства. Мы найдем его состав в интернете и проанализируем на безопасность.
          </p>
        </div>
      </div>

      {/* Быстрый выбор популярных */}
      <div>
        <h4 className="text-sm md:text-base font-medium text-foreground mb-2">
          🔥 Популярные средства для анализа
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          {popularProducts.slice(0, 4).map((product) => (
            <button
              key={product}
              onClick={() => handleSuggestionClick(product)}
              className={`
                px-2.5 py-1 rounded-full border transition-all text-xs
                text-left h-auto min-h-[32px] flex items-center
                hover:bg-accent/50
                ${searchQuery === product
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card/50 border-border/50 hover:border-primary/30'
                }
              `}
            >
              <span className="line-clamp-2">{product}</span>
            </button>
          ))}
        </div>
      </div>
      


    </div>
  );
}