'use client';

import { FoodResponse } from '@/types/food';
import { useState } from 'react';
import { Save, RotateCw, Check, Sparkles, Clock, Zap, ShoppingCart, ChefHat } from 'lucide-react';

interface FoodResultProps {
  recipe: FoodResponse;
  onSave: () => void;
  onGenerateAnother: () => void;
}

export function FoodResult({ recipe, onSave, onGenerateAnother }: FoodResultProps) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave();
    setSaved(true);
  };

  const handleAddToCart = (ingredient: string) => {
    console.log('Добавлено в корзину:', ingredient);
    // Здесь будет логика добавления в корзину
  };

  const handleAddAllToCart = () => {
    recipe.recipe.ingredients.toBuy.forEach(item => {
      handleAddToCart(item.name);
    });
  };

  return (
    <div className="
      bg-gradient-to-br from-primary/10 to-secondary/10
      rounded-xl md:rounded-2xl 
      shadow-2xl
      p-4 md:p-6 
      mb-6 md:mb-8 
      border-2 border-primary/30
      mt-6 md:mt-8
      relative
      overflow-hidden
    ">
      {/* Декоративные элементы */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full -translate-y-12 translate-x-12" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-secondary/10 rounded-full translate-y-10 -translate-x-10" />
      
      <div className="relative z-10">
        {/* Заголовок результата */}
        <div className="text-center mb-4 md:mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Sparkles size={20} className="text-primary" />
            <h2 className="text-lg md:text-xl lg:text-2xl font-accent font-bold text-foreground">
              Ваш идеальный рецепт!
            </h2>
            <Sparkles size={20} className="text-secondary" />
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">
            Мы подобрали рецепт специально для вас
          </p>
        </div>

        {/* Карточка рецепта */}
        <div className="
          bg-card
          rounded-lg md:rounded-xl 
          p-4 md:p-6 
          mb-4 md:mb-6 
          border-2 border-primary/20
          shadow-lg
          relative
          overflow-hidden
        ">
          {/* Акцентная полоска */}
          <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
          
          {/* Заголовок рецепта и мета-информация */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 md:mb-4 gap-2">
            <div className="flex items-start space-x-2">
              <ChefHat size={18} className="md:size-5 flex-shrink-0 text-primary mt-1" />
              <div>
                <h3 className="text-base md:text-lg lg:text-xl font-bold text-card-foreground mb-1">
                  {recipe.recipe.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center space-x-1 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium shadow-md">
                    <Clock size={12} />
                    <span>{recipe.recipe.cookingTime}</span>
                  </span>
                  <span className="inline-flex items-center space-x-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs font-medium shadow-md">
                    <Zap size={12} />
                    <span>{recipe.recipe.difficulty}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Описание */}
          <p className="text-sm md:text-base text-card-foreground mb-3 md:mb-4 leading-relaxed">
            {recipe.recipe.description}
          </p>

          {/* Ингредиенты */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
            {/* Что есть */}
            <div>
              <h4 className="font-semibold text-green-600 mb-2 md:mb-3 text-sm md:text-base flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>✅ Что у вас есть</span>
              </h4>
              <ul className="space-y-1 md:space-y-2">
                {recipe.recipe.ingredients.available.map((ingredient, index) => (
                  <li key={index} className="text-xs md:text-sm text-card-foreground flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="first-letter:uppercase">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Что купить */}
            <div>
              <h4 className="font-semibold text-blue-600 mb-2 md:mb-3 text-sm md:text-base flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>🛒 Что нужно купить</span>
              </h4>
              <ul className="space-y-1 md:space-y-2">
                {recipe.recipe.ingredients.toBuy.map((item, index) => (
                  <li key={index} className="text-xs md:text-sm text-card-foreground flex items-center justify-between group">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <span className="first-letter:uppercase">
                        {item.name}
                        {item.quantity && <span className="text-muted-foreground ml-1">({item.quantity})</span>}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(item.name)}
                      className="
                        opacity-0 group-hover:opacity-100
                        p-1 
                        bg-blue-500 text-white 
                        rounded 
                        hover:bg-blue-600
                        transition-all
                        flex-shrink-0
                      "
                    >
                      <ShoppingCart size={12} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Шаги приготовления */}
          <div className="mb-4 md:mb-6">
            <h4 className="font-semibold text-card-foreground mb-2 md:mb-3 text-sm md:text-base flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>📝 Способ приготовления</span>
            </h4>
            <div className="space-y-2 md:space-y-3">
              {recipe.recipe.steps.map((step, index) => (
                <div key={index} className="flex space-x-3 md:space-x-4">
                  <div className="
                    flex-shrink-0 
                    w-6 h-6 md:w-7 md:h-7
                    bg-primary text-primary-foreground 
                    rounded-full 
                    flex items-center justify-center 
                    font-bold 
                    text-xs md:text-sm
                    shadow-md
                  ">
                    {index + 1}
                  </div>
                  <p className="text-xs md:text-sm text-card-foreground pt-0.5 flex-1 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Пищевая ценность */}
          {recipe.recipe.nutritionInfo && (
            <div className="
              bg-accent
              rounded-lg 
              p-3 md:p-4 
              border border-border
              mb-4 md:mb-6
            ">
              <h4 className="font-semibold text-accent-foreground mb-2 md:mb-3 text-sm md:text-base flex items-center space-x-2">
                <span className="w-2 h-2 bg-secondary rounded-full"></span>
                <span>🥗 Пищевая ценность</span>
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                {recipe.recipe.nutritionInfo.calories && (
                  <div className="text-center p-2 bg-card rounded-lg border border-border">
                    <div className="font-bold text-accent-foreground text-sm">{recipe.recipe.nutritionInfo.calories}</div>
                    <div className="text-xs text-muted-foreground">Калории</div>
                  </div>
                )}
                {recipe.recipe.nutritionInfo.protein && (
                  <div className="text-center p-2 bg-card rounded-lg border border-border">
                    <div className="font-bold text-accent-foreground text-sm">{recipe.recipe.nutritionInfo.protein}</div>
                    <div className="text-xs text-muted-foreground">Белки</div>
                  </div>
                )}
                {recipe.recipe.nutritionInfo.carbs && (
                  <div className="text-center p-2 bg-card rounded-lg border border-border">
                    <div className="font-bold text-accent-foreground text-sm">{recipe.recipe.nutritionInfo.carbs}</div>
                    <div className="text-xs text-muted-foreground">Углеводы</div>
                  </div>
                )}
                {recipe.recipe.nutritionInfo.fats && (
                  <div className="text-center p-2 bg-card rounded-lg border border-border">
                    <div className="font-bold text-accent-foreground text-sm">{recipe.recipe.nutritionInfo.fats}</div>
                    <div className="text-xs text-muted-foreground">Жиры</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Советы */}
          {recipe.recipe.tips && recipe.recipe.tips.length > 0 && (
            <div className="
              bg-blue-50 border border-blue-200 
              rounded-lg p-3 md:p-4
            ">
              <h4 className="font-semibold text-blue-800 mb-1 md:mb-2 text-sm md:text-base flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>💡 Советы</span>
              </h4>
              <ul className="space-y-1 text-blue-700">
                {recipe.recipe.tips.map((tip, index) => (
                  <li key={index} className="text-xs md:text-sm">• {tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Кнопки действий */}
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center">
          <button
            onClick={handleSave}
            disabled={saved}
            className={`
              px-3 py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 
              rounded-lg md:rounded-xl 
              font-semibold 
              transition-all 
              flex items-center justify-center space-x-2
              text-xs md:text-sm lg:text-base
              flex-1 sm:flex-none
              shadow-lg
              ${saved
                ? 'bg-green-500 text-white cursor-not-allowed'
                : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105'
              }
            `}
          >
            {saved ? <Check size={14} className="md:size-4" /> : <Save size={14} className="md:size-4" />}
            <span className="truncate">{saved ? 'Сохранено!' : 'Сохранить рецепт'}</span>
          </button>

          <button
            onClick={onGenerateAnother}
            className="
              px-3 py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 
              rounded-lg md:rounded-xl 
              font-semibold 
              bg-secondary 
              hover:bg-secondary/90 
              text-secondary-foreground
              transition-all 
              shadow-lg hover:shadow-xl 
              hover:scale-105
              flex items-center justify-center space-x-2
              text-xs md:text-sm lg:text-base
              flex-1 sm:flex-none
            "
          >
            <RotateCw size={14} className="md:size-4" />
            <span>Другой вариант</span>
          </button>

          {recipe.recipe.ingredients.toBuy.length > 0 && (
            <button
              onClick={handleAddAllToCart}
              className="
                px-3 py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 
                rounded-lg md:rounded-xl 
                font-semibold 
                bg-green-500 
                hover:bg-green-600 
                text-white
                transition-all 
                shadow-lg hover:shadow-xl 
                hover:scale-105
                flex items-center justify-center space-x-2
                text-xs md:text-sm lg:text-base
                flex-1 sm:flex-none
              "
            >
              <ShoppingCart size={14} className="md:size-4" />
              <span>Добавить все в корзину</span>
            </button>
          )}
        </div>

        {/* Интеграция с маркетплейсами */}
        <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border">
          <h4 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base flex items-center space-x-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            <span>Где купить продукты:</span>
          </h4>
          <div className="flex flex-wrap gap-1 md:gap-2">
            {['СберМаркет', 'Ozon', 'Яндекс.Лавка', 'ВкусВилл'].map(market => (
              <button
                key={market}
                className="
                  px-2 py-1 md:px-3 md:py-2 
                  rounded-lg 
                  bg-card
                  border border-border
                  hover:border-primary 
                  hover:bg-accent
                  transition-all 
                  text-xs md:text-sm
                  flex-shrink-0
                  shadow-sm
                  hover:shadow-md
                  hover:scale-105
                "
              >
                {market}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}