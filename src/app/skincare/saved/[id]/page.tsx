// D:\МАЙО\JavaScript\ПРОЕКТЫ\РЕШИ ЗА МЕНЯ\reshi-za-menya\src\app\skincare\saved\[id]\page.tsx
'use client';

import { useState } from 'react';
import { ArrowLeft, Heart, Share2, ShoppingCart, Edit3, Trash2, 
  CheckCircle, Star, ExternalLink, Clock, Sparkles, Droplets, 
  AlertCircle, Filter, DollarSign, Cake, Sun, Tag } from 'lucide-react';
import Link from 'next/link';
import type { SavedSkincare } from '@/types/skincare';
import Image from 'next/image';

const mockSavedSkincare: SavedSkincare = {
  id: '1',
  productData: {
    id: 'product-1',
    name: 'Гиалуроновая сыворотка с витамином С',
    brand: 'La Roche-Posay',
    description: 'Интенсивное увлажнение и осветление кожи. Подходит для чувствительной кожи, нежирная текстура, быстро впитывается. Содержит гиалуроновую кислоту, витамин С и ниацинамид для комплексного ухода.',
    price: '2 890 ₽',
    price_range: '2000-3000₽',
    image: 'https://images.unsplash.com/photo-1556228578-9c360e1d8d34?w=400&h=400&fit=crop',
    recommended_product_type: 'Сыворотка',
    key_ingredients: ['Гиалуроновая кислота', 'Витамин C', 'Ниацинамид', 'Пептиды'],
    features: [
      'Интенсивное увлажнение 24 часа',
      'Осветление тона кожи',
      'Укрепление защитного барьера',
      'Нежирная текстура',
      'Быстро впитывается'
    ],
    reasons: [
      'Подходит для чувствительной кожи',
      'Не вызывает раздражения',
      'Подходит для ежедневного использования',
      'Эффективен против первых признаков старения'
    ],
    reasoning: 'Эта сыворотка идеально подходит для вашей комбинированной кожи, так как обеспечивает необходимое увлажнение без жирного блеска. Содержит витамин С для борьбы с тусклостью и гиалуроновую кислоту для интенсивного увлажнения.',
    purchaseLink: 'https://www.ozon.ru/product/larocheposay-serum/',
    where_to_buy: [
      { name: 'Wildberries', url: 'https://wildberries.ru/product1', price: '2 890 ₽' },
      { name: 'Ozon', url: 'https://ozon.ru/product1', price: '2 950 ₽' }
    ],
    tags: ['увлажнение', 'витамин C', 'сыворотка', 'для лица', 'anti-age'],
    rating: 4.8,
    size: '30 мл'
  },
  requestData: {
    skin_type: 'combination',
    concerns: ['dryness', 'dullness', 'pores'],
    desired_product_type: 'serum',
    budget: '2000-3000₽',
    age_group: 'young'
  },
  createdAt: new Date('2024-01-15'),
  userComment: 'Отлично подошло! Кожа стала заметно более увлажненной, пропало ощущение стянутости. После месяца использования улучшился цвет лица.'
};

const skinTypeLabels: Record<string, string> = {
  'normal': 'Нормальная',
  'dry': 'Сухая',
  'oily': 'Жирная',
  'combination': 'Комбинированная',
  'sensitive': 'Чувствительная',
  'mature': 'Зрелая',
  'acne-prone': 'Склонная к акне',
  'dehydrated': 'Обезвоженная'
};

const productTypeLabels: Record<string, string> = {
  'cleanser': 'Очищение',
  'toner': 'Тоник',
  'serum': 'Сыворотка',
  'moisturizer': 'Увлажнение',
  'eye-cream': 'Для глаз',
  'sunscreen': 'Солнцезащита',
  'mask': 'Маски',
  'exfoliator': 'Пилинг',
  'treatment': 'Лечение',
  'oil': 'Масло',
  'mist': 'Спрей',
  'set': 'Набор'
};

// Компонент OptionTag для skincare
function SkincareOptionTag({ label, type }: { label: string; type: 'skinType' | 'concern' | 'productType' | 'budget' | 'ageGroup' | 'spf' | 'brand' }) {
  const typeConfig = {
    skinType: {
      icon: Droplets,
      bgColor: 'bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    },
    concern: {
      icon: AlertCircle,
      bgColor: 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200'
    },
    productType: {
      icon: Filter,
      bgColor: 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200'
    },
    budget: {
      icon: DollarSign,
      bgColor: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    },
    ageGroup: {
      icon: Cake,
      bgColor: 'bg-purple-50 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    },
    spf: {
      icon: Sun,
      bgColor: 'bg-orange-50 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    },
    brand: {
      icon: Tag,
      bgColor: 'bg-cyan-50 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200'
    },
  };

  const { icon: Icon, bgColor } = typeConfig[type];

  return (
    <span className={`
      ${bgColor}
      px-3 py-1
      rounded-full
      text-xs md:text-sm
      font-medium
      flex items-center space-x-1.5
      flex-shrink-0
    `}>
      <Icon size={12} className="flex-shrink-0" />
      <span>{label}</span>
    </span>
  );
}

export default function SkincareDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [savedSkincare, setSavedSkincare] = useState<SavedSkincare>(mockSavedSkincare);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [commentText, setCommentText] = useState(savedSkincare.userComment || '');
  const [imageError, setImageError] = useState(false);
  console.log('Params:', params);
  const handleEditComment = () => {
    setIsEditingComment(true);
    setCommentText(savedSkincare.userComment || '');
  };

  const handleSaveComment = () => {
    setSavedSkincare(prev => ({
      ...prev,
      userComment: commentText.trim()
    }));
    setIsEditingComment(false);
  };

  const handleCancelComment = () => {
    setIsEditingComment(false);
    setCommentText(savedSkincare.userComment || '');
  };

  const handleDeleteComment = () => {
    setSavedSkincare(prev => ({
      ...prev,
      userComment: undefined
    }));
    setCommentText('');
    setIsEditingComment(false);
  };


  const imageSrc = imageError || !savedSkincare.productData.image
    ? `/images/fallbacks/${savedSkincare.productData.recommended_product_type || 'skincare'}.jpg`
    : savedSkincare.productData.image;

  return (
    <div className="min-h-screen bg-background py-6 md:py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Навигация */}
        <div className="mb-6 md:mb-8">
          <Link
            href="/skincare?view=saved"
            className="inline-flex items-center text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Назад к моим средствам
          </Link>
        </div>

        <div className="space-y-6 md:space-y-8">
          {/* Основной блок с деталями средства */}
          <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
            {/* Верхняя часть с изображением и основной информацией */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8">
              {/* Изображение */}
              <div className="rounded-xl overflow-hidden bg-muted/20">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={imageSrc}
                    alt={savedSkincare.productData.name}
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
                <div className="space-y-2">
                  {/* Бренд */}
                  {savedSkincare.productData.brand && (
                    <h2 className="text-2xl md:text-3xl font-bold text-section-development">
                      {savedSkincare.productData.brand}
                    </h2>
                  )}
                  
                  {/* Разделительная линия */}
                  <div className="h-px w-16 bg-border my-2"></div>
                  
                  {/* Название средства */}
                  <h3 className="text-xl md:text-2xl text-foreground mb-4">
                    {savedSkincare.productData.name}
                  </h3>
                  
                  {/* Тип продукта */}
                  {savedSkincare.productData.recommended_product_type && (
                    <div className="inline-flex items-center gap-2  mb-3 
                    px-3 py-1 border text-primary text-xs md:text-sm rounded-full font-medium
                    ">
                      {/* <span className="w-2 h-2 rounded-full bg-primary"></span> */}
                      {savedSkincare.productData.recommended_product_type}
                    </div>
                  )}
                </div>

                  {/* Рейтинг */}
                  {savedSkincare.productData.rating && (
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-primary">
                          {savedSkincare.productData.rating.toFixed(1)}
                        </div>
                        <div className="text-xs md:text-sm text-muted-foreground">из 5</div>
                      </div>
                      <div>
                        <p className="text-sm md:text-base text-muted-foreground">
                          {savedSkincare.productData.rating >= 4.5 ? 'Отличный рейтинг' :
                           savedSkincare.productData.rating >= 4.0 ? 'Хороший рейтинг' :
                           'Средний рейтинг'}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              className={`${i < Math.floor(savedSkincare.productData.rating || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Цена и кнопки */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl md:text-3xl font-bold text-primary">{savedSkincare.productData.price}</span>
                    {savedSkincare.productData.size && (
                      <span className="text-sm text-muted-foreground">{savedSkincare.productData.size}</span>
                    )}
                  </div>

                  {/* Основные кнопки действий */}
                  <div className="space-y-3">
                    {savedSkincare.productData.purchaseLink ? (
                      <a
                        href={savedSkincare.productData.purchaseLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 md:gap-3 w-full py-3 md:py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors text-base md:text-lg"
                      >
                        <ShoppingCart size={20} />
                        <span>Купить на маркетплейсе</span>
                        <ExternalLink size={16} />
                      </a>
                    ) : savedSkincare.productData.where_to_buy && savedSkincare.productData.where_to_buy.length > 0 ? (
                      <div className="space-y-2">
                        {savedSkincare.productData.where_to_buy.slice(0, 2).map((store, i) => (
                          <a
                            key={i}
                            href={store.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between w-full py-3 px-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
                          >
                            <span className="text-sm md:text-base">{store.name}</span>
                            <span className="font-bold text-sm md:text-base">{store.price}</span>
                          </a>
                        ))}
                      </div>
                    ) : null}

                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 py-2 md:py-3 text-sm md:text-base text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors">
                        <Heart size={16} />
                        <span>В избранное</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-2 md:py-3 text-sm md:text-base text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors">
                        <Share2 size={16} />
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
                <h3 className="text-lg md:text-xl text-foreground">Описание</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {savedSkincare.productData.description}
                </p>
              </div>
            </div>

            {/* Ключевые ингредиенты */}
            {savedSkincare.productData.key_ingredients && savedSkincare.productData.key_ingredients.length > 0 && (
              <div className="border-t border-border p-6 md:p-8">
                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl text-foreground">Ключевые ингредиенты</h3>
                  <div className="flex flex-wrap gap-2">
                    {savedSkincare.productData.key_ingredients.map((ingredient, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs md:text-sm"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Особенности */}
            {savedSkincare.productData.features && savedSkincare.productData.features.length > 0 && (
              <div className="border-t border-border p-6 md:p-8">
                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl text-foreground">Особенности</h3>
                  <div className="space-y-3">
                    {savedSkincare.productData.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                        <span className="text-sm md:text-base text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Почему хорошее средство */}
            {savedSkincare.productData.reasons && savedSkincare.productData.reasons.length > 0 && (
              <div className="border-t border-border p-6 md:p-8 bg-primary/5">
                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl text-foreground flex items-center gap-2">
                    <Star size={18} className="text-yellow-500" />
                    Почему это хорошее средство
                  </h3>
                  <div className="space-y-3">
                    {savedSkincare.productData.reasons.map((reason, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Sparkles size={16} className="text-primary flex-shrink-0" />
                        <span className="text-sm md:text-base text-muted-foreground">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Почему подходит */}
            {savedSkincare.productData.reasoning && (
              <div className="border-t border-border p-6 md:p-8 bg-accent/10">
                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl text-foreground">Почему подходит именно вам</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {savedSkincare.productData.reasoning}
                  </p>
                </div>
              </div>
            )}

            {/* Теги */}
            {savedSkincare.productData.tags && savedSkincare.productData.tags.length > 0 && (
              <div className="border-t border-border p-6 md:p-8">
                <div className="flex flex-wrap gap-2">
                  {savedSkincare.productData.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 border text-primary text-xs md:text-sm rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Блок с деталями запроса - ОТДЕЛЬНЫЙ КОМПОНЕНТ ВНИЗУ */}
          <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-lg md:text-xl text-foreground mb-4">Детали запроса</h2>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {/* Тип кожи */}
              {savedSkincare.requestData.skin_type && (
                <SkincareOptionTag
                  type="skinType"
                  label={skinTypeLabels[savedSkincare.requestData.skin_type] || savedSkincare.requestData.skin_type}
                />
              )}
              
              {/* Тип продукта */}
              {savedSkincare.requestData.desired_product_type && (
                <SkincareOptionTag
                  type="productType"
                  label={productTypeLabels[savedSkincare.requestData.desired_product_type] || savedSkincare.requestData.desired_product_type}
                />
              )}
              
              {/* Проблемы кожи */}
              {savedSkincare.requestData.concerns?.map((concern, i) => (
                <SkincareOptionTag
                  key={i}
                  type="concern"
                  label={concern}
                />
              ))}
              
              {/* Бюджет */}
              {savedSkincare.requestData.budget && (
                <SkincareOptionTag
                  type="budget"
                  label={savedSkincare.requestData.budget}
                />
              )}
              
              {/* Возрастная группа */}
              {savedSkincare.requestData.age_group && (
                <SkincareOptionTag
                  type="ageGroup"
                  label={savedSkincare.requestData.age_group}
                />
              )}
              
              {/* SPF */}
              {savedSkincare.requestData.spf_needed !== undefined && (
                <SkincareOptionTag
                  type="spf"
                  label={savedSkincare.requestData.spf_needed ? 'Нужен SPF' : 'Без SPF'}
                />
              )}
              
              {/* Предпочитаемые бренды */}
              {savedSkincare.requestData.brand_preference?.map((brand, i) => (
                <SkincareOptionTag
                  key={i}
                  type="brand"
                  label={brand}
                />
              ))}
            </div>

            {/* Дата сохранения */}
            <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground pt-4 border-t border-border">
              <Clock size={12} />
              <span>Сохранено {savedSkincare.createdAt.toLocaleDateString('ru-RU')}</span>
            </div>
          </div>

          {/* Блок комментария */}
          <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg md:text-xl text-foreground">Моя заметка</h2>
              {!isEditingComment && savedSkincare.userComment && (
                <button
                  onClick={handleEditComment}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors flex-shrink-0"
                  title="Редактировать комментарий"
                >
                  <Edit3 size={16} />
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
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                  placeholder="Напишите ваши мысли о средстве, почему подошел или не подошел..."
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
                    <Trash2 size={16} />
                    <span className="hidden xs:inline text-xs md:text-sm">Удалить</span>
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancelComment}
                      className="px-3 py-1 text-xs md:text-sm border border-border rounded-lg hover:bg-accent transition-colors"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={handleSaveComment}
                      disabled={!commentText.trim()}
                      className="px-3 py-1 text-xs md:text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Сохранить
                    </button>
                  </div>
                </div>
              </div>
            ) : savedSkincare.userComment ? (
              // Просмотр комментария
              <div className="p-3 bg-primary/20 border border-primary/30 rounded-lg">
                <p className="text-sm md:text-base text-foreground leading-relaxed whitespace-pre-wrap">
                  {savedSkincare.userComment}
                </p>
              </div>
            ) : (
              // Кнопка добавления комментария
              <button
                onClick={() => setIsEditingComment(true)}
                className="w-full p-4 border-2 border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-accent/10 transition-all duration-200 group"
              >
                <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground group-hover:text-foreground">
                  <Edit3 size={20} />
                  <div className="text-center">
                    <p className="font-medium text-sm md:text-base mb-1">Добавьте свою заметку</p>
                    <p className="text-xs md:text-sm text-muted-foreground/80">
                      Поделитесь мыслями о средстве<br />
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