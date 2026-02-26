// src/components/skincare/SkincareProductCard.tsx
'use client';

import { ShoppingCart, ExternalLink } from 'lucide-react';
// import { Star } from 'lucide-react';

import type { SkincareProduct } from '@/types/skincare';
import { SafeLink } from '../ui/safe/SafeLink';
import { InfoSection } from '../ui/shared/InfoSection';
import { SafeContent } from '../ui/safe/SafeContent';
import { TagList } from '../ui/shared/TagList';
import { FeatureList } from '../ui/shared/FeatureList';
import { SafeImage } from '../ui/safe/SafeImage';
import React from 'react';



interface SkincareProductCardProps {
  product: SkincareProduct;
  showPurchaseButtons?: boolean;
  showRating?: boolean;
  className?: string;
}



export function SkincareProductCardComponent({ 
  product, 
  showPurchaseButtons = true,
  // showRating = true,
  className = ''
}: SkincareProductCardProps) {

  // const ratingValue = product.rating;

  return (
    <div className={`bg-card rounded-2xl shadow-lg overflow-hidden ${className}`}>
      {/* Верхняя часть с изображением и основной информацией */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8">
        {/* Изображение */}
        <div className="rounded-xl overflow-hidden bg-muted/20">
            {product.image ? (
              <div className="relative w-full h-full">
                <SafeImage 
                  src={product.image} 
                  alt={product.name}
                  maxHeight="300px"
                />
              </div>
            ) : (
              <div className="relative w-full h-full">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-gray-600">💆</span>
                    </div>
                    <p className="text-sm text-gray-500">{product.brand}</p>
                  </div>
                </div>
              </div>
            )}
       
        </div>

        {/* Информация */}
        <div className="space-y-6">
          {/* Заголовок и категория */}
          <div className="space-y-2">
            {/* Бренд */}
            {product.brand && (
              <h2 className="text-2xl md:text-3xl font-bold text-section-development">
                {product.brand}
              </h2>
            )}

            {/* Разделительная линия */}
            <div className="h-px w-16 bg-border my-2"></div>

            {/* Название средства */}
            <h3 className="text-xl md:text-2xl text-foreground mb-4">
              {product.name}
            </h3>

            {/* Тип продукта */}
            {product.recommended_product_type && (
              <div className="inline-flex items-center gap-2 px-3 py-1 border text-primary text-xs md:text-sm rounded-full font-medium">
                {product.recommended_product_type}
              </div>
            )}

            {/* Рейтинг */}
            {/* {showRating && ratingValue !== undefined && (
            <div className="flex items-center gap-4 mt-4">
                <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                    {ratingValue.toFixed(1)}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">из 5</div>
                </div>
                <div>
                <p className="text-sm md:text-base text-muted-foreground">
                    {ratingValue >= 4.5 ? 'Отличный рейтинг' :
                    ratingValue >= 4.0 ? 'Хороший рейтинг' :
                    'Средний рейтинг'}
                </p>
                <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={14}
                        className={`${
                        i < Math.floor(ratingValue)
                            ? 'text-yellow-500 fill-yellow-500' 
                            : 'text-gray-300'
                        }`}
                    />
                    ))}
                </div>
                </div>
            </div>
            )} */}
          </div>

          {/* Цена и кнопки покупки */}
          {showPurchaseButtons && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-2xl md:text-3xl font-bold text-primary">
                  {product.price}
                </span>
                {product.size && (
                  <span className="text-sm text-muted-foreground">{product.size}</span>
                )}
              </div>

              {/* Кнопки покупки */}
              {product.purchaseLink ? (
                <SafeLink
                  href={product.purchaseLink}
                  external
                  className="flex items-center justify-center gap-3 w-full py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors text-base md:text-lg"
                >
                  <ShoppingCart size={20} />
                  <span>Купить на маркетплейсе</span>
                  <ExternalLink size={16} />
                </SafeLink>
              ) : product.where_to_buy && product.where_to_buy.length > 0 ? (
                <div className="space-y-2">
                  {product.where_to_buy.slice(0, 2).map((store, i) => (
                    <SafeLink
                      key={i}
                      href={store.url}
                      external
                      className="flex items-center justify-between w-full py-3 px-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
                    >
                      <span className="text-sm md:text-base">{store.name}</span>
                      <span className="font-bold text-sm md:text-base">{store.price}</span>
                    </SafeLink>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {/* ОПИСАНИЕ */}
      <InfoSection title="Описание">
        <SafeContent
          content={product.description}
          type="paragraphs"
          className="text-sm md:text-base text-muted-foreground leading-relaxed"
        />
      </InfoSection>

      {/* КЛЮЧЕВЫЕ ИНГРЕДИЕНТЫ */}
      {product.key_ingredients && product.key_ingredients.length > 0 && (
        <TagList
          tags={product.key_ingredients}
          title="Ключевые ингредиенты"
          variant="ingredient"
        />
      )}

      {/* ОСОБЕННОСТИ */}
      {product.features && product.features.length > 0 && (
        <FeatureList
          items={product.features}
          title="Особенности"
          variant="check"
        />
      )}

      {/* ПОЧЕМУ ХОРОШЕЕ СРЕДСТВО */}
      {product.reasons && product.reasons.length > 0 && (
        <FeatureList
          items={product.reasons}
          title="Почему это хорошее средство"
          variant="sparkle"
        />
      )}

      {/* ПОЧЕМУ ПОДХОДИТ ИМЕННО ВАМ */}
      {product.reasoning && (
        <InfoSection title="Почему подходит именно вам" variant="accent">
          <SafeContent
            content={product.reasoning}
            type="paragraphs"
            className="text-sm md:text-base text-muted-foreground leading-relaxed"
          />
        </InfoSection>
      )}

      {/* ТЕГИ */}
      {Array.isArray(product.tags) && product.tags.length > 0 && (
        <TagList
          tags={product.tags}
          // title={undefined}
          variant="default"
          withContainer={true}
        />
      )}
    </div>
  );
}

export const SkincareProductCard = React.memo(SkincareProductCardComponent);