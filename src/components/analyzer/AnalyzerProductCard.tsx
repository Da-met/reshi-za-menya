// src/components/analyzer/AnalyzerProductCard.tsx

'use client';

import React from 'react';
import { 
  ShoppingCart, 
  ExternalLink, 
  Star,
  AlertTriangle,
  Sparkles,
  Droplets,
  Flame
} from 'lucide-react';
import type { AnalyzerProduct } from '@/types/analyzer';
import { SafeImage } from '@/components/ui/safe/SafeImage';
import { SafeContent } from '@/components/ui/safe/SafeContent';
import { TagList } from '@/components/ui/shared/TagList';
import { FeatureList } from '@/components/ui/shared/FeatureList';
import { InfoSection } from '@/components/ui/shared/InfoSection';

interface AnalyzerProductCardProps {
  product: AnalyzerProduct;
  showPurchaseButtons?: boolean;
  className?: string;
}

function AnalyzerProductCardComponent({ 
  product, 
  showPurchaseButtons = true,
  className = '' 
}: AnalyzerProductCardProps) {

  const getSafetyColor = (score: number) => {
    if (score >= 8) return 'text-green-600 border-green-200 dark:border-green-800';
    if (score >= 6) return 'text-blue-600 border-blue-200 dark:border-blue-800';
    if (score >= 4) return 'text-amber-600 border-amber-200 dark:border-amber-800';
    return 'text-red-600 border-red-200 dark:border-red-800';
  };

  const safetyColor = getSafetyColor(product.safetyScore);
  
  // Формируем URL для fallback изображения
  const imageSrc = !product.image
    ? `/images/fallbacks/${product.category || 'skincare'}.jpg`
    : product.image;

  return (
    <div className={`bg-card rounded-2xl shadow-lg overflow-hidden ${className}`}>
      {/* Верхняя часть с изображением и основной информацией */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8">
        {/* Изображение */}
        <div className="rounded-xl overflow-hidden bg-muted/20">
          <SafeImage
            src={imageSrc}
            alt={product.name}
            maxHeight="300px"
          />
        </div>

        {/* Информация */}
        <div className="space-y-6">
          {/* Бренд и название */}
          <div className="space-y-2">
            {product.brand && (
              <h2 className="text-2xl md:text-3xl font-bold text-section-development">
                {product.brand}
              </h2>
            )}
            <div className="h-px w-16 bg-border my-2" />
            <h3 className="text-xl md:text-2xl text-foreground mb-4">
              {product.name}
            </h3>

            {/* Категория */}
            {product.category && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs md:text-sm">
                {product.category}
              </span>
            )}

            {/* Оценка безопасности */}
            <div className="flex items-center gap-4 mt-4">
              <div className="text-center">
                <div className={`text-2xl md:text-3xl font-bold ${safetyColor}`}>
                  {product.safetyScore.toFixed(1)}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">из 10</div>
              </div>
              <div>
                <p className="text-sm md:text-base text-muted-foreground">
                  {product.safetyScore >= 8 ? 'Отличная безопасность' :
                   product.safetyScore >= 6 ? 'Хорошая безопасность' :
                   product.safetyScore >= 4 ? 'Средняя безопасность' :
                   'Низкая безопасность'}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < Math.floor(product.safetyScore / 2)
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Цена и кнопка покупки */}
          {showPurchaseButtons && product.price && (
            <div className="space-y-4">
              <span className="text-2xl md:text-3xl font-bold text-primary">
                {product.price}
              </span>

              {(product.purchaseLink || product.purchaseLinks) && (
                <a
                  href={product.purchaseLink || Object.values(product.purchaseLinks || {})[0] || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors text-base md:text-lg"
                >
                  <ShoppingCart size={20} />
                  <span>Купить на маркетплейсе</span>
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Описание */}
      {product.description && (
        <InfoSection title="Описание">
          <SafeContent
            content={product.description}
            type="paragraphs"
            className="text-sm md:text-base text-muted-foreground leading-relaxed"
          />
        </InfoSection>
      )}

      {/* Разбор состава */}
      {product.ingredients && product.ingredients.length > 0 && (
        <div className="border-t border-border p-6 md:p-8">
          <h3 className="text-lg md:text-xl text-foreground mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-primary" />
            📊 Разбор состава
          </h3>
          <div className="space-y-3">
            {product.ingredients.slice(0, 10).map((ingredient, index) => (
              <div key={index} className="p-3 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{ingredient.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      ingredient.safety === 'excellent' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                      ingredient.safety === 'good' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                      ingredient.safety === 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {ingredient.safety === 'excellent' ? 'Отлично' :
                       ingredient.safety === 'good' ? 'Хорошо' :
                       ingredient.safety === 'warning' ? 'Внимание' : 'Опасно'}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{ingredient.purpose}</p>
                
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Droplets size={12} /> Комедогенность: {ingredient.comedogenicRating}/5
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Flame size={12} /> Раздражение: {
                      ingredient.irritancy === 'low' ? 'Низкое' :
                      ingredient.irritancy === 'medium' ? 'Среднее' : 'Высокое'
                    }
                  </span>
                </div>

                {ingredient.benefits.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {ingredient.benefits.map((benefit, i) => (
                      <span key={i} className="text-xs text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
                        {benefit}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Особенности */}
      {product.features && product.features.length > 0 && (
        <FeatureList items={product.features} title="Особенности" variant="check" />
      )}

      {/* Преимущества */}
      {product.recommendations && product.recommendations.length > 0 && (
        <FeatureList items={product.recommendations} title="Преимущества средства" variant="sparkle" />
      )}

      {/* Предупреждения */}
      {product.warnings && product.warnings.length > 0 && (
        <div className="border-t border-border p-6 md:p-8">
          <h3 className="text-lg md:text-xl text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-red-500" />
            На что обратить внимание
          </h3>
          <div className="space-y-3">
            {product.warnings.map((warning, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-red-500 mt-0.5">•</span>
                <span className="text-sm md:text-base text-muted-foreground">{warning}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Теги */}
      {product.tags && product.tags.length > 0 && (
        <TagList tags={product.tags} variant="default" withContainer={true} />
      )}
    </div>
  );
}

export const AnalyzerProductCard = React.memo(AnalyzerProductCardComponent);
AnalyzerProductCard.displayName = 'AnalyzerProductCard';