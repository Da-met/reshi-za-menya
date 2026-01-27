'use client';

import { useState } from 'react';
import { ArrowLeft, Heart, Share2, ShoppingCart, Star, MessageCircle, Edit3, Trash2, Clock, CheckCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { SavedGift } from '@/types/gifts';
import { OptionTag } from '@/components/gifts/OptionTag';
import Image from 'next/image';

// Заглушка данных с НОВОЙ структурой
const mockGiftData: SavedGift = {
  id: '1',
  giftData: {
    id: 'gift-1',
    title: 'Apple Watch Series 9',
    description: 'Умные часы с расширенными функциями здоровья, отслеживанием сна и фитнес-трекингом. Идеальный подарок для активных людей, которые следят за своим здоровьем и ведут современный образ жизни.',
    type: 'thing',
    price: '45 990 ₽',
    image: 'https://static.re-store.ru/upload/static/re/blog/iphone-15-apple-watch-series-9-ultra-2-review-2023/5.jpg',
    brand: 'Apple',
    category: 'Электроника',
    features: [
      'Отслеживание сна и активности',
      'Фитнес-трекинг с GPS',
      'Водонепроницаемость 50м',
      'ЭКГ и измерение кислорода в крови',
      'Умные уведомления',
      'До 18 часов работы'
    ],
    reasons: [
      'Практичный и современный гаджет',
      'Подходит для здоровья и спорта',
      'Стильный аксессуар для повседневной носки',
      'Высокое качество и надежность бренда'
    ],
    purchaseLink: 'https://www.apple.com/ru/watch/',
    tags: ['технологии', 'здоровье', 'премиум', 'гаджеты'],
    reasoning: 'Идеально подходит для активного человека, который следит за здоровьем и ведет современный образ жизни. Часы помогут отслеживать активность, сон и общее состояние организма.'
  },
  requestData: {
    recipient_type: 'mother',
    gift_occasion: 'День рождения',
    interests_hobbies: ['спорт', 'технологии', 'здоровье'],
    profession: ['IT-специалист'],
    budget: '10000-15000',
    age: 'adult',
    gender: 'female'
  },
  createdAt: new Date('2024-01-15'),
  userComment: 'Идеально для мамы - она давно хотела умные часы для прогулок'
};

export default function GiftDetailPage({ }: { params: Promise<{ id: string }> }) {
  const [gift, setGift] = useState<SavedGift>(mockGiftData);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [commentText, setCommentText] = useState(gift.userComment || '');
  const [imageError, setImageError] = useState(false);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'thing': return 'Вещь';
      case 'experience': return 'Впечатление';
      case 'handmade': return 'Хендмейд';
      default: return type;
    }
  };

  function getCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
      mother: 'Маме',
      father: 'Папе',
      girlfriend: 'Девушке',
      boyfriend: 'Парню',
      friend: 'Другу',
      friend_female: 'Подруге',
      child: 'Ребёнку',
      colleague: 'Коллеге'
    };
    return labels[category] || category;
  }

  function getAgeLabel(age: string): string {
    const labels: Record<string, string> = {
      child: 'Ребёнок',
      teen: 'Подросток',
      adult: 'Взрослый'
    };
    return labels[age] || age;
  }

  // Функции для работы с комментарием
  const handleAddComment = () => {
    setIsEditingComment(true);
    setCommentText(gift.userComment || '');
  };

  const handleEditComment = () => {
    setIsEditingComment(true);
    setCommentText(gift.userComment || '');
  };

  const handleSaveComment = () => {
    setGift(prev => ({
      ...prev,
      userComment: commentText.trim()
    }));
    setIsEditingComment(false);
    console.log('Сохранение комментария:', commentText);
  };

  const handleCancelComment = () => {
    setIsEditingComment(false);
    setCommentText(gift.userComment || '');
  };

  const handleDeleteComment = () => {
    setGift(prev => ({
      ...prev,
      userComment: undefined
    }));
    setCommentText('');
    setIsEditingComment(false);
    console.log('Удаление комментария');
  };

  // Используем новые поля или старые для совместимости
  const displayPrice = gift.giftData.price || gift.giftData.price_range;
  const displayFeatures = gift.giftData.features || gift.giftData.examples || [];

  // Fallback для изображения
  const imageSrc = imageError || !gift.giftData.image 
    ? `/images/fallbacks/${gift.giftData.category || 'default'}.jpg`
    : gift.giftData.image;

  return (
    <div className="min-h-screen bg-background py-6 md:py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Навигация */}
        <div className="mb-6 md:mb-8">
          <Link 
            href="/gifts?view=saved"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Назад к моим подаркам
          </Link>
        </div>

        <div className="space-y-8">
          {/* Блок с деталями подарка */}
          <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
            {/* Верхняя часть с изображением и основной информацией */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8">
              {/* Изображение */}
              <div className="rounded-xl overflow-hidden bg-muted/20">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={imageSrc}
                    alt={gift.giftData.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={() => setImageError(true)}
                  />
                </div>
              </div>

              {/* Информация */}
              <div className="space-y-6">
                {/* Заголовок и категория */}
                <div>
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {getTypeLabel(gift.giftData.type)}
                    </span>
                    {gift.giftData.brand && (
                      <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        {gift.giftData.brand}
                      </span>
                    )}
                    {gift.giftData.category && (
                      <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        {gift.giftData.category}
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl text-foreground mb-4">
                    {gift.giftData.title}
                  </h2>
                </div>

                {/* Цена и кнопки */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold text-primary">{displayPrice}</span>
                  </div>

                  {/* Основные кнопки действий */}
                  <div className="space-y-3">
                    <a
                      href={gift.giftData.purchaseLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors text-lg"
                    >
                      <ShoppingCart size={24} />
                      <span>Купить на маркетплейсе</span>
                    </a>

                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors">
                        <Heart size={20} />
                        <span>В избранное</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors">
                        <Share2 size={20} />
                        <span>Поделиться</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Описание */}
            <div className="border-t border-border p-6 md:p-8">
              <div className="space-y-4">
                <h3 className="text-xl text-foreground">Описание</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {gift.giftData.description}
                </p>
              </div>
            </div>

            {/* Особенности и причины */}
            <div className="border-t border-border">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
                {/* Особенности */}
                <div className="space-y-4">
                  <h3 className="text-xl font text-foreground">Особенности</h3>
                  <div className="space-y-3">
                    {displayFeatures.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Почему хороший подарок */}
                {gift.giftData.reasons && gift.giftData.reasons.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xl text-foreground">Почему это хороший подарок</h3>
                    <div className="space-y-3">
                      {gift.giftData.reasons.map((reason: string, index: number) => (
                        <div key={index} className="flex items-center gap-3">
                          <Star size={18} className="text-yellow-500 flex-shrink-0" />
                          <span className="text-muted-foreground">{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Почему подходит по критериям */}
            {gift.giftData.reasoning && (
              <div className="border-t border-border p-6 md:p-8 bg-primary/5">
                <div className="space-y-4">
                  <h3 className="text-xl text-foreground flex items-center gap-2">
                    <Sparkles size={20} className="text-primary" />
                    Почему подходит именно вам
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {gift.giftData.reasoning}
                  </p>
                </div>
              </div>
            )}

            {/* Теги */}
            {gift.giftData.tags && gift.giftData.tags.length > 0 && (
              <div className="border-t border-border p-6 md:p-8">
                <div className="flex flex-wrap gap-2">
                  {gift.giftData.tags.map((tag: string, index: number) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-secondary text-primary text-sm rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Блок с деталями запроса */}
          <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl text-foreground mb-4">Детали запроса</h2>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {/* Категория */}
              {gift.requestData.recipient_type && (
                <OptionTag
                  type="category"
                  label={getCategoryLabel(gift.requestData.recipient_type)}
                  value={gift.requestData.recipient_type}
                />
              )}
              
              {/* Повод */}
              {gift.requestData.gift_occasion && (
                <OptionTag
                  type="occasion"
                  label={gift.requestData.gift_occasion}
                  value={gift.requestData.gift_occasion}
                />
              )}
              
              {/* Профессии */}
              {gift.requestData.profession?.map(prof => (
                <OptionTag
                  key={prof}
                  type="profession"
                  label={prof}
                  value={prof}
                />
              ))}
              
              {/* Интересы */}
              {gift.requestData.interests_hobbies?.map(interest => (
                <OptionTag
                  key={interest}
                  type="interest"
                  label={interest}
                  value={interest}
                />
              ))}
              
              {/* Бюджет */}
              {gift.requestData.budget && (
                <OptionTag
                  type="budget"
                  label={gift.requestData.budget}
                  value={gift.requestData.budget}
                />
              )}
              
              {/* Возраст */}
              {gift.requestData.age && (
                <OptionTag
                  type="age"
                  label={getAgeLabel(gift.requestData.age)}
                  value={gift.requestData.age}
                />
              )}
              
              {/* Пол */}
              {gift.requestData.gender && gift.requestData.gender !== 'any' && (
                <OptionTag
                  type="personality"
                  label={gift.requestData.gender === 'male' ? 'Мужской' : 'Женский'}
                  value={gift.requestData.gender}
                />
              )}
            </div>

            {/* Дата сохранения */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t border-border">
                <Clock size={14} />
                <span>Сохранено {gift.createdAt.toLocaleDateString('ru-RU')}</span>
            </div>
          </div>

          {/* Блок комментария */}
          <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl text-foreground">Моя заметка</h2>
              {!isEditingComment && gift.userComment && (
                <button
                  onClick={handleEditComment}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors flex-shrink-0"
                  title="Редактировать комментарий"
                >
                  <Edit3 size={18} />
                </button>
              )}
            </div>

            {isEditingComment ? (
              // Режим редактирования
              <div className="space-y-3">
                <textarea
                  value={commentText}
                  onChange={(e) => {
                    setCommentText(e.target.value);
                    // Автоматическая высота
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                  placeholder="Напишите ваши мысли о подарке, почему выбрали именно его или для кого он подойдет..."
                  className="w-full p-3 text-sm border border-border rounded-lg focus:outline-primary focus:ring-1 focus:ring-primary/50 bg-background min-h-[80px]"
                  style={{ resize: 'none', overflow: 'hidden' }}
                  rows={2}
                  autoFocus
                />
                <div className="flex justify-between items-center gap-2">
                  <button
                    onClick={handleDeleteComment}
                    className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                    title="Удалить комментарий"
                  >
                    <Trash2 size={18} />
                    <span className="hidden xs:inline text-sm">Удалить</span>
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancelComment}
                      className="px-3 py-1 text-sm border border-border rounded-lg hover:bg-accent transition-colors"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={handleSaveComment}
                      disabled={!commentText.trim()}
                      className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Сохранить
                    </button>
                  </div>
                </div>
              </div>
            ) : gift.userComment ? (
              // Просмотр комментария
              <div className="p-3 bg-primary/20 border border-primary/30 rounded-lg">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap text-sm">
                  {gift.userComment}
                </p>
              </div>
            ) : (
              // Кнопка добавления комментария
              <button
                onClick={handleAddComment}
                className="w-full p-4 border-2 border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-accent/10 transition-all duration-200 group"
              >
                <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground group-hover:text-foreground">
                  <MessageCircle size={24} />
                  <div className="text-center">
                    <p className="font-medium text-base mb-1">Добавьте свою заметку</p>
                    <p className="text-sm text-muted-foreground/80">
                      Поделитесь мыслями о подарке<br />
                      или почему выбрали именно его
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