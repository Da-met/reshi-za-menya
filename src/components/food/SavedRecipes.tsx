'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Trash2, Utensils, Clock, MoreVertical, Eye, EyeOff, Zap, ShoppingCart } from 'lucide-react';
import { SavedRecipe } from '@/types/food';
import { SeasonalBanner } from './SeasonalBanner';

// Временные данные
const mockSavedRecipes: SavedRecipe[] = [
  {
    recipe: {
      id: '1',
      title: 'Курица с рисом и овощами в сливочном соусе',
      description: 'Ароматное и сытное блюдо с нежным сливочным вкусом',
      ingredients: {
        available: [
          { name: 'куриное филе', quantity: '400 г' },
          { name: 'лук репчатый', quantity: '1 шт' },
          { name: 'чеснок', quantity: '3 зубчика' }
        ],
        toBuy: [
          { name: 'рис басмати', quantity: '200 г' },
          { name: 'сливки 20%', quantity: '200 мл' },
          { name: 'брокколи', quantity: '1 головка' }
        ]
      },
      steps: ['Нарезать курицу', 'Обжарить с луком', 'Добавить рис и сливки', 'Тушить 15 минут'],
      cookingTime: '35 минут',
      difficulty: 'Легко',
      nutritionInfo: {
        calories: '420 ккал',
        protein: '35 г'
      }
    },
    generationId: 'gen-1',
    savedAt: new Date('2024-01-15'),
    note: 'Очень понравилось детям! Можно добавить больше овощей в следующий раз.'
  },
  {
    recipe: {
      id: '2',
      title: 'Сырники с ягодами и медом',
      description: 'Нежные творожные сырники с свежими ягодами и ароматным медом',
      ingredients: {
        available: [
          { name: 'творог', quantity: '500 г' },
          { name: 'яйца', quantity: '2 шт' },
          { name: 'мука', quantity: '3 ст.л.' }
        ],
        toBuy: [
          { name: 'свежие ягоды', quantity: '150 г' },
          { name: 'мед', quantity: '3 ст.л.' },
          { name: 'сметана', quantity: '100 г' }
        ]
      },
      steps: ['Смешать творог с яйцами', 'Добавить муку', 'Обжарить на сковороде'],
      cookingTime: '25 минут',
      difficulty: 'Легко'
    },
    generationId: 'gen-2',
    savedAt: new Date('2024-01-10')
  }
];

export function SavedRecipes() {
  const router = useRouter();
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>(mockSavedRecipes);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDeleteRecipe = (recipeId: string) => {
    console.log('Удаление рецепта:', recipeId);
    setSavedRecipes(prev => prev.filter(recipe => recipe.recipe.id !== recipeId));
    setActiveDropdown(null);
  };

  const handleToggleCooked = (recipeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Здесь можно добавить логику отметки о приготовлении
    console.log('Отметка о приготовлении:', recipeId);
  };

  const handleOpenRecipe = (recipeId: string) => {
    router.push(`/food/saved/${recipeId}`);
  };

  const toggleDropdown = (recipeId: string) => {
    setActiveDropdown(activeDropdown === recipeId ? null : recipeId);
  };

  if (savedRecipes.length === 0) {
    return (
      <div className="text-center py-16">
        <SeasonalBanner />
        <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-dashed border-muted-foreground/20">
          <Utensils className="w-10 h-10 text-muted-foreground/60" />
        </div>
        <h3 className="text-xl text-foreground mb-3">Нет сохраненных рецептов</h3>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Сохраняйте понравившиеся рецепты, чтобы вернуться к ним позже
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SeasonalBanner />
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-muted-foreground">
            {savedRecipes.length} сохранен{savedRecipes.length === 1 ? 'ый' : 'ых'} рецепт{savedRecipes.length === 1 ? '' : 'а'}
          </p>
        </div>
      </div>

      <div className="grid gap-5">
        {savedRecipes.map((savedRecipe) => {
          const isDropdownOpen = activeDropdown === savedRecipe.recipe.id;
          
          return (
            <div
              key={savedRecipe.recipe.id}
              className="group bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-200 hover:shadow-sm cursor-pointer"
              onClick={() => handleOpenRecipe(savedRecipe.recipe.id)}
            >
              <div className="p-6">
                {/* Заголовок и меню */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl md:text-3xl text-foreground leading-tight break-words group-hover:text-primary transition-colors">
                      {savedRecipe.recipe.title}
                    </h3>
                    
                    {/* Мета-информация */}
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span className="flex items-center gap-1 text-lg text-primary font-semibold">
                        <Clock size={16} />
                        {savedRecipe.recipe.cookingTime}
                      </span>
                      <span className="flex items-center gap-1 text-lg text-primary font-semibold">
                        <Zap size={16} />
                        {savedRecipe.recipe.difficulty}
                      </span>
                      {savedRecipe.recipe.nutritionInfo?.calories && (
                        <span className="text-lg text-blue-600 font-semibold">
                          {savedRecipe.recipe.nutritionInfo.calories}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Выпадающее меню */}
                  <div className="relative flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(savedRecipe.recipe.id);
                      }}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                    >
                      <MoreVertical size={16} />
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute right-0 top-full mt-1 w-32 bg-card border border-border rounded-lg shadow-lg z-10 py-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleCooked(savedRecipe.recipe.id, e);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                        >
                          <Eye size={14} />
                          Приготовил
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteRecipe(savedRecipe.recipe.id);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={14} />
                          Удалить
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Описание */}
                <p className="text-muted-foreground leading-relaxed text-sm mb-4 line-clamp-2">
                  {savedRecipe.recipe.description}
                </p>

                {/* Ингредиенты */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-sm font-medium text-foreground">Ингредиенты:</span>
                    <span className="text-sm text-green-600">
                      {savedRecipe.recipe.ingredients.available.length} есть
                    </span>
                    <span className="text-sm text-blue-600">
                      {savedRecipe.recipe.ingredients.toBuy.length} купить
                    </span>
                  </div>
                </div>

                {/* Кнопка быстрой покупки */}
                <div className="mb-4">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Быстрая покупка:', savedRecipe.recipe.id);
                    }}
                    className="flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm"
                  >
                    <ShoppingCart size={14} />
                    Купить недостающие ингредиенты
                  </button>
                </div>

                {/* Заметка */}
                {savedRecipe.note && (
                  <div className="mb-4 p-3 bg-primary/20 border border-primary/30 rounded-lg">
                    <p className="text-sm text-foreground break-words line-clamp-2">{savedRecipe.note}</p>
                  </div>
                )}

                {/* Футер с датой */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock size={12} />
                    <span>Сохранено {savedRecipe.savedAt.toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}