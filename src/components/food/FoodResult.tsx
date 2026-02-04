'use client';

import { FoodResponse } from '@/types/food';
import { useState } from 'react';
import { Save, RotateCw, Check, Sparkles, Clock, Zap, ShoppingCart, ChefHat, Share2 } from 'lucide-react';
import Image from 'next/image';

interface FoodResultProps {
  recipe: FoodResponse;
  onSave: () => void;
  onGenerateAnother: () => void;
}

export function FoodResult({ recipe, onSave, onGenerateAnother }: FoodResultProps) {
  const [saved, setSaved] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleSave = () => {
    onSave();
    setSaved(true);
  };

  const handleAddToCart = (ingredient: string) => {
    console.log('Добавлено в корзину:', ingredient);
  };

  const handleAddAllToCart = () => {
    recipe.recipe.ingredients.toBuy.forEach(item => {
      handleAddToCart(item.name);
    });
  };

  const recipeInfo = recipe.recipe;

  return (
    <div className="space-y-6 md:space-y-8 mt-8">
      
      {/* Блок "ВАШ ИДЕАЛЬНЫЙ РЕЦЕПТ" */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-3">
          <Sparkles size={20} className="text-primary" />
          <h2 className="text-xl md:text-2xl lg:text-3xl font-accent text-foreground">
            ВАШ ИДЕАЛЬНЫЙ РЕЦЕПТ!
          </h2>
          <Sparkles size={20} className="text-secondary" />
        </div>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          Вот что мы предлагаем приготовить из ваших продуктов
        </p>
      </div>

      {/* Основной контент */}
      <div className="space-y-6">
        
        {/* Основной блок с рецептом */}
        <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
          
          {/* Верхняя часть */}
          <div className="p-6 md:p-8">
            <h1 className="text-xl md:text-2xl lg:text-3xl text-foreground mb-3">
              {recipeInfo.title}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
              {recipeInfo.description}
            </p>
            
            {/* Чипы */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">
                <Clock size={12} className="mr-1" />
                {recipeInfo.cookingTime}
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">
                <Zap size={12} className="mr-1" />
                {recipeInfo.difficulty}
              </span>
            </div>
          </div>

          {/* Изображение блюда */}
          <div className="border-t border-border p-6 md:p-8">
            {recipeInfo.imageUrl && !imageError ? (
              <div className="relative rounded-xl overflow-hidden shadow-lg bg-muted/20">
                <div className="aspect-[4/3] relative">
                  <Image 
                    src={recipeInfo.imageUrl}
                    alt={recipeInfo.title}
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                </div>
              </div>
            ) : (
              <div className="aspect-[4/3] bg-muted rounded-xl flex items-center justify-center shadow-lg">
                <ChefHat className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground/50" />
              </div>
            )}
          </div>

          {/* Ингредиенты */}
          <div className="border-t border-border p-6 md:p-8">
            <h2 className="text-lg md:text-xl text-foreground mb-4">Ингредиенты</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* У вас есть */}
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base md:text-lg text-foreground font-medium">У вас есть</h3>
                  <span className="text-xs md:text-sm text-muted-foreground font-medium px-2 py-1 rounded bg-green-50 dark:bg-green-900/30">
                    {recipeInfo.ingredients.available.length} шт
                  </span>
                </div>
                
                <div className="space-y-2">
                  {recipeInfo.ingredients.available.map((ingredient, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <div className="min-w-0">
                          <span className="text-sm md:text-base text-foreground font-medium block truncate">
                            {ingredient.name}
                          </span>
                          {ingredient.quantity && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                              <span>{ingredient.quantity}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Нужно купить */}
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base md:text-lg text-foreground font-medium">Нужно купить</h3>
                  <span className="text-xs md:text-sm text-muted-foreground font-medium px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/30">
                    {recipeInfo.ingredients.toBuy.length} шт
                  </span>
                </div>
                
                <div className="space-y-2">
                  {recipeInfo.ingredients.toBuy.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <div className="min-w-0">
                          <span className="text-sm md:text-base text-foreground font-medium block truncate">
                            {item.name}
                          </span>
                          {item.quantity && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                              <span>{item.quantity}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleAddToCart(item.name)}
                        className="px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg border border-border transition-all flex-shrink-0 ml-2 whitespace-nowrap"
                        title="Добавить в корзину"
                      >
                        В корзину
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Кнопка "Купить ингредиенты" */}
          {recipeInfo.ingredients.toBuy.length > 0 && (
            <div className="border-t border-border p-6 md:p-8 bg-gradient-to-r from-primary/20 to-primary/30">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-sm text-muted-foreground">Все ингредиенты в одном заказе</p>
                  <p className="text-lg md:text-xl font-bold text-primary">СберМаркет, Яндекс.Лавка</p>
                </div>
                <button 
                  onClick={handleAddAllToCart}
                  className="
                    flex items-center justify-center gap-2
                    px-4 py-3
                    bg-primary text-primary-foreground
                    rounded-lg
                    font-medium
                    hover:bg-primary/90
                    transition-colors
                    w-full sm:w-auto
                    text-sm md:text-base
                  "
                >
                  <ShoppingCart size={18} />
                  <span>Купить ингредиенты</span>
                </button>
              </div>
            </div>
          )}

          {/* Пищевая ценность */}
          {recipeInfo.nutritionInfo && (
            <div className="border-t border-border p-6 md:p-8">
              <h2 className="text-lg md:text-xl text-foreground mb-4">Пищевая ценность</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {recipeInfo.nutritionInfo.calories && (
                  <div className="text-center p-3 bg-accent rounded-lg border border-border">
                    <div className="font-bold text-foreground text-base">{recipeInfo.nutritionInfo.calories}</div>
                    <div className="text-xs text-muted-foreground mt-1">Калории</div>
                  </div>
                )}
                {recipeInfo.nutritionInfo.protein && (
                  <div className="text-center p-3 bg-accent rounded-lg border border-border">
                    <div className="font-bold text-foreground text-base">{recipeInfo.nutritionInfo.protein}</div>
                    <div className="text-xs text-muted-foreground mt-1">Белки</div>
                  </div>
                )}
                {recipeInfo.nutritionInfo.carbs && (
                  <div className="text-center p-3 bg-accent rounded-lg border border-border">
                    <div className="font-bold text-foreground text-base">{recipeInfo.nutritionInfo.carbs}</div>
                    <div className="text-xs text-muted-foreground mt-1">Углеводы</div>
                  </div>
                )}
                {recipeInfo.nutritionInfo.fats && (
                  <div className="text-center p-3 bg-accent rounded-lg border border-border">
                    <div className="font-bold text-foreground text-base">{recipeInfo.nutritionInfo.fats}</div>
                    <div className="text-xs text-muted-foreground mt-1">Жиры</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Шаги приготовления */}
          <div className="border-t border-border p-6 md:p-8">
            <h2 className="text-lg md:text-xl text-foreground mb-4">Шаги приготовления</h2>
            <div className="space-y-3">
              {recipeInfo.steps.map((step, index) => (
                <div key={index} className="flex gap-4 p-4 bg-primary/10 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-foreground text-sm md:text-base leading-relaxed flex-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Советы */}
          {recipeInfo.tips && recipeInfo.tips.length > 0 && (
            <div className="border-t border-border p-6 md:p-8 bg-primary/5">
              <div className="space-y-4">
                <h2 className="text-lg md:text-xl text-foreground">Полезные советы</h2>
                <ul className="space-y-3">
                  {recipeInfo.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm md:text-base text-muted-foreground leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Кнопки действий */}
        <div className="bg-card rounded-2xl shadow-lg p-4 md:p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            
            {/* Кнопки сохранить и поделиться */}
            <div className="flex flex-col xs:flex-row gap-3 flex-1">
              <button
                onClick={handleSave}
                disabled={saved}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-colors flex-1 min-w-0 ${
                  saved
                    ? 'bg-green-500 text-white cursor-not-allowed'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {saved ? <Check size={16} className="flex-shrink-0" /> : <Save size={16} className="flex-shrink-0" />}
                <span className="font-semibold text-xs md:text-sm sm:text-base truncate">
                  {saved ? 'Сохранено!' : 'Сохранить рецепт'}
                </span>
              </button>
              
              <button className="flex items-center justify-center gap-2 py-3 px-4 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-secondary/90 transition-colors flex-1 min-w-0">
                <Share2 size={16} className="flex-shrink-0" />
                <span className="text-xs md:text-sm sm:text-base truncate">Поделиться</span>
              </button>
            </div>

            {/* Кнопка другой вариант */}
            <button
              onClick={onGenerateAnother}
              className="flex items-center justify-center gap-2 py-3 px-4 border border-border text-foreground rounded-xl font-semibold hover:bg-accent transition-colors min-w-0"
            >
              <RotateCw size={16} className="flex-shrink-0" />
              <span className="text-xs md:text-sm sm:text-base truncate">Другой вариант</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}