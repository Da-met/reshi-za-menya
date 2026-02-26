'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Trash2, Clock, MoreVertical, Heart } from '@/lib/icons';
import { SavedSkincare } from '@/types/skincare';
import { SkincareOptionTag } from './SkincareOptionTag';
import { SafeContent } from '../ui/safe/SafeContent';
import { productTypeLabels, SKIN_BANNER, skinTypeLabels } from '@/constants/skincare.constants';
import { EmptyState } from '../ui/shared/EmptyState';
import { PromotionalBanner } from '@/components/ui/shared';



// Временные данные
const mockSavedSkincare: SavedSkincare[] = [
  {
    id: '1',
    productData: {
      id: 'product-1',
      name: 'Гиалуроновая сыворотка с витамином С',
      brand: 'La Roche-Posay',
      description: 'Интенсивное увлажнение и осветление кожи',
      price: '2 890 ₽',
      recommended_product_type: 'serum',
      key_ingredients: ['Гиалуроновая кислота', 'Витамин С', 'Ниацинамид'],
      features: ['Увлажнение', 'Осветление', 'Укрепление барьера кожи'],
      reasons: ['Подходит для чувствительной кожи', 'Нежирная текстура', 'Быстро впитывается'],

      image: `https://source.unsplash.com/featured/400x300/?La%20Roche%20Posay%20hyaluronic%20serum%20skincare`,

      purchaseLink: 'https://example.com',
      tags: ['увлажнение', 'витамин C', 'сыворотка'],
      rating: 4.8
    },
    requestData: {
      skin_type: 'dry',
      concerns: ['dryness', 'dullness'],
      desired_product_type: 'serum',
      budget: '2000-3000₽'
    },
    createdAt: new Date('2024-01-15'),
    userComment: 'Отлично подходит для зимнего ухода'
  },
  {
    id: '2',
    productData: {
      id: 'product-2',
      name: 'Увлажняющий крем с керамидами',
      brand: 'CeraVe',
      description: 'Восстанавливающий крем для сухой и чувствительной кожи',
      price: '1 200 ₽',
      recommended_product_type: 'moisturizer',
      key_ingredients: ['Керамиды', 'Гиалуроновая кислота', 'Ниацинамид'],
      features: ['Восстановление барьера', 'Увлажнение 24 часа', 'Не комедогенный'],
      reasons: ['Без отдушек', 'Подходит для чувствительной кожи', 'Доступная цена'],

      image: `https://source.unsplash.com/featured/400x300/?CeraVe%20moisturizer%20cream%20skincare`,

      purchaseLink: 'https://example.com',
      tags: ['увлажнение', 'керамиды', 'крем'],
      rating: 4.9
    },
    requestData: {
      skin_type: 'sensitive',
      concerns: ['sensitivity', 'dryness'],
      desired_product_type: 'moisturizer',
      budget: '1000-2000₽'
    },
    createdAt: new Date('2024-01-10')
  }
];




function SavedSkincareComponent() {
  const router = useRouter();
  const [savedProducts, setSavedProducts] = useState<SavedSkincare[]>(mockSavedSkincare);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDeleteProduct = (productId: string) => {
    console.log('Удаление средства:', productId);
    setSavedProducts(prev => prev.filter(product => product.id !== productId));
    setActiveDropdown(null);
  };

  const handleOpenProduct = (productId: string) => {
    router.push(`/skincare/saved/${productId}`);
  };

  const toggleDropdown = (productId: string) => {
    setActiveDropdown(activeDropdown === productId ? null : productId);
  };

  if (savedProducts.length === 0) {
    return (
      <>
        <PromotionalBanner
          title={SKIN_BANNER.title}
          description={SKIN_BANNER.description}
          route={SKIN_BANNER.route}
          emoji={SKIN_BANNER.emoji}
        />
        <EmptyState
          icon="💆"
          title="Нет сохраненных средств"
          description="Сохраняйте понравившиеся средства, чтобы вернуться к ним позже"
          variant="compact"
        />
      </>
    );
  }



  return (
    <div className="space-y-6">
      <PromotionalBanner
        title={SKIN_BANNER.title}
        description={SKIN_BANNER.description}
        route={SKIN_BANNER.route}
        emoji={SKIN_BANNER.emoji}
      />
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-muted-foreground">
            {savedProducts.length} сохранен{savedProducts.length === 1 ? 'ое' : 'ых'} средст{savedProducts.length === 1 ? 'во' : 'в'}
          </p>
        </div>
      </div>

      <div className="grid gap-5">
        {savedProducts.map((savedProduct) => {
          const isDropdownOpen = activeDropdown === savedProduct.id;

          return (
            <div
              key={savedProduct.id}
              className="group bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-200 hover:shadow-sm cursor-pointer"
              onClick={() => handleOpenProduct(savedProduct.id)}
            >
              <div className="p-6">
                {/* Заголовок и меню */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl md:text-3xl text-foreground leading-tight break-words group-hover:text-primary transition-colors">
                      {savedProduct.productData.name}
                    </h3>

                    {/* Бренд и тип */}
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-lg font-bold text-primary">
                        {savedProduct.productData.price}
                      </span>
                      <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-md">
                        {savedProduct.productData.brand}
                      </span>
                      {savedProduct.productData.recommended_product_type && (
                        <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-md">
                          {productTypeLabels[savedProduct.productData.recommended_product_type] || savedProduct.productData.recommended_product_type}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Выпадающее меню */}
                  <div className="relative flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(savedProduct.id);
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
                            handleDeleteProduct(savedProduct.id);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                        >
                          <Trash2 size={14} />
                          Удалить
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Описание */}
                <SafeContent
                  content={savedProduct.productData.description}
                  type="paragraphs"
                  className="text-muted-foreground leading-relaxed text-sm mb-4 line-clamp-2"
                  maxLength={150}
                />

                {/* Теги параметров */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {savedProduct.requestData.skin_type && (
                    <SkincareOptionTag
                      type="skinType"
                      label={skinTypeLabels[savedProduct.requestData.skin_type] || savedProduct.requestData.skin_type}
                      // value={savedProduct.requestData.skin_type}
                    />
                  )}

                  {savedProduct.requestData.desired_product_type && (
                    <SkincareOptionTag
                      type="productType"
                      label={productTypeLabels[savedProduct.requestData.desired_product_type] || savedProduct.requestData.desired_product_type}
                      // value={savedProduct.requestData.desired_product_type}
                    />
                  )}

                  {savedProduct.requestData.concerns?.slice(0, 2).map(concern => (
                    <SkincareOptionTag
                      key={concern}
                      type="concern"
                      label={concern}
                      // value={concern}
                    />
                  ))}

                  {savedProduct.requestData.budget && (
                    <SkincareOptionTag
                      type="budget"
                      label={savedProduct.requestData.budget}
                      // value={savedProduct.requestData.budget}
                    />
                  )}
                </div>

                {/* Комментарий */}
                {savedProduct.userComment && (
                  <div className="mb-4 p-3 bg-accent/20 border border-accent/30 rounded-lg">
                    <SafeContent
                      content={savedProduct.userComment || ''}
                      type="paragraphs"
                      className="text-sm text-foreground break-words"
                    />
                  </div>
                )}

                {/* Футер с датой */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock size={12} />
                    <span>Сохранено {savedProduct.createdAt.toLocaleDateString('ru-RU')}</span>
                  </div>
                  {savedProduct.productData.rating && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Heart size={12} className="text-red-500 fill-red-500" />
                      <span>{savedProduct.productData.rating}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


export default React.memo(SavedSkincareComponent);

