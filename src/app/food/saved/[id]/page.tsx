'use client';

import { useState } from 'react';
import { ArrowLeft, Clock, Circle, Zap, Heart, Share2, ShoppingCart, MessageCircle, Edit3, Trash2, Eye, EyeOff, Utensils, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { SavedRecipe } from '@/types/food';

// Заглушка данных
const mockRecipeData: SavedRecipe = {
    recipe: {
      id: '1',
      title: 'Курица с рисом и овощами в сливочном соусе',
      description: 'Ароматное и сытное блюдо с нежным сливочным вкусом, идеально подходит для семейного ужина',
      imageUrl: '/images/food/chicken-rice.png',
      ingredients: {
        available: [  // ← Теперь массив объектов, а не строк
          { name: 'куриное филе', quantity: '400 г' },
          { name: 'лук репчатый', quantity: '1 шт' },
          { name: 'чеснок', quantity: '3 зубчика' },
          { name: 'оливковое масло', quantity: '2 ст.л.' },
          { name: 'соль', quantity: 'по вкусу' },
          { name: 'перец', quantity: 'по вкусу' }
        ],
        toBuy: [
          { name: 'рис басмати', quantity: '200 г', category: 'крупы' },
          { name: 'сливки 20%', quantity: '200 мл', category: 'молочные' },
          { name: 'брокколи', quantity: '1 головка', category: 'овощи' },
          { name: 'сыр пармезан', quantity: '50 г', category: 'сыры' },
          { name: 'специи для курицы', quantity: '1 ч.л.', category: 'специи' }
        ]
      },
      steps: [
        'Куриное филе нарезать кубиками, обжарить на оливковом масле до золотистой корочки',
        'Лук и чеснок мелко нарезать, добавить к курице и пассеровать 3 минуты',
        'Рис промыть, добавить к курице и луку, залить сливками и 200 мл воды',
        'Довести до кипения, добавить соцветия брокколи, тушить под крышкой 15 минут',
        'Посыпать тертым пармезаном и подавать горячим'
      ],
      cookingTime: '35 минут',
      difficulty: 'Легко',
      nutritionInfo: {
        calories: '420 ккал',
        protein: '35 г',
        carbs: '45 г',
        fats: '12 г'
      },
      tips: [
        'Для более насыщенного вкуса можно добавить грибы',
        'Сливки можно заменить сметаной, разведенной водой',
        'Перед подачей дайте блюду настояться 5-10 минут'
      ]
    },
    generationId: 'gen-1',
    savedAt: new Date('2024-01-15'),
    note: 'Очень понравилось детям! Можно добавить больше овощей в следующий раз.'
  };

// Тип для ингредиента
interface IngredientItem {
  name: string;
  quantity?: string;
  category?: string;
}

export default function RecipeDetailPage({ }: { params: Promise<{ id: string }> }) {
  const [recipe, setRecipe] = useState<SavedRecipe>(mockRecipeData);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteText, setNoteText] = useState(recipe.note || '');
  const [cooked, setCooked] = useState(false);
  const [cookDate, setCookDate] = useState<Date | null>(null);
  
  // Состояния для ингредиентов
  const [availableIngredients, setAvailableIngredients] = useState<IngredientItem[]>(
    [...recipe.recipe.ingredients.available]
  );
  const [toBuyIngredients, setToBuyIngredients] = useState<IngredientItem[]>(
    [...recipe.recipe.ingredients.toBuy]
  );

  // Перемещение из "Нужно купить" в "У вас есть"
  const handleMoveToAvailable = (ingredientIndex: number) => {
    const ingredient = toBuyIngredients[ingredientIndex];
    const newToBuy = toBuyIngredients.filter((_, index) => index !== ingredientIndex);
    setToBuyIngredients(newToBuy);
    setAvailableIngredients(prev => [...prev, ingredient]);
    console.log('Перемещен в доступные:', ingredient.name);
  };

  // Перемещение из "У вас есть" в "Нужно купить"
  const handleMoveToBuy = (ingredientIndex: number) => {
    const ingredient = availableIngredients[ingredientIndex];
    const newAvailable = availableIngredients.filter((_, index) => index !== ingredientIndex);
    setAvailableIngredients(newAvailable);
    setToBuyIngredients(prev => [...prev, ingredient]);
    console.log('Перемещен в список покупок:', ingredient.name);
  };

  // Функции для работы с заметкой
  const handleAddNote = () => {
    setIsEditingNote(true);
    setNoteText(recipe.note || '');
  };

  const handleEditNote = () => {
    setIsEditingNote(true);
    setNoteText(recipe.note || '');
  };

  const handleSaveNote = () => {
    setRecipe(prev => ({
      ...prev,
      note: noteText.trim()
    }));
    setIsEditingNote(false);
  };

  const handleCancelNote = () => {
    setIsEditingNote(false);
    setNoteText(recipe.note || '');
  };

  const handleDeleteNote = () => {
    setRecipe(prev => ({
      ...prev,
      note: undefined
    }));
    setNoteText('');
    setIsEditingNote(false);
  };

  const handleToggleCooked = () => {
    setCooked(!cooked);
    if (!cooked) {
      setCookDate(new Date());
    } else {
      setCookDate(null);
    }
  };

  return (
    <div className="min-h-screen bg-background py-6 md:py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Навигация */}
        <div className="mb-6 md:mb-8">
          <Link
            href="/food?view=saved"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Назад к моим рецептам
          </Link>
        </div>

        <div className="space-y-8">
          {/* Основной блок с рецептом */}
          <div className="bg-card rounded-2xl shadow-lg p-4 md:p-8">
            
            {/* Заголовок и кнопки */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0 mr-4">
                <h1 className="text-2xl md:text-3xl text-foreground mb-3">
                  {recipe.recipe.title}
                </h1>
                <p className="text-muted-foreground text-sm md:text-base">
                  {recipe.recipe.description}
                </p>
              </div>
              
              {/* Кнопки действий */}
              <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                <button
                  onClick={handleToggleCooked}
                  className={`p-1 sm:p-2 rounded-lg transition-colors ${
                    cooked
                      ? 'bg-green-100 text-green-600 hover:bg-green-200'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                >
                  {cooked ? <Eye size={18} className="sm:size-5" /> : <EyeOff size={18} className="sm:size-5" />}
                </button>
                <button className="p-1 sm:p-2 bg-muted rounded-lg hover:bg-accent transition-colors">
                  <Heart size={18} className="sm:size-5" />
                </button>
                <button className="p-1 sm:p-2 bg-muted rounded-lg hover:bg-accent transition-colors">
                  <Share2 size={18} className="sm:size-5" />
                </button>
              </div>
            </div>

            {/* Чипы */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">
                <Utensils size={12} className="sm:size-[14px] mr-1" />
                Основное блюдо
              </span>
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm">
                <Clock size={12} className="sm:size-[14px] mr-1" />
                {recipe.recipe.cookingTime}
              </span>
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm">
                <Zap size={12} className="sm:size-[14px] mr-1" />
                {recipe.recipe.difficulty}
              </span>
            </div>

            {/* Изображение */}
            <div className="mb-6">
              {recipe.recipe.imageUrl ? (
                <div className="w-full relative rounded-xl overflow-hidden shadow-lg">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={recipe.recipe.imageUrl}
                      alt={recipe.recipe.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full aspect-[4/3] bg-muted rounded-xl flex items-center justify-center shadow-lg">
                  <Utensils size={48} className="text-muted-foreground/50" />
                </div>
              )}
            </div>

            {/* Блок ингредиентов - ВО ВСЮ ШИРИНУ, ДВЕ КОЛОНКИ С НАШИМИ ЦВЕТАМИ */}
            <div className="mb-6">
            <h2 className="text-xl text-foreground mb-4">Ингредиенты</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* У вас есть */}
                <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg text-saved-examples-text">У вас есть</h3>
                    <span className="text-sm text-saved-examples-text font-bold px-2 py-1 rounded">
                    {availableIngredients.length} шт
                    </span>
                </div>
                
                <div className="space-y-2">
                    {availableIngredients.map((ingredient, index) => (
                    <div 
                        key={index}
                        className="flex items-center justify-between p-3 border border-primary/50 rounded-lg group hover:shadow-sm transition-all"
                    >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                        <CheckCircle size={16} className="text-saved-examples-text flex-shrink-0" />
                        <div className="min-w-0">
                            <span className="text-foreground font-bold block truncate">{ingredient.name}</span>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                <span>{ingredient.quantity}</span>
                            </div>
                        </div>
                        </div>
                        
                        <button
                            onClick={() => handleMoveToBuy(index)}
                            className="px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-accent rounded border border-border transition-all flex-shrink-0 ml-2"
                            title="Переместить в список покупок"
                        >
                        В покупки
                        </button>
                    </div>
                    ))}
                </div>
                </div>

                {/* Нужно купить */}
                <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg text-saved-examples-text">Нужно купить</h3>
                    <span className="text-sm text-saved-examples-text font-bold px-2 py-1 rounded">
                    {toBuyIngredients.length} шт
                    </span>
                </div>
                
                <div className="space-y-2">
                    {toBuyIngredients.map((ingredient, index) => (
                    <div 
                        key={index}
                        className="flex items-center justify-between p-3 border border-primary/50 rounded-lg group hover:shadow-sm transition-all"
                    >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Circle size={16} className="text-saved-examples-text flex-shrink-0" />
                        <div className="min-w-0">
                            <span className="text-foreground font-bold block truncate">{ingredient.name}</span>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                <span>{ingredient.quantity}</span>
                            </div>
                        </div>
                        </div>
                        
                        <button
                            onClick={() => handleMoveToAvailable(index)}
                            className="px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-accent rounded border border-border transition-all flex-shrink-0 ml-2"
                            title="Уже есть, переместить в доступные"
                        >
                        Уже есть
                        </button>
                    </div>
                    ))}
                </div>
                </div>
            </div>
            </div>

            {/* Кнопка "Купить ингредиенты" */}
            <div className="mb-6 p-4 bg-gradient-to-r from-primary/20 to-primary/30 rounded-xl border border-primary/20">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-sm text-muted-foreground">Все ингредиенты в одном заказе</p>
                  <p className="text-2xl font-bold text-primary">СберМаркет, Яндекс.Лавка</p>
                </div>
                <button className="
                  flex items-center justify-center gap-2
                  px-4 py-3 sm:py-2
                  bg-primary text-primary-foreground
                  rounded-lg
                  font-medium
                  hover:bg-primary/90
                  transition-colors
                  w-full sm:w-auto
                ">
                  <ShoppingCart size={20} />
                  <span>Купить ингредиенты</span>
                </button>
              </div>
            </div>

            {/* Шаги приготовления */}
            <div className="mb-6">
              <h2 className="text-xl text-foreground mb-4">Шаги приготовления</h2>
              <div className="space-y-4">
                {recipe.recipe.steps.map((step, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-primary/15 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-muted-foreground leading-relaxed flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Советы */}
            {recipe.recipe.tips && recipe.recipe.tips.length > 0 && (
              <div className="mb-2">
                <h2 className="text-xl text-foreground mb-3">Полезные советы</h2>
                <ul className="space-y-2">
                  {recipe.recipe.tips.map((tip, index) => (
                    <li key={index} className="flex items-start text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Блок заметки */}
          <div className="bg-card rounded-2xl shadow-lg p-4 md:p-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-medium">Моя заметка</h2>
              {!isEditingNote && recipe.note && (
                <button
                  onClick={handleEditNote}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors flex-shrink-0"
                  title="Редактировать заметку"
                >
                  <Edit3 size={18} />
                </button>
              )}
            </div>

            {isEditingNote ? (
              // Режим редактирования
              <div className="space-y-3">
                <textarea
                  value={noteText}
                  onChange={(e) => {
                    setNoteText(e.target.value);
                    // Автоматическая высота
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                  placeholder="Добавьте свои заметки к рецепту: изменения в ингредиентах, особенности приготовления, впечатления..."
                  className="w-full p-3 text-sm border border-border rounded-lg focus:outline-primary focus:ring-1 focus:primary/50 bg-primary/30 min-h-[80px]"
                  style={{ resize: 'none', overflow: 'hidden' }}
                  rows={2}
                  autoFocus
                />
                <div className="flex justify-between items-center gap-2">
                  <button
                    onClick={handleDeleteNote}
                    className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                    title="Удалить заметку"
                  >
                    <Trash2 size={18} />
                    <span className="hidden xs:inline text-sm">Удалить</span>
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancelNote}
                      className="px-3 py-1 text-sm border border-border rounded-lg hover:bg-accent transition-colors"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={handleSaveNote}
                      disabled={!noteText.trim()}
                      className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Сохранить
                    </button>
                  </div>
                </div>
              </div>
            ) : recipe.note ? (
              // Просмотр заметки
              <div className="p-3 bg-primary/20 border border-primary/30 rounded-lg">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap text-sm">
                  {recipe.note}
                </p>
              </div>
            ) : (
              // Кнопка добавления заметки
              <button
                onClick={handleAddNote}
                className="w-full p-4 border-2 border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-accent/10 transition-all duration-200 group"
              >
                <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground group-hover:text-foreground">
                  <MessageCircle size={24} />
                  <div className="text-center">
                    <p className="font-medium text-base mb-1">Добавьте свою заметку</p>
                    <p className="text-sm text-muted-foreground/80">
                      Запишите изменения в рецепте, впечатления<br />
                      или советы для следующего приготовления
                    </p>
                  </div>
                </div>
              </button>
            )}
          </div>

          {/* Статус и дата */}
          <div className="bg-card rounded-2xl shadow-lg p-4 md:p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <button
                  onClick={handleToggleCooked}
                  className={`p-1 rounded transition-colors ${
                    cooked
                      ? 'text-green-600 hover:text-green-700'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cooked ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-foreground">
                  {cooked ? 'Приготовлено' : 'Еще не готовил(а)'}
                </span>
              </div>
              
              {cooked && cookDate && (
                <span className="text-xs text-muted-foreground">
                  {cookDate.toLocaleDateString('ru-RU')}
                </span>
              )}
            </div>

            {/* Дата сохранения */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t border-border mt-4">
              <Clock size={14} />
              <span>Сохранено {recipe.savedAt.toLocaleDateString('ru-RU')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}