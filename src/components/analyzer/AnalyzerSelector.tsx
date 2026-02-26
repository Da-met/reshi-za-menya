// src/components/analyzer/AnalyzerSelector.tsx

'use client';

import React from 'react';
import { useEffect } from 'react';
import { AnalyzerRequest, AnalysisResponse } from '@/types/analyzer';
import { ProductSearchSection } from './sections/ProductSearchSection';
import { SelectedOptions } from './SelectedOptions';
import { UniversalLoader } from '@/components/ui/UniversalLoader';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { PromotionalBanner } from '@/components/ui/shared';
import { useAnalyzerForm } from '@/hooks/analyzer/useAnalyzerForm';
import { useAnalyzerApi } from '@/hooks/analyzer/useAnalyzerApi';
import { ANALYZER_BANNER } from '@/constants/analyzer.constants';

interface AnalyzerSelectorProps {
  onResultGenerated?: (result: AnalysisResponse) => void;
  onAnalyzingChange?: (analyzing: boolean) => void;
  onRequestChange?: (request: AnalyzerRequest) => void;
  currentRequest?: AnalyzerRequest;
  onClearResult?: () => void;
}

export function AnalyzerSelectorComponent({
  onResultGenerated,
  onAnalyzingChange,
  onRequestChange,
  currentRequest = { productName: '' },
  onClearResult
}: AnalyzerSelectorProps) {

  // Используем кастомные хуки
  const { request, updateRequest, isValid } = useAnalyzerForm(currentRequest);
  
  const {
    analyzeProduct,
    isLoading,
    error,
    clearError
  } = useAnalyzerApi({
    onSuccess: (response) => {
      console.log('✅ Анализ успешно завершен:', response.product.name);
      onResultGenerated?.(response);
    },
    onError: (error) => {
      console.error('❌ Ошибка анализа:', error);
    },
    timeoutMs: 60000,
    maxRetries: 2,
    enableCache: true,
    cacheTTL: 3600000
  });

  // Уведомляем родителя об изменениях запроса
  useEffect(() => {
    onRequestChange?.(request);
  }, [request, onRequestChange]);

  // Уведомляем о состоянии загрузки
  useEffect(() => {
    onAnalyzingChange?.(isLoading);
  }, [isLoading, onAnalyzingChange]);

  const handleAnalyze = async () => {
    if (!isValid || isLoading) return;
    
    // Очищаем предыдущий результат
    onClearResult?.();
    
    // Очищаем ошибку
    clearError();
    
    // Запускаем анализ
    await analyzeProduct(request);
  };

  // Обработчик повторной попытки при ошибке
  const handleRetry = () => {
    handleAnalyze();
  };

  return (
    <div className="space-y-6">
      {/* Заменяем SeasonalBanner на PromotionalBanner */}
      <PromotionalBanner
        title={ANALYZER_BANNER.title}
        description={ANALYZER_BANNER.description}
        route={ANALYZER_BANNER.route}
        emoji={ANALYZER_BANNER.emoji}
      />
      
      {/* Блок с выбранными опциями (только название продукта) */}
      <SelectedOptions request={request} />

      {/* Основной блок анализатора */}
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

        {/* Секция поиска продукта */}
        <div className="mb-6">
          <ProductSearchSection
            request={request}
            onChange={updateRequest}
          />
        </div>

        {/* Кнопка анализа */}
        <div className="text-center pt-4">
          <button
            onClick={handleAnalyze}
            disabled={!isValid || isLoading}
            className={`
              w-full
              px-6 py-4 md:px-8 md:py-5
              rounded-xl md:rounded-2xl
              font-bold
              text-lg md:text-xl
              transition-all duration-300 transform
              ${isValid && !isLoading
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
              }
              ${isLoading ? 'opacity-70' : ''}
            `}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2 justify-center">
                <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                <span>Анализируем состав...</span>
              </div>
            ) : (
              '🧪 ПРОАНАЛИЗИРОВАТЬ СОСТАВ'
            )}
          </button>
          {!isValid && (
            <p className="text-sm text-muted-foreground mt-3">
              Введите название продукта для анализа состава
            </p>
          )}
        </div>
      </div>

      {/* Универсальный лоадер */}
      <UniversalLoader
        isVisible={isLoading}
        title="Анализируем состав"
        message="Ищем информацию о продукте и анализируем каждый ингредиент..."
      />

      {/* Блок с ошибкой */}
      {error && (
        <div className="mt-4">
          <ErrorDisplay
            error={error}
            onRetry={handleRetry}
            onDismiss={clearError}
            module="analyzer"
          />
        </div>
      )}
    </div>
  );
}

export const AnalyzerSelector = React.memo(AnalyzerSelectorComponent);
AnalyzerSelector.displayName = 'AnalyzerSelector';