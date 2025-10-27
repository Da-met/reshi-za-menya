'use client';

import { useState, useEffect } from 'react';
import { FoodRequest, FoodResponse } from '@/types/food';
import { Edit3, Filter, XCircle } from 'lucide-react';
import { SeasonalBanner } from './SeasonalBanner';
import { SelectedOptions } from './SelectedOptions';
import { FiltersSection } from './sections/FiltersSection';
import { ExcludeSection } from './sections/ExcludeSection';
import { InputModeSection } from './sections/InputModeSection';



interface FoodGeneratorProps {
  onRecipeGenerated?: (recipe: FoodResponse) => void;
  isGenerating?: boolean;
  onGeneratingChange?: (generating: boolean) => void;
  onRequestChange?: (request: FoodRequest) => void;
  currentRequest?: FoodRequest;
  onClearRecipe?: () => void;
}

export function FoodGenerator({ 
  onRecipeGenerated, 
  isGenerating = false, 
  onGeneratingChange,
  onRequestChange,
  currentRequest = {
    mode: 'products',
    products: [],
    excludeIngredients: [],
    filters: {}
  },
  onClearRecipe
}: FoodGeneratorProps) {
  const [foodRequest, setFoodRequest] = useState<FoodRequest>(currentRequest);
  const [activeSection, setActiveSection] = useState<'input' | 'filters' | 'exclude'>('input');

  // Синхронизируем с родительским состоянием
  useEffect(() => {
    onRequestChange?.(foodRequest);
  }, [foodRequest, onRequestChange]);

  // Валидация формы
  const isFormValid = () => {
    if (foodRequest.mode === 'products') {
      return foodRequest.products && foodRequest.products.length > 0;
    } else {
      return !!foodRequest.dishName?.trim();
    }
  };

  const handleGenerate = async () => {
    if (!isFormValid() || isGenerating) return;
    onClearRecipe?.();
    onGeneratingChange?.(true);
    console.log('Генерируем рецепт с параметрами:', foodRequest);
    
    // Временная заглушка
    setTimeout(() => {
      const mockRecipe: FoodResponse = {
        recipe: {
          id: '1',
          title: 'Курица с рисом и овощами',
          description: 'Ароматное и сытное блюдо с нежным мясом и полезными овощами',
          ingredients: {
            available: [
              { name: 'куриное филе', quantity: '500 гр' },
              { name: 'hbc', quantity: '500 гр' },
            ],
            // ['куриное филе', 'рис'],
            toBuy: [
              { name: 'лук репчатый', quantity: '1 шт' },
              { name: 'морковь', quantity: '1 шт' },
              { name: 'сладкий перец', quantity: '1 шт' },
              { name: 'специи для курицы', quantity: 'по вкусу' }
            ]
          },
          steps: [
            'Нарежьте куриное филе кубиками и обжарьте на сковороде до золотистой корочки',
            'Добавьте нарезанный лук и морковь, обжаривайте 5 минут',
            'Всыпьте рис и залейте водой так, чтобы она покрывала ingredients на 2 см',
            'Тушите под крышкой 20 минут на медленном огне',
            'Добавьте нарезанный перец и специи, готовьте еще 5 минут'
          ],
          cookingTime: '35 минут',
          difficulty: 'Легко',
          nutritionInfo: {
            calories: '320 ккал',
            protein: '25г',
            carbs: '45г',
            fats: '8г'
          },
          tips: [
            'Для аромата можно добавить чеснок и зелень',
            'Рис можно заменить на булгур или киноа'
          ]
        },
        generationId: '123'
      };
      
      onRecipeGenerated?.(mockRecipe);
      onGeneratingChange?.(false);
    }, 2000);
  };

  const handleLucky = () => {
    onClearRecipe?.();
    onGeneratingChange?.(true);
    
    // Рандомный рецепт
    setTimeout(() => {
      const randomRecipes: FoodResponse[] = [
        // ... разные рандомные рецепты
      ];
      const randomRecipe = randomRecipes[Math.floor(Math.random() * randomRecipes.length)];
      onRecipeGenerated?.(randomRecipe);
      onGeneratingChange?.(false);
    }, 1500);
  };

  const handleRequestChange = (updates: Partial<FoodRequest>) => {
    setFoodRequest(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="space-y-6">
      {/* Сезонный баннер */}
      <SeasonalBanner />
      
      {/* Блок выбранных опций */}
      <SelectedOptions request={foodRequest} />
      
      {/* Основной генератор */}
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
              className={`flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-all flex-1 justify-center text-sm sm:text-base ${
                activeSection === section.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
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
            />
          )}
          
          {activeSection === 'filters' && (
            <FiltersSection
              request={foodRequest}
              onChange={handleRequestChange}
            />
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
            disabled={!isFormValid() || isGenerating}
            className={`
              w-full sm:w-auto
              px-6 py-3 md:px-8 md:py-4 
              rounded-xl md:rounded-2xl 
              font-bold 
              text-base md:text-lg
              transition-all duration-300 transform
              ${isFormValid() && !isGenerating
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
              }
              ${isGenerating ? 'opacity-70' : ''}
            `}
          >
            {isGenerating ? (
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
            disabled={isGenerating}
            className="
              w-full sm:w-auto
              px-4 py-3 md:px-6 md:py-3
              rounded-xl
              font-medium
              text-sm md:text-base
              bg-secondary text-secondary-foreground
              hover:bg-secondary/80
              transition-all
              flex items-center space-x-2 justify-center
            "
          >
            <span>🎲</span>
            <span>Мне повезет!</span>
          </button>
        </div>
        
        {!isFormValid() && (
          <p className="text-sm text-muted-foreground mt-3 text-center">
            {foodRequest.mode === 'products' 
              ? 'Добавьте хотя бы один продукт'
              : 'Введите название блюда'
            }
          </p>
        )}
      </div>
    </div>
  );
}