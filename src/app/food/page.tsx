'use client';

import { Suspense, useState, useEffect, lazy } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FoodResponse, FoodRequest } from '@/types/food';

const FoodGenerator = lazy(() => 
  import('@/components/food/FoodGenerator').then(mod => ({ 
    default: mod.FoodGenerator 
  }))
);

const SavedRecipes = lazy(() => 
  import('@/components/food/SavedRecipes').then(mod => ({ 
    default: mod.SavedRecipes 
  }))
);

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Загрузка модуля рецептов...</p>
      </div>
    </div>
  );
}

function FoodContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentView, setCurrentView] = useState<'generator' | 'saved'>('generator');
  const [currentRequest, setCurrentRequest] = useState<FoodRequest>({
    mode: 'products',
    products: [],
    excludeIngredients: [],
    filters: {}
  });

  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'saved') {
      setCurrentView('saved');
    }
  }, [searchParams]);

  const handleViewChange = (view: 'generator' | 'saved') => {
    setCurrentView(view);
    const newParams = new URLSearchParams(searchParams.toString());
    if (view === 'saved') {
      newParams.set('view', 'saved');
    } else {
      newParams.delete('view');
    }
    router.replace(`/food?${newParams.toString()}`, { scroll: false });
  };

  const handleRequestChange = (request: FoodRequest) => {
    setCurrentRequest(request);
  };

  // Для аналитики или сохранения в историю
  const handleRecipeGenerated = (recipe: FoodResponse) => {
    console.log('Рецепт сгенерирован:', recipe);
  };

  return (
    <div className="min-h-screen bg-background py-6 md:py-8 lg:py-10">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-accent text-foreground mb-3 md:mb-4">
            Что приготовить?
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
            Превратим ваши продукты в кулинарные шедевры или найдем идеальный рецепт
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-6 md:mb-8">
            <button
              onClick={() => handleViewChange('generator')}
              className={`px-5 py-3 md:px-6 md:py-3 rounded-full font-medium transition-all text-sm md:text-base cursor-pointer ${
                currentView === 'generator'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              🍳 Генератор рецептов
            </button>
            <button
              onClick={() => handleViewChange('saved')}
              className={`px-5 py-3 md:px-6 md:py-3 rounded-full font-medium transition-all text-sm md:text-base cursor-pointer ${
                currentView === 'saved'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              💾 Мои рецепты
            </button>
          </div>
        </div>

        <Suspense fallback={
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Загрузка...</p>
            </div>
          </div>
        }>
          {currentView === 'generator' ? (
            <FoodGenerator
              key="food-generator"
              onRecipeGenerated={handleRecipeGenerated}
              onRequestChange={handleRequestChange}
              currentRequest={currentRequest}
            />
          ) : (
            <SavedRecipes />
          )}
        </Suspense>
      </div>
    </div>
  );
}

export default function FoodPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <FoodContent />
    </Suspense>
  );
}