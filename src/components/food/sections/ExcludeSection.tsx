'use client';

import { useState, useRef, useEffect } from 'react';
import { FoodRequest } from '@/types/food';
import { X, Lightbulb } from 'lucide-react';
import { searchProducts } from '@/data/foodData';
import { validateProduct } from '@/utils/validationFood';

interface ExcludeSectionProps {
  request: FoodRequest;
  onChange: (updates: Partial<FoodRequest>) => void;
}

const commonAllergens = [
  'лук', 'чеснок', 'грибы', 'помидоры', 'баклажаны',
  'молоко', 'сыр', 'яйца', 'орехи', 'мед',
  'морепродукты', 'цитрусы', 'пшеница', 'соя'
];

export function ExcludeSection({ request, onChange }: ExcludeSectionProps) {
  const [excludeInput, setExcludeInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [validationError, setValidationError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const currentExcludes = request.excludeIngredients || [];

  // Закрытие подсказок при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    setExcludeInput(value);
    setValidationError('');
    
    if (value.length > 1) {
      const results = searchProducts(value);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleAddExclude = (ingredient: string) => {
    if (!ingredient.trim()) return;
    
    // Валидация
    const validation = validateProduct(ingredient);
    if (!validation.isValid) {
      setValidationError(validation.error || 'Некорректный продукт');
      return;
    }
    
    const newIngredient = ingredient.trim().toLowerCase();
    
    if (currentExcludes.includes(newIngredient)) {
      setValidationError('Этот продукт уже добавлен в исключения');
      return;
    }
    
    onChange({
      excludeIngredients: [...currentExcludes, newIngredient]
    });
    
    setExcludeInput('');
    setShowSuggestions(false);
    setValidationError('');
  };

  const handleRemoveExclude = (ingredientToRemove: string) => {
    onChange({
      excludeIngredients: currentExcludes.filter(ingredient => ingredient !== ingredientToRemove)
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && excludeInput.trim()) {
      e.preventDefault();
      handleAddExclude(excludeInput);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleAddExclude(suggestion);
  };

  const handleCommonAllergenClick = (allergen: string) => {
    handleAddExclude(allergen);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="
          text-xl md:text-2xl lg:text-3xl font-accent 
          mb-3 md:mb-4 text-foreground
        ">
          Исключить ингредиенты
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
          Укажите продукты, которые не должны быть в рецепте
        </p>

        {/* Поле ввода для исключения */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-foreground">
            Введите ингредиенты для исключения
          </label>
          <div className="relative" ref={inputRef}>
            <input
              type="text"
              value={excludeInput}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => excludeInput.length > 1 && setShowSuggestions(true)}
              placeholder="Начните вводить продукт..."
              className="w-full p-3 md:p-4 border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base pr-12 md:pr-24"
            />
            
            <button
              onClick={() => handleAddExclude(excludeInput)}
              disabled={!excludeInput.trim()}
              className="
                absolute 
                right-2 top-1/2 -translate-y-1/2
                w-8 h-8 md:w-auto md:h-auto md:px-4 md:py-2
                bg-primary text-primary-foreground 
                rounded-lg 
                font-medium 
                text-sm
                hover:bg-primary/90 
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all
                flex items-center justify-center
              "
            >
              <span className="hidden md:inline">Добавить</span>
              <span className="md:hidden">+</span>
            </button>
            
            {/* Подсказки */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left p-3 hover:bg-accent hover:text-accent-foreground transition-colors border-b border-border last:border-b-0 flex items-center space-x-3 group"
                  >
                    <Lightbulb size={16} className="text-primary flex-shrink-0" />
                    <span className="first-letter:uppercase font-medium text-sm">{suggestion}</span>
                    <span className="text-xs text-muted-foreground group-hover:text-accent-foreground ml-auto">
                      выбрать
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Сообщение об ошибке */}
          {validationError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-2 animate-in fade-in duration-200">
              <div className="flex items-center space-x-2 text-red-800">
                <X size={16} />
                <span className="text-sm font-medium">{validationError}</span>
              </div>
            </div>
          )}
        </div>

        {/* Быстрый выбор распространенных аллергенов */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-3 text-foreground">
            Быстрый выбор:
          </p>
          <div className="flex flex-wrap gap-2">
            {commonAllergens.map(allergen => (
              <button
                key={allergen}
                onClick={() => handleCommonAllergenClick(allergen)}
                disabled={currentExcludes.includes(allergen)}
                className={`
                  px-3 py-2 
                  rounded-lg 
                  text-xs md:text-sm 
                  font-medium 
                  transition-all
                  ${currentExcludes.includes(allergen)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }
                `}
              >
                {allergen}
              </button>
            ))}
          </div>
        </div>

        {/* Список исключенных ингредиентов */}
        {currentExcludes.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2 text-foreground">
              Исключаем ({currentExcludes.length}):
            </p>
            <div className="flex flex-wrap gap-2">
              {currentExcludes.map(ingredient => (
                <span 
                  key={ingredient} 
                  className="
                    bg-red-100 text-red-800 
                    px-3 py-2 
                    rounded-full 
                    text-sm font-medium 
                    flex items-center space-x-2
                    group
                    transition-all
                  "
                >
                  <span className="first-letter:uppercase text-sm">{ingredient}</span>
                  <button 
                    onClick={() => handleRemoveExclude(ingredient)}
                    className="
                      opacity-70 
                      group-hover:opacity-100 
                      hover:bg-red-200 
                      rounded-full 
                      p-0.5
                      transition-all
                    "
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}