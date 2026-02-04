'use client';

import { SkincareResponse } from '@/types/skincare';
import { useState } from 'react';
import { Droplets, Sparkles, ShoppingCart, Heart, Share2, RotateCw, Check, CheckCircle, Star, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface SkincareResultProps {
  response: SkincareResponse;
  onGenerateAnother?: (excludeTitle?: string) => void;
}

export function SkincareResult({ response, onGenerateAnother }: SkincareResultProps) {
  const [saved, setSaved] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleSave = () => {
    setSaved(true);
  };

  const handleImageError = (productId: string) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };


  return (
    <div className="space-y-6 md:space-y-8 mt-8">
      {/* Заголовок результатов */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-3">
          <Sparkles size={20} className="text-primary" />
          <h2 className="text-xl md:text-2xl lg:text-3xl font-accent text-foreground">
            МЫ ПОДОБРАЛИ СРЕДСТВО!
          </h2>
          <Sparkles size={20} className="text-secondary" />
        </div>
      </div>

      {/* Список продуктов */}
      <div className="space-y-6">
        {response.products.map((product) => (
          <div key={product.id} className="bg-card rounded-2xl shadow-lg overflow-hidden">
            {/* Верхняя часть с изображением и основной информацией */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8">
              {/* Изображение */}
              <div className="rounded-xl overflow-hidden bg-muted/20">
                {product.image && !imageErrors[product.id] ? (
                  <Image
                    src={product.image}
                    width={0}
                    height={0}
                    alt={product.name}
                    className="w-full h-64 md:h-80 object-cover"
                    onError={() => handleImageError(product.id)}
                  />
                ) : (
                  <div className="w-full h-64 md:h-80 flex items-center justify-center bg-muted">
                    <Droplets size={64} className="text-muted-foreground" />
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
                    <div className="inline-flex items-center gap-2 
                    px-3 py-1 border text-primary text-xs md:text-sm rounded-full font-medium
                    ">
                      {product.recommended_product_type}
                    </div>
                  )}
                </div>

                {/* Цена и кнопка купить */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl md:text-3xl font-bold text-primary">{product.price}</span>
                    {product.size && (
                      <span className="text-sm text-muted-foreground">{product.size}</span>
                    )}
                  </div>
                  
                  {/* Кнопка купить */}
                  {product.purchaseLink ? (
                    <a
                      href={product.purchaseLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors text-base md:text-lg"
                    >
                      <ShoppingCart size={20} />
                      <span>Купить на маркетплейсе</span>
                      <ExternalLink size={16} />
                    </a>
                  ) : product.where_to_buy && product.where_to_buy.length > 0 ? (
                    <div className="space-y-2">
                      {product.where_to_buy.slice(0, 2).map((store, i) => (
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
                </div>
              </div>
            </div>

            {/* Описание */}
            <div className="border-t border-border p-6 md:p-8">
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl text-foreground">Описание</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Ключевые ингредиенты */}
            {product.key_ingredients && product.key_ingredients.length > 0 && (
              <div className="border-t border-border p-6 md:p-8">
                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl text-foreground">Ключевые ингредиенты</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.key_ingredients.map((ingredient, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary/30 text-foreground rounded-full text-xs md:text-sm"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Особенности */}
            {product.features && product.features.length > 0 && (
              <div className="border-t border-border p-6 md:p-8">
                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl text-foreground">Особенности</h3>
                  <div className="space-y-3">
                    {product.features.map((feature, i) => (
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
            {product.reasons && product.reasons.length > 0 && (
              <div className="border-t border-border p-6 md:p-8 bg-primary/5">
                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl text-foreground flex items-center gap-2">
                    <Star size={18} className="text-yellow-500" />
                    Почему это хорошее средство
                  </h3>
                  <div className="space-y-3">
                    {product.reasons.map((reason, i) => (
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
            {product.reasoning && (
              <div className="border-t border-border p-6 md:p-8 bg-accent/10">
                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl text-foreground">Почему подходит именно вам</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {product.reasoning}
                  </p>
                </div>
              </div>
            )}

            {/* Теги */}
            {product.tags && product.tags.length > 0 && (
              <div className="border-t border-border p-6 md:p-8">
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, i) => (
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
        ))}
      </div>

      {/* Кнопки действий */}
      <div className="bg-card rounded-2xl shadow-lg p-4 md:p-6">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Кнопки сохранить и поделиться */}
          <div className="flex flex-col xs:flex-row gap-3 flex-1">
            <button
              onClick={handleSave}
              disabled={saved}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-colors flex-1 min-w-0 ${
                saved
                  ? 'bg-green-500 text-white cursor-not-allowed'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
            >
              {saved ? <Check size={16} className="flex-shrink-0" /> : <Heart size={16} className="flex-shrink-0" />}
              <span className="font-semibold text-xs md:text-sm sm:text-base truncate">
                {saved ? 'Сохранено!' : 'Сохранить себе'}
              </span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-secondary/90 transition-colors flex-1 min-w-0">
              <Share2 size={16} className="flex-shrink-0" />
              <span className="text-xs md:text-sm sm:text-base truncate">Поделиться</span>
            </button>
          </div>
          
          {/* Кнопка другой вариант */}
          <button
            onClick={() => {
              if (response.products[0]?.name) {
                onGenerateAnother?.(response.products[0].name); // <-- Передаем название текущего средства
              } else {
                onGenerateAnother?.(); // <-- Если нет названия, вызываем без параметра
              }
            }}
            className="flex items-center justify-center gap-2 py-3 px-4 border border-border text-foreground rounded-xl font-semibold hover:bg-accent transition-colors min-w-0"
          >
            <RotateCw size={16} className="flex-shrink-0" />
            <span className="text-xs md:text-sm sm:text-base truncate">Другой вариант</span>
          </button>
        </div>
      </div>
    </div>
  );
}