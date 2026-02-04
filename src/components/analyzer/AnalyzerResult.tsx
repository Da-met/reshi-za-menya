// components/analyzer/AnalyzerResult.tsx
'use client';

import { AnalysisResponse } from '@/types/analyzer';
import { useState } from 'react';
import { Package, RotateCw, Sparkles, ShoppingCart, Heart, Share2, CheckCircle, Star, AlertTriangle } from 'lucide-react';
import Image from 'next/image';

interface AnalyzerResultProps {
  result: AnalysisResponse;
  onSave: () => void;
  onAnalyzeAnother: () => void;
}

export function AnalyzerResult({ result, onSave, onAnalyzeAnother }: AnalyzerResultProps) {
  const [saved, setSaved] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleSave = () => {
    onSave();
    setSaved(true);
  };

  const imageSrc = imageError || !result.product.image
    ? `/images/fallbacks/${result.product.category || 'skincare'}.jpg`
    : result.product.image;

  return (
    <div className="space-y-6 md:space-y-8 mt-8">
      {/* Заголовок */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-3">
          <Sparkles size={20} className="text-primary" />
          <h2 className="text-xl md:text-2xl lg:text-3xl font-accent text-foreground">
            МЫ ПРОАНАЛИЗИРОВАЛИ СОСТАВ!
          </h2>
          <Sparkles size={20} className="text-secondary" />
        </div>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          Вот что мы обнаружили в средстве
        </p>
      </div>

      {/* Карточка товара */}
      <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
        {/* Верхняя часть */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8">
          {/* Изображение */}
          <div className="rounded-xl overflow-hidden bg-muted/20">
            <Image
              src={imageSrc}
              width={0}
              height={0}
              alt={result.product.name}
              className="w-full h-64 md:h-80 object-cover"
              onError={() => setImageError(true)}
            />
          </div>
          
          {/* Информация */}
          <div className="space-y-6">
            {/* Заголовок и категория */}
            <div>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  <Package size={16} />
                  Средство для ухода
                </span>
                {result.product.brand && (
                  <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {result.product.brand}
                  </span>
                )}
                {result.product.category && (
                  <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {result.product.category}
                  </span>
                )}
              </div>
              
              <h2 className="text-xl md:text-2xl lg:text-3xl text-foreground mb-4">
                {result.product.name}
              </h2>
              
              {/* Оценка безопасности */}
              <div className="flex items-center gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {result.product.safetyScore.toFixed(1)}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">из 10</div>
                </div>
                <div>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {result.product.safetyScore >= 8 ? 'Отличная безопасность' :
                    result.product.safetyScore >= 6 ? 'Хорошая безопасность' :
                    result.product.safetyScore >= 4 ? 'Средняя безопасность' :
                    'Низкая безопасность'}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={`${i < Math.floor(result.product.safetyScore / 2) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Кнопка купить */}
            {(result.product.purchaseLink || result.product.purchaseLinks) && (
              <a
                href={result.product.purchaseLink || Object.values(result.product.purchaseLinks || {})[0] || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors text-lg"
              >
                <ShoppingCart size={24} />
                <span>Купить на маркетплейсе</span>
              </a>
            )}
          </div>
        </div>

        {/* Описание */}
        <div className="border-t border-border p-6 md:p-8">
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl text-foreground">Описание</h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {result.product.description}
            </p>
          </div>
        </div>

        {/* Разбор состава */}
        {result.product.ingredients.length > 0 && (
          <div className="border-t border-border p-6 md:p-8">
            <h3 className="text-lg md:text-xl text-foreground mb-4">📊 Разбор состава</h3>
            <div className="space-y-3">
              {result.product.ingredients.slice(0, 5).map((ingredient, index) => (
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
                    <span className="text-sm text-muted-foreground">
                      {ingredient.purpose}
                    </span>
                  </div>
                  
                  {ingredient.benefits.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground">
                        {ingredient.benefits.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Особенности и Совместимость */}
        <div className="border-t border-border">
          <div className="p-6 md:p-8 space-y-8">
            {/* Особенности (если есть) */}
            {result.product.features && result.product.features.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl text-foreground">Особенности</h3>
                <div className="space-y-3">
                  {result.product.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                      <span className="text-sm md:text-base text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Совместимость с типами кожи (если есть) */}
            {result.product.skinTypeCompatibility && Object.keys(result.product.skinTypeCompatibility).length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-primary/10">
                    <Sparkles size={12} className="text-primary" />
                  </div>
                  <h3 className="text-lg md:text-xl text-foreground">Совместимость с типами кожи</h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {Object.entries(result.product.skinTypeCompatibility).map(([skinType, score]) => {
                    const getColor = () => {
                      if (score >= 8) return 'text-green-600 dark:text-green-400 border-green-200 dark:border-green-800';
                      if (score >= 6) return 'text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800';
                      if (score >= 4) return 'text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800';
                      return 'text-red-600 dark:text-red-400 border-red-200 dark:border-red-800';
                    };
                    
                    const label = skinType === 'normal' ? 'Нормальная' :
                                skinType === 'dry' ? 'Сухая' :
                                skinType === 'oily' ? 'Жирная' :
                                skinType === 'combination' ? 'Комби' : 'Чувствительная';
                    
                    return (
                      <div key={skinType} className="border border-border rounded-lg p-3 hover:border-primary/30 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">{label}</span>
                          <span className={`text-xs md:text-sm font-bold ${getColor()}`}>
                            {score.toFixed(1)}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                score >= 8 ? 'bg-green-500' :
                                score >= 6 ? 'bg-blue-500' :
                                score >= 4 ? 'bg-amber-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${score * 10}%` }}
                            />
                          </div>
                          <span className="text-[10px] md:text-xs text-muted-foreground">/10</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Преимущества (рекомендации) */}
        {result.product.recommendations && result.product.recommendations.length > 0 && (
          <div className="border-t border-border p-6 md:p-8">
            <h3 className="text-lg md:text-xl text-foreground mb-4">Преимущества средства</h3>
            <div className="space-y-3">
              {result.product.recommendations.map((recommendation: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <Star size={18} className="text-yellow-500 flex-shrink-0" />
                  <span className="text-sm md:text-base text-muted-foreground">{recommendation}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Предупреждения */}
        {result.product.warnings && result.product.warnings.length > 0 && (
          <div className="border-t border-border p-6 md:p-8">
            <h3 className="text-lg md:text-xl text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle size={18} className="text-red-500" />
              На что обратить внимание
            </h3>
            <div className="space-y-3">
              {result.product.warnings.map((warning: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span className="text-sm md:text-base text-muted-foreground">{warning}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Теги */}
        {result.product.tags && result.product.tags.length > 0 && (
          <div className="border-t border-border p-6 md:p-8">
            <div className="flex flex-wrap gap-2">
              {result.product.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 border text-primary text-sm rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Кнопки действий */}
        <div className="border-t border-border p-6 md:p-8">
          <div className="flex flex-col sm:flex-row gap-3">
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
                {saved ? '✓' : <Heart size={18} className="flex-shrink-0" />}
                <span className="font-semibold text-xs md:text-sm sm:text-base truncate">
                  {saved ? 'Сохранено!' : 'Сохранить анализ'}
                </span>
              </button>
              <button className="flex items-center justify-center gap-2 py-3 px-4 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-secondary/90 transition-colors flex-1 min-w-0">
                <Share2 size={18} className="flex-shrink-0" />
                <span className="text-xs md:text-sm sm:text-base truncate">Поделиться</span>
              </button>
            </div>
            
            <button
              onClick={onAnalyzeAnother}
              className="flex items-center justify-center gap-2 py-3 px-4 border border-border text-foreground rounded-xl font-semibold hover:bg-accent transition-colors min-w-0"
            >
              <RotateCw size={18} className="flex-shrink-0" />
              <span className="text-xs md:text-sm sm:text-base truncate">Другой продукт</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}