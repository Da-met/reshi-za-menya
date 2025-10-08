'use client';

import { Heart, Clock, Zap, Trash2 } from 'lucide-react';

// Временные данные для демонстрации
const mockSavedRecipes = [
  {
    recipe: {
      id: '1',
      title: 'Курица с рисом и овощами',
      description: 'Ароматное и сытное блюдо',
      cookingTime: '35 минут',
      difficulty: 'Легко'
    },
    savedAt: new Date('2024-01-15')
  },
  {
    recipe: {
      id: '2', 
      title: 'Сырники с ягодами',
      description: 'Нежные творожные сырники',
      cookingTime: '25 минут',
      difficulty: 'Легко'
    },
    savedAt: new Date('2024-01-10')
  }
];

export function SavedRecipes() {
  const handleDeleteRecipe = (recipeId: string) => {
    console.log('Удаление рецепта:', recipeId);
    // Здесь будет логика удаления
  };

  if (mockSavedRecipes.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h3 className="text-xl font-semibold text-foreground mb-2">Нет сохраненных рецептов</h3>
        <p className="text-muted-foreground">
          Сохраняйте понравившиеся рецепты, чтобы вернуться к ним позже
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Мои рецепты</h2>
        <span className="text-muted-foreground">
          {mockSavedRecipes.length} рецепт{mockSavedRecipes.length !== 1 ? 'а' : ''}
        </span>
      </div>

      <div className="grid gap-4">
        {mockSavedRecipes.map((savedRecipe) => (
          <div
            key={savedRecipe.recipe.id}
            className="bg-card rounded-xl shadow-lg p-4 md:p-6 border-l-4 border-primary"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                  {savedRecipe.recipe.title}
                </h3>
                <p className="text-muted-foreground mb-3 text-sm md:text-base">
                  {savedRecipe.recipe.description}
                </p>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{savedRecipe.recipe.cookingTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap size={14} />
                    <span>{savedRecipe.recipe.difficulty}</span>
                  </div>
                  <div className="text-muted-foreground">
                    Сохранено: {savedRecipe.savedAt.toLocaleDateString('ru-RU')}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => console.log('Открыть рецепт:', savedRecipe.recipe.id)}
                  className="
                    px-4 py-2 
                    bg-primary text-primary-foreground 
                    rounded-lg 
                    font-medium 
                    text-sm
                    hover:bg-primary/90
                    transition-colors
                  "
                >
                  Открыть
                </button>
                <button
                  onClick={() => handleDeleteRecipe(savedRecipe.recipe.id)}
                  className="
                    p-2 
                    bg-muted text-muted-foreground 
                    rounded-lg 
                    hover:bg-red-100 hover:text-red-600
                    transition-colors
                  "
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}