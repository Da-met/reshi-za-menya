'use client';

import { useState, useEffect, useRef } from 'react';
import { FoodRequest, FoodResponse } from '@/types/food';
import { Edit3, Filter, XCircle } from 'lucide-react';
import { FOOD_BANNER } from '@/constants/food.constants';
import { PromotionalBanner } from '@/components/ui/shared';
import { SelectedOptions } from './SelectedOptions';
import { FiltersSection } from './sections/FiltersSection';
import { ExcludeSection } from './sections/ExcludeSection';
import { InputModeSection } from './sections/InputModeSection';
import { useFoodForm } from '@/hooks/food/useFoodForm';
import { useFoodApi } from '@/hooks/food/useFoodApi';
import { UniversalLoader } from '@/components/ui/UniversalLoader';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { FoodResult } from './FoodResult';
import { commonDishes } from '@/data/dishesData';


interface FoodGeneratorProps {
  onRecipeGenerated?: (recipe: FoodResponse) => void;
  onRequestChange?: (request: FoodRequest) => void;
  currentRequest?: FoodRequest;
}

export function FoodGenerator({
  onRecipeGenerated,
  onRequestChange,
  currentRequest
}: FoodGeneratorProps) {
  const { 
    request: foodRequest, 
    updateRequest, 
    isValid,
    resetFilters,
    clearProducts,
    clearDishName
  } = useFoodForm(currentRequest);

  const [activeSection, setActiveSection] = useState<'input' | 'filters' | 'exclude'>('input');
  const [currentRecipe, setCurrentRecipe] = useState<FoodResponse | null>(null);

  // 👇 Рефы для скролла
  const loaderContainerRef = useRef<HTMLDivElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  const {
    generateRecipe,
    isLoading,
    error,
    clearError
  } = useFoodApi({
    onSuccess: (recipe) => {
      setCurrentRecipe(recipe);
      onRecipeGenerated?.(recipe);
    },
    onError: (err) => {
      console.error('Ошибка генерации рецепта:', err);
    },
    timeoutMs: 30000,
    maxRetries: 2,
    enableCache: true
  });


  useEffect(() => {
    onRequestChange?.(foodRequest);
  }, [foodRequest, onRequestChange]);

  // 👇 Скролл к лоудеру
  useEffect(() => {
    if (isLoading && loaderContainerRef.current) {
      setTimeout(() => {
        loaderContainerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 200);
    }
  }, [isLoading]);

  // 👇 Скролл к результату
  useEffect(() => {
    if (currentRecipe && resultsContainerRef.current) {
      setTimeout(() => {
        resultsContainerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  }, [currentRecipe]);

  const handleModeChange = (mode: 'products' | 'dish') => {
    if (mode === foodRequest.mode) return;
    
    if (mode === 'products') {
      clearDishName();
      resetFilters();
    } else {
      clearProducts();
    }
    
    updateRequest({ mode });
    clearError();
  };

  const handleGenerate = async () => {
    if (!isValid || isLoading) return;

    setCurrentRecipe(null);
    await generateRecipe(foodRequest);
  };

  const handleGenerateAnother = async (excludeTitle?: string) => {
    if (!isValid || isLoading) return;
    
    setCurrentRecipe(null);
    await generateRecipe(foodRequest, excludeTitle);
  };

  const handleLucky = async () => {
    if (isLoading) return;
    
    const randomDish = commonDishes[Math.floor(Math.random() * commonDishes.length)];
    
    const randomRequest: FoodRequest = {
      mode: 'dish',
      dishName: randomDish,
      filters: {} // БЕЗ фильтров!
    };

    setCurrentRecipe(null);
    await generateRecipe(randomRequest);
  };

  const handleRequestChange = (updates: Partial<FoodRequest>) => {
    updateRequest(updates);
    clearError();
  };

  return (
    <div className="space-y-6">
      <PromotionalBanner
        title={FOOD_BANNER.title}
        description={FOOD_BANNER.description}
        route={FOOD_BANNER.route}
        emoji={FOOD_BANNER.emoji}
      />
      
      <SelectedOptions request={foodRequest} />
      
      {error && (
        <ErrorDisplay
          error={error}
          onRetry={handleGenerate}
          onDismiss={clearError}
          module="recipes"
        />
      )}
      
      <div className="bg-card rounded-2xl shadow-lg p-6">
        {/* Навигация по секциям */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 mb-6 md:mb-8 p-2 sm:p-1 bg-muted rounded-xl">
          {[
            { id: 'input' as const, label: 'Режим ввода', icon: <Edit3 size={16} /> },
            { id: 'filters' as const, label: 'Фильтры', icon: <Filter size={16} /> },
            { id: 'exclude' as const, label: 'Исключить', icon: <XCircle size={16} /> }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`
                flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-3 
                rounded-lg transition-all flex-1 justify-center text-sm sm:text-base 
                cursor-pointer
                ${activeSection === section.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              {section.icon}
              <span className="font-medium">{section.label}</span>
            </button>
          ))}
        </div>

        {/* Секции формы */}
        <div className="mb-6 min-h-[300px]">
          {activeSection === 'input' && (
            <InputModeSection
              request={foodRequest}
              onChange={handleRequestChange}
              onModeChange={handleModeChange}
            />
          )}
         
          {activeSection === 'filters' && (
            <div>
              <FiltersSection
                request={foodRequest}
                onChange={handleRequestChange}
              />
            </div>
          )}

          {activeSection === 'exclude' && (
            <ExcludeSection
              request={foodRequest}
              onChange={handleRequestChange}
            />
          )}
        </div>

        {/* Кнопки генерации */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={handleGenerate}
            disabled={!isValid || isLoading}
            className={`
              w-full sm:w-auto
              px-6 py-3 md:px-8 md:py-4
              rounded-xl md:rounded-2xl
              font-bold
              text-base md:text-lg
              transition-all duration-300 transform
              cursor-pointer
              ${isValid && !isLoading
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
              }
              ${isLoading ? 'opacity-70' : ''}
            `}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2 justify-center">
                <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                <span>Готовим рецепт...</span>
              </div>
            ) : (
              '🍳 РЕШИТЬ ЗА МЕНЯ!'
            )}
          </button>
          
          <button
            onClick={handleLucky}
            disabled={isLoading}
            className="
              w-full sm:w-auto
              px-4 py-3 md:px-6 md:py-3
              rounded-xl
              font-medium
              text-sm md:text-base
              bg-secondary text-secondary-foreground
              hover:bg-secondary/80
              transition-all
              cursor-pointer
              flex items-center space-x-2 justify-center
            "
          >
            <span>🎲</span>
            <span>Мне повезет!</span>
          </button>
        </div>
        
        {!isValid && !isLoading && (
          <p className="text-sm text-muted-foreground mt-3 text-center">
            {foodRequest.mode === 'products'
              ? 'Добавьте хотя бы один продукт'
              : 'Введите название блюда'
            }
          </p>
        )}
      </div>

      {/* 👇 Лоудер с рефом для скролла */}
      <div ref={loaderContainerRef}>
        <UniversalLoader
          isVisible={isLoading}
          title="Готовим рецепт"
          message="Анализируем ваши продукты, подбираем идеальные сочетания..."
        />
      </div>

      {/* 👇 Результаты с рефом для скролла */}
      <div ref={resultsContainerRef} className="scroll-mt-24">
        {currentRecipe && !isLoading && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-5 duration-400">
            <FoodResult
              recipe={currentRecipe}
              onSave={() => console.log('Сохранить')}
              onGenerateAnother={() => handleGenerateAnother(currentRecipe.recipe.title)} 
            />
          </div>
        )}
      </div>
    </div>
  );
}