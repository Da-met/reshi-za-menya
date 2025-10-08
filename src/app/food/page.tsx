'use client';

import { useState } from 'react';
import { FoodResponse, FoodRequest } from '@/types/food';
import { FoodGenerator } from '@/components/food/FoodGenerator';
import { FoodResult } from '@/components/food/FoodResult';
import { SavedRecipes } from '@/components/food/SavedRecipes';


export default function FoodPage() {
  const [currentView, setCurrentView] = useState<'generator' | 'saved'>('generator');
  const [currentRecipe, setCurrentRecipe] = useState<FoodResponse | null>(null);
  const [currentRequest, setCurrentRequest] = useState<FoodRequest>({
    mode: 'products',
    products: [],
    excludeIngredients: [],
    filters: {}
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRecipeGenerated = (recipe: FoodResponse) => {
    setCurrentRecipe(recipe);
  };

  const handleClearRecipe = () => {
    setCurrentRecipe(null);
  };

  const handleRequestChange = (request: FoodRequest) => {
    setCurrentRequest(request);
  };

  const handleSaveRecipe = () => {
    console.log('Сохранение рецепта:', currentRecipe);
    // Здесь будет логика сохранения
  };

  return (
    <div className="min-h-screen bg-background py-6 md:py-8 lg:py-10">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Заголовок и навигация */}
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
        <header className="text-center mb-8 md:mb-10 lg:mb-12">
          <h1 className="
            text-2xl md:text-3xl lg:text-4xl xl:text-5xl  // Уменьшил размеры
            font-bold 
            text-foreground
            mb-2 md:mb-3
            px-2  // Добавил отступы по бокам
          ">
            Что приготовить?
          </h1>
          <p className="
            text-sm md:text-base lg:text-lg xl:text-xl  // Уменьшил размеры
            text-muted-foreground
            max-w-3xl 
            mx-auto
            px-4  // Добавил отступы
          ">
            Превратим ваши продукты в кулинарные шедевры или найдем идеальный рецепт
          </p>
        </header>
          
          {/* Переключение между вкладками */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-6 md:mb-8">
            <button
              onClick={() => setCurrentView('generator')}
              className={`
                px-5 py-3 md:px-6 md:py-3 
                rounded-full 
                font-medium 
                transition-all
                text-sm md:text-base
                ${currentView === 'generator'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
                }
              `}
            >
              🍳 Генератор рецептов
            </button>
            <button
              onClick={() => setCurrentView('saved')}
              className={`
                px-5 py-3 md:px-6 md:py-3 
                rounded-full 
                font-medium 
                transition-all
                text-sm md:text-base
                ${currentView === 'saved'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
                }
              `}
            >
              💾 Мои рецепты
            </button>
          </div>
        </div>

        {currentView === 'generator' ? (
          <>
            <FoodGenerator 
              onRecipeGenerated={handleRecipeGenerated}
              isGenerating={isGenerating}
              onGeneratingChange={setIsGenerating}
              onRequestChange={handleRequestChange}
              currentRequest={currentRequest}
              onClearRecipe={handleClearRecipe}
            />
            
            {currentRecipe && (
              <FoodResult
                recipe={currentRecipe}
                onSave={handleSaveRecipe}
                onGenerateAnother={() => setCurrentRecipe(null)}
              />
            )}
          </>
        ) : (
          <SavedRecipes />
        )}
      </div>
    </div>
  );
}