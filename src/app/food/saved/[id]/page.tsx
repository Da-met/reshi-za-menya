'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Edit3, Trash2, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { FoodRecipeCard } from '@/components/food/FoodRecipeCard';

import { SavedRecipe } from '@/types/food';
import { FoodRequestDetails } from '@/components/food/FoodRequestDetails';


// Заглушка данных
const mockRecipeData: SavedRecipe = {
  recipe: {
    id: '1',
    title: 'Курица с рисом и овощами в сливочном соусе',
    description: 'Ароматное и сытное блюдо с нежным сливочным вкусом, идеально подходит для семейного ужина',
    imageUrl: '/images/food/chicken-rice.png',
    ingredients: {
      available: [
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
    difficulty: 'easy',
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
    ],
    cuisine: 'russian',
    dishType: 'dinner',
    servings: '4 порции'
  },

  generationId: 'gen-1',
  savedAt: new Date('2024-01-15'),
  note: 'Очень понравилось детям! Можно добавить больше овощей в следующий раз.',
  requestData: {  // 👈 добавить
    mode: 'products',
    products: ['курица', 'рис', 'овощи'],
    excludeIngredients: ['грибы'],
    filters: {
      dishType: 'dinner',
      cookingTime: '<60',
      difficulty: 'easy'
    }
  }

};

export default function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [recipe, setRecipe] = useState<SavedRecipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    const loadRecipe = async () => {
      const { id } = await params;
      console.log('Загрузка рецепта с id:', id);
      
      setRecipe(mockRecipeData);
      setNoteText(mockRecipeData.note || '');
      setIsLoading(false);
    };

    loadRecipe();
  }, [params]);

  const handleSaveNote = () => {
    if (!recipe) return;
    setRecipe(prev => ({
      ...prev!,
      note: noteText.trim()
    }));
    setIsEditingNote(false);
  };

  const handleDeleteNote = () => {
    if (!recipe) return;
    setRecipe(prev => ({
      ...prev!,
      note: undefined
    }));
    setNoteText('');
    setIsEditingNote(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-6 md:py-8">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="animate-pulse">
            <div className="h-4 bg-muted rounded w-24 mb-8" />
            <div className="space-y-8">
              <div className="bg-card rounded-2xl h-96" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background py-6 md:py-8">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center py-16">
            <h2 className="text-2xl text-foreground mb-4">Рецепт не найден</h2>
            <Link href="/food?view=saved" className="text-primary hover:underline">
              Вернуться к сохраненным рецептам
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          {/* Карточка рецепта - убрали showActions и onAddToCart */}
          <FoodRecipeCard
            recipe={recipe.recipe}
            // showActions={false} - убрали совсем
            // showPurchase={false} - убрали совсем
          />

          {/* Блок с деталями запроса - как в skincare */}
          <FoodRequestDetails
            request={recipe.requestData}
            savedAt={recipe.savedAt}
          />

          {/* Блок заметки - как в skincare */}
          <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg md:text-xl text-foreground">Моя заметка</h2>
              {!isEditingNote && recipe.note && (
                <button
                  onClick={() => setIsEditingNote(true)}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                >
                  <Edit3 size={18} />
                </button>
              )}
            </div>

            {isEditingNote ? (
              <div className="space-y-3">
                <textarea
                  value={noteText}
                  onChange={(e) => {
                    setNoteText(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                  placeholder="Напишите ваши мысли о рецепте, почему подошел или не подошел..."
                  className="w-full p-3 text-sm border border-border rounded-lg focus:outline-primary bg-background min-h-[80px]"
                  style={{ resize: 'none', overflow: 'hidden' }}
                  rows={2}
                  autoFocus
                />
                <div className="flex justify-between items-center gap-2">
                  <button
                    onClick={handleDeleteNote}
                    className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                    <span className="text-sm">Удалить</span>
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setIsEditingNote(false);
                        setNoteText(recipe.note || '');
                      }}
                      className="px-3 py-1 text-sm border border-border rounded-lg hover:bg-accent transition-colors"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={handleSaveNote}
                      disabled={!noteText.trim()}
                      className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
                    >
                      Сохранить
                    </button>
                  </div>
                </div>
              </div>
            ) : recipe.note ? (
              <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap text-sm">
                  {recipe.note}
                </p>
              </div>
            ) : (
              <button
                onClick={() => setIsEditingNote(true)}
                className="w-full p-4 border-2 border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-accent/10 transition-all group"
              >
                <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground group-hover:text-foreground">
                  <MessageCircle size={24} />
                  <div className="text-center">
                    <p className="font-medium text-base mb-1">Добавьте свою заметку</p>
                    <p className="text-sm text-muted-foreground/80">
                      Поделитесь мыслями о рецепте<br />
                      или почему подошел/не подошел
                    </p>
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}