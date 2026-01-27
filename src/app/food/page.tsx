'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FoodResponse, FoodRequest } from '@/types/food';
import { FoodGenerator } from '@/components/food/FoodGenerator';
import { FoodResult } from '@/components/food/FoodResult';
import { SavedRecipes } from '@/components/food/SavedRecipes';

function FoodContent() {
  const searchParams = useSearchParams();
  const [currentView, setCurrentView] = useState<'generator' | 'saved'>('generator');
  const [currentRecipe, setCurrentRecipe] = useState<FoodResponse | null>(null);
  const [currentRequest, setCurrentRequest] = useState<FoodRequest>({
    mode: 'products',
    products: [],
    excludeIngredients: [],
    filters: {}
  });
  const [isGenerating, setIsGenerating] = useState(false);

  // При загрузке проверяем параметр URL
  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'saved') {
      setCurrentView('saved');
    }
  }, [searchParams]);

  // Функция для переключения вкладок с обновлением URL
  const handleViewChange = (view: 'generator' | 'saved') => {
    setCurrentView(view);
    // Можно добавить обновление URL если нужно
    // const newUrl = view === 'saved' ? '/food?view=saved' : '/food';
    // window.history.pushState({}, '', newUrl);
  };

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
              text-4xl md:text-5xl lg:text-6xl 
              text-foreground
              mb-2 md:mb-3
              px-2
            ">
              Что приготовить?
            </h1>
            <p className="
              text-sm md:text-base lg:text-lg xl:text-xl
              text-muted-foreground
              max-w-3xl 
              mx-auto
              px-4
            ">
              Превратим ваши продукты в кулинарные шедевры или найдем идеальный рецепт
            </p>
          </header>
          
          {/* Переключение между вкладками */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-6 md:mb-8">
            <button
              onClick={() => handleViewChange('generator')}
              className={`
                px-5 py-3 md:px-6 md:py-3 
                rounded-full 
                font-medium 
                transition-all
                text-sm md:text-base
                cursor-pointer
                ${currentView === 'generator'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
                }
              `}
            >
              🍳 Генератор рецептов
            </button>
            <button
              onClick={() => handleViewChange('saved')}
              className={`
                px-5 py-3 md:px-6 md:py-3 
                rounded-full 
                font-medium 
                transition-all
                text-sm md:text-base
                cursor-pointer
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

export default function FoodPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    }>
      <FoodContent />
    </Suspense>
  );
}