// components/analyzer/AnalyzerSelector.tsx (ФИНАЛЬНЫЙ)
'use client';

import { useState, useEffect } from 'react';
import { AnalyzerRequest, AnalysisResponse } from '@/types/analyzer';
import { ProductSearchSection } from './sections/ProductSearchSection';
import { SelectedOptions } from './SelectedOptions';
import { SeasonalBanner } from './SeasonalBanner';


interface AnalyzerSelectorProps {
  onResultGenerated?: (result: AnalysisResponse) => void;
  isAnalyzing?: boolean;
  onAnalyzingChange?: (analyzing: boolean) => void;
  onRequestChange?: (request: AnalyzerRequest) => void;
  currentRequest?: AnalyzerRequest;
  onClearResult?: () => void;
}

export function AnalyzerSelector({
  onResultGenerated,
  isAnalyzing = false,
  onAnalyzingChange,
  onRequestChange,
  currentRequest = { productName: '' },
  onClearResult
}: AnalyzerSelectorProps) {
  const [analyzerRequest, setAnalyzerRequest] = useState<AnalyzerRequest>({
    productName: currentRequest.productName || ''
  });

  // Синхронизируем с родительским состоянием
  useEffect(() => {
    onRequestChange?.(analyzerRequest);
  }, [analyzerRequest, onRequestChange]);

  // Валидация формы
  const isFormValid = () => {
    const hasProductName = !!analyzerRequest.productName.trim();
    return hasProductName;
  };

  const handleAnalyze = async () => {
    if (!isFormValid() || isAnalyzing) return;
    onClearResult?.();
    onAnalyzingChange?.(true);
    
    console.log('Анализируем продукт:', analyzerRequest);
    
    try {
      // TODO: Заменить на реальный API вызов
      // const response = await fetch('/api/analyzer', {
      //   method: 'POST',
      //   body: JSON.stringify(analyzerRequest)
      // });
      
      // Пока используем заглушку
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResponse: AnalysisResponse = {
        product: {
          id: '1',
          name: analyzerRequest.productName || 'Пример средства',
          brand: 'Пример бренда',
          description: 'Это пример результата анализа. В реальной версии здесь будет полный анализ состава косметического средства с оценкой безопасности, разбором ингредиентов и рекомендациями.',
          safetyScore: 7.5,
          features: [
            'Содержит гиалуроновую кислоту',
            'Обогащен церамидами',
            'Без отдушек и парабенов',
            'Гипоаллергенная формула',
            'Подходит для чувствительной кожи'
          ],
          ingredients: [
            {
              name: 'Aqua',
              safety: 'excellent',
              purpose: 'Растворитель',
              comedogenicRating: 0,
              irritancy: 'low',
              benefits: ['Безопасный', 'Гипоаллергенный'],
              concerns: []
            },
            {
              name: 'Glycerin',
              safety: 'good',
              purpose: 'Увлажнитель',
              comedogenicRating: 0,
              irritancy: 'low',
              benefits: ['Интенсивное увлажнение', 'Укрепление барьера кожи'],
              concerns: []
            }
          ],
          skinTypeCompatibility: {
            normal: 8,
            dry: 9,
            oily: 6,
            combination: 7,
            sensitive: 5
          },
          warnings: ['Содержит отдушки', 'Может вызывать раздражение у чувствительной кожи'],
          recommendations: ['Использовать 1-2 раза в день', 'Провести тест на аллергию'],
          tags: ['увлажняющий', 'для сухой кожи']
        },
        generationId: Date.now().toString()
      };
      
      onResultGenerated?.(mockResponse);
      
    } catch (error) {
      console.error('Ошибка анализа:', error);
      alert('Произошла ошибка при анализе состава. Попробуйте еще раз.');
    } finally {
      onAnalyzingChange?.(false);
    }
  };

  const handleRequestChange = (updates: Partial<AnalyzerRequest>) => {
    setAnalyzerRequest(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="space-y-6">
      {/* Сезонный баннер */}
      <SeasonalBanner />

      {/* Блок выбранных опций */}
      <SelectedOptions request={analyzerRequest} />
      
      {/* Основной анализатор */}
      <div className="bg-card rounded-2xl shadow-lg p-6">
        {/* Заголовок секции */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center space-x-3 mb-4">

            <div>
              <h3 className="text-xl md:text-2xl font-accent text-foreground">
                Введите название средства
              </h3>
              <p className="text-sm md:text-base text-muted-foreground mt-1">
                Найдем и проанализируем состав косметики
              </p>
            </div>
          </div>
        </div>

        {/* Секция формы */}
        <div className="mb-6">
          <ProductSearchSection
            request={analyzerRequest}
            onChange={handleRequestChange}
          />
        </div>


        {/* Кнопка анализа */}
        <div className="text-center pt-4">
          <button
            onClick={handleAnalyze}
            disabled={!isFormValid() || isAnalyzing}
            className={`
              w-full
              px-6 py-4 md:px-8 md:py-5
              rounded-xl md:rounded-2xl
              font-bold
              text-lg md:text-xl
              transition-all duration-300 transform
              ${isFormValid() && !isAnalyzing
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
              }
              ${isAnalyzing ? 'opacity-70' : ''}
            `}
          >
            {isAnalyzing ? (
              <div className="flex items-center space-x-2 justify-center">
                <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                <span>Анализируем...</span>
              </div>
            ) : (
              '🧪 ПРОАНАЛИЗИРОВАТЬ СОСТАВ'
            )}
          </button>
          
          {!isFormValid() && (
            <p className="text-sm text-muted-foreground mt-3">
              Введите название продукта для анализа состава
            </p>
          )}
        </div>
      </div>
    </div>
  );
}