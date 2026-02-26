'use client';

import React, { useState } from 'react';
import { ChefHat, CheckCircle, Circle, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { FoodResponse } from '@/types/food';
import { FoodOptionTag } from './FoodOptionTag';
import { SafeContent } from '@/components/ui/safe/SafeContent';
import { InfoSection } from '@/components/ui/shared/InfoSection';
import { 
  dishTypeLabels, 
  cuisineLabels, 
  DIFFICULTY_LEVELS 
} from '@/constants/food.constants';

interface FoodRecipeCardProps {
  recipe: FoodResponse['recipe'];
  className?: string;
}

function FoodRecipeCardComponent({ recipe: initialRecipe, className = '' }: FoodRecipeCardProps) {
  const [imageError, setImageError] = React.useState(false);
  
  // Состояние для ингредиентов с возможностью редактирования
  const [ingredients, setIngredients] = useState({
    available: [...initialRecipe.ingredients.available],
    toBuy: [...initialRecipe.ingredients.toBuy]
  });

  // Переместить из "Нужно купить" в "У вас есть"
  const handleMoveToAvailable = (index: number) => {
    const ingredient = ingredients.toBuy[index];
    const newToBuy = ingredients.toBuy.filter((_, i) => i !== index);
    setIngredients({
      available: [...ingredients.available, ingredient],
      toBuy: newToBuy
    });
  };

  // Переместить из "У вас есть" в "Нужно купить"
  const handleMoveToBuy = (index: number) => {
    const ingredient = ingredients.available[index];
    const newAvailable = ingredients.available.filter((_, i) => i !== index);
    setIngredients({
      available: newAvailable,
      toBuy: [...ingredients.toBuy, ingredient]
    });
  };

  return (
    <div className={`bg-card rounded-2xl shadow-lg overflow-hidden ${className}`}>
      {/* Заголовок и теги - ВО ВЕСЬ БЛОК */}
      <div className="p-6 md:p-8 pb-0">
        <h2 className="text-2xl md:text-3xl font-accent text-foreground mb-3">
          {initialRecipe.title}
        </h2>

        {/* Теги */}
        <div className="flex flex-wrap gap-2">
          {initialRecipe.cookingTime && (
            <FoodOptionTag
              type="cookingTime"
              label={initialRecipe.cookingTime}
            />
          )}
          {initialRecipe.difficulty && (
            <FoodOptionTag
              type="difficulty"
              label={DIFFICULTY_LEVELS.find(d => d.id === initialRecipe.difficulty)?.label || initialRecipe.difficulty}
            />
          )}
          {initialRecipe.servings && (
            <FoodOptionTag
              type="requestServings"
              label={initialRecipe.servings}
            />
          )}
          {initialRecipe.cuisine && (
            <FoodOptionTag
              type="cuisine"
              label={cuisineLabels[initialRecipe.cuisine] || initialRecipe.cuisine}
            />
          )}
          {initialRecipe.dishType && (
            <FoodOptionTag
              type="dishType"
              label={dishTypeLabels[initialRecipe.dishType] || initialRecipe.dishType}
            />
          )}
        </div>
      </div>

      {/* Изображение */}
      <div className="p-6 md:p-8">
        <div className="rounded-xl overflow-hidden bg-muted/20 max-w-2xl mx-auto w-full md:w-3/4 lg:w-2/3"> {/* 👈 адаптивная ширина */}
          <div className="aspect-[4/3] relative h-full">
            {initialRecipe.imageUrl && !imageError ? (
              <Image
                src={initialRecipe.imageUrl}
                alt={initialRecipe.title}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <ChefHat size={48} className="text-muted-foreground/30" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ОПИСАНИЕ */}
      <InfoSection title="Описание">
        <SafeContent
          content={initialRecipe.description}
          type="paragraphs"
          className="text-sm md:text-base text-muted-foreground leading-relaxed"
        />
      </InfoSection>


      {/* ПИЩЕВАЯ ЦЕННОСТЬ (на 100г) */}
      {initialRecipe.nutritionInfo && (
        <div className="border-t border-border">
          <div className="p-6 md:p-8">
            <h3 className="text-lg md:text-xl text-foreground mb-4">Пищевая ценность на 100г</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {initialRecipe.nutritionInfo.calories && (
                <div className="text-center p-3 bg-secondary/20 rounded-lg border border-border">
                  <div className="font-bold text-foreground text-base">{initialRecipe.nutritionInfo.calories}</div>
                  <div className="text-xs text-muted-foreground mt-1">Калории</div>
                </div>
              )}
              {initialRecipe.nutritionInfo.protein && (
                <div className="text-center p-3 bg-secondary/20 rounded-lg border border-border">
                  <div className="font-bold text-foreground text-base">{initialRecipe.nutritionInfo.protein}</div>
                  <div className="text-xs text-muted-foreground mt-1">Белки</div>
                </div>
              )}
              {initialRecipe.nutritionInfo.carbs && (
                <div className="text-center p-3 bg-secondary/20 rounded-lg border border-border">
                  <div className="font-bold text-foreground text-base">{initialRecipe.nutritionInfo.carbs}</div>
                  <div className="text-xs text-muted-foreground mt-1">Углеводы</div>
                </div>
              )}
              {initialRecipe.nutritionInfo.fats && (
                <div className="text-center p-3 bg-secondary/20 rounded-lg border border-border">
                  <div className="font-bold text-foreground text-base">{initialRecipe.nutritionInfo.fats}</div>
                  <div className="text-xs text-muted-foreground mt-1">Жиры</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}


      {/* ИНГРЕДИЕНТЫ */}
      <div className="border-t border-border">
        <div className="p-6 md:p-8">
          <h3 className="text-lg md:text-xl text-foreground mb-4">Ингредиенты</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* У вас есть */}
            {ingredients.available.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-green-600">✓ У вас есть</h4>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {ingredients.available.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {ingredients.available.map((item, index) => (
                    <div
                      key={`avail-${index}`}
                      className="flex items-center justify-between p-3 border border-primary/50 rounded-lg group hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                        <div className="min-w-0">
                          <span className="text-foreground font-bold block truncate">{item.name}</span>
                          {item.quantity && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                              <span>{item.quantity}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleMoveToBuy(index)}
                        className="px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-accent rounded border border-border transition-all flex-shrink-0 ml-2"
                      >
                        В покупки
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Нужно купить */}
            {ingredients.toBuy.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-blue-600">🛒 Нужно купить</h4>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {ingredients.toBuy.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {ingredients.toBuy.map((item, index) => (
                    <div
                      key={`buy-${index}`}
                      className="flex items-center justify-between p-3 border border-primary/50 rounded-lg group hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Circle size={16} className="text-blue-600 flex-shrink-0" />
                        <div className="min-w-0">
                          <span className="text-foreground font-bold block truncate">{item.name}</span>
                          {item.quantity && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                              <span>{item.quantity}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleMoveToAvailable(index)}
                        className="px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-accent rounded border border-border transition-all flex-shrink-0 ml-2"
                      >
                        Уже есть
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* КНОПКА "ЗА ПОКУПКАМИ" - КАК В ПРИМЕРЕ */}
              {ingredients.toBuy.length > 0 && (
                <div className="mt-6 p-4 bg-gradient-to-r from-primary/20 to-primary/30 rounded-xl border border-primary/20">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-center sm:text-left">
                      <p className="text-sm text-muted-foreground">Все ингредиенты в одном заказе</p>
                      <p className="text-2xl font-bold text-primary">СберМаркет, Яндекс.Лавка</p>
                    </div>
                    <button
                      onClick={() => {
                        // Здесь будет логика перехода в магазин
                        console.log('Купить ингредиенты:', ingredients.toBuy);
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors w-full sm:w-auto"
                    >
                      <ShoppingCart size={20} />
                      <span>За покупками</span>
                    </button>
                  </div>
                </div>
              )}
        </div>
      </div>


      {/* ШАГИ ПРИГОТОВЛЕНИЯ */}
      {initialRecipe.steps && initialRecipe.steps.length > 0 && (
        <InfoSection title="Приготовление">
          <div className="space-y-4">
            {initialRecipe.steps.map((step, index) => (
              <div key={index} className="flex gap-4 p-4 bg-primary/5 rounded-lg">
                <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold">
                  {index + 1}
                </div>
                <SafeContent
                  content={step}
                  type="text"
                  className="text-sm md:text-base text-muted-foreground flex-1"
                />
              </div>
            ))}
          </div>
        </InfoSection>
      )}

      {/* СОВЕТЫ */}
      {initialRecipe.tips && initialRecipe.tips.length > 0 && (
        <InfoSection title="Полезные советы">
          <ul className="space-y-2">
            {initialRecipe.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                <SafeContent content={tip} type="text" />
              </li>
            ))}
          </ul>
        </InfoSection>
      )}

      {/* ПОЧЕМУ ПОДХОДИТ ИМЕННО ВАМ */}
      {initialRecipe.whyPerfect && (
        <InfoSection title="Почему это идеально для вас" variant="accent">
          <SafeContent
            content={initialRecipe.whyPerfect}
            type="paragraphs"
            className="text-sm md:text-base text-muted-foreground leading-relaxed"
          />
        </InfoSection>
      )}
    </div>
  );
}

export const FoodRecipeCard = React.memo(FoodRecipeCardComponent);
FoodRecipeCard.displayName = 'FoodRecipeCard';