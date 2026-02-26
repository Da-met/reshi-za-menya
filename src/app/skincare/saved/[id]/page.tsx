// D:\МАЙО\JavaScript\ПРОЕКТЫ\РЕШИ ЗА МЕНЯ\reshi-za-menya\src\app\skincare\saved\[id]\page.tsx
'use client';

import { useState } from 'react';
import { ArrowLeft, Edit3, Trash2 } from '@/lib/icons';
import Link from 'next/link';
import type { SavedSkincare } from '@/types/skincare';
import { SafeContent } from '@/components/ui/safe/SafeContent';

import { SkincareRequestDetails } from '@/components/skincare/SkincareRequestDetails';
import { SkincareProductCard } from '@/components/skincare/SkincareProductCard';


const mockSavedSkincare: SavedSkincare = {
  id: '1',
  productData: {
    id: 'product-1',
    name: 'Гиалуроновая сыворотка с витамином С',
    brand: 'La Roche-Posay',
    description: 'Интенсивное увлажнение и осветление кожи. Подходит для чувствительной кожи, нежирная текстура, быстро впитывается. Содержит гиалуроновую кислоту, витамин С и ниацинамид для комплексного ухода.',
    price: '2 890 ₽',
    price_range: '2000-3000₽',
    image: `https://source.unsplash.com/featured/400x300/?La%20Roche%20Posay%20hyaluronic%20acid%20vitamin%20C%20serum`,
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




export default function SkincareDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [savedSkincare, setSavedSkincare] = useState<SavedSkincare>(mockSavedSkincare);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [commentText, setCommentText] = useState(savedSkincare.userComment || '');

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
          {/* Основной блок с деталями средства - ИСПОЛЬЗУЕМ НОВЫЙ КОМПОНЕНТ */}
          <SkincareProductCard
            product={savedSkincare.productData}
            showPurchaseButtons={true}
            // showRating={true}
          />

          {/* Блок с деталями запроса - ОТДЕЛЬНЫЙ КОМПОНЕНТ ВНИЗУ */}
          <SkincareRequestDetails
            request={savedSkincare.requestData}
            createdAt={savedSkincare.createdAt}
          />

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
                <SafeContent
                  content={savedSkincare.userComment || ''}
                  type="paragraphs"
                  className="text-sm md:text-base text-foreground leading-relaxed"
                />
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