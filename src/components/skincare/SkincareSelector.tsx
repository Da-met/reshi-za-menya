'use client';

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { SkincareRequest, SkincareResponse } from '@/types/skincare';
import { useSkincareForm } from '@/hooks/skincare/useSkincareForm';
import { useSkincareApi } from '@/hooks/skincare/useSkincareApi';
import {
  SelectedOptions,
  SkinTypeSection,
  ConcernsSection,
  ProductTypeSection,
  FiltersSection,
  SkincareResult
} from '@/components/skincare';
import { Droplets, AlertCircle, Filter, Settings } from 'lucide-react';
import { UniversalLoader } from '@/components/ui/UniversalLoader';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { PromotionalBanner } from '@/components/ui/shared';
import { SKIN_BANNER } from '@/constants/skincare.constants';






const MemoizedSkincareResult = React.memo(SkincareResult);
const MemoizedSelectedOptions = React.memo(SelectedOptions);

interface SkincareSelectorProps {
  onProductsGenerated?: (response: SkincareResponse) => void;
  onRequestChange?: (request: SkincareRequest) => void;
  currentRequest?: SkincareRequest;
}

export function SkincareSelector({
  onProductsGenerated,
  onRequestChange,
  currentRequest = {}
}: SkincareSelectorProps) {
  // Используем кастомные хуки
  const { request, updateRequest, isValid } = useSkincareForm(currentRequest);
  const { 
    generateRecommendations, 
    isLoading, 
    error,
    clearError,
  } = useSkincareApi({
    onSuccess: (response) => {
      onProductsGenerated?.(response);
      setResult(response);
    },
    onError: (error) => {
      console.error('Error in skincare generation:', error);
    },
    timeoutMs: 30000, // 30 секунд таймаут
    maxRetries: 2 // 2 повторные попытки
  });


  // Состояние для результатов
  const [result, setResult] = useState<SkincareResponse | null>(null);
  const [activeSection, setActiveSection] = useState<'skinType' | 'concerns' | 'productType' | 'filters'>('skinType');

  // Refs
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const loaderContainerRef = useRef<HTMLDivElement>(null);
  const errorContainerRef = useRef<HTMLDivElement>(null);

  // Уведомляем родителя об изменениях запроса
  useEffect(() => {
    onRequestChange?.(request);
  }, [request, onRequestChange]);

  // Скролл к результатам
  useEffect(() => {
    if (result && resultsContainerRef.current) {
      setTimeout(() => {
        resultsContainerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  }, [result]);

  // Скролл к лоадеру при начале загрузки
  useEffect(() => {
    if (isLoading && loaderContainerRef.current) {
      setTimeout(() => {
        loaderContainerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 200);
    }
  }, [isLoading]);

  // Скролл к ошибке
  useEffect(() => {
  if (error && errorContainerRef.current) {
    setTimeout(() => {
      errorContainerRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 100);
  }
}, [error]);

  const handleGenerate = async (excludeTitle?: string) => {
    // 👇 ЗАЩИТА ОТ СОБЫТИЯ!
    if (excludeTitle && typeof excludeTitle !== 'string') {
      console.warn('🚨 Skincare: excludeTitle не строка! Очищаем');
      excludeTitle = undefined;
    }

    console.log('🎯 handleGenerate вызван с excludeTitle:', excludeTitle); // ← ДОБАВЬ

    if (!isValid || isLoading) return;

    setResult(null);
    clearError();

    await generateRecommendations(request, excludeTitle);
  };


  // Секции
  const sections = [
    { id: 'skinType' as const, label: 'Тип кожи', icon: <Droplets size={16} /> },
    { id: 'concerns' as const, label: 'Проблемы', icon: <AlertCircle size={16} /> },
    { id: 'productType' as const, label: 'Средство', icon: <Filter size={16} /> },
    { id: 'filters' as const, label: 'Фильтры', icon: <Settings size={16} /> }
  ];


  return (
    <div className="space-y-6">
      <PromotionalBanner
        title={SKIN_BANNER.title}
        description={SKIN_BANNER.description}
        route={SKIN_BANNER.route}
        emoji={SKIN_BANNER.emoji}
      />
      <MemoizedSelectedOptions request={request} />
      
      <div className="bg-card rounded-2xl shadow-lg p-6">
        {/* Отображение ошибок */}
        {/* {error && (
          <div className="mb-6">
            <ErrorDisplay
              error={error}
              onRetry={handleRetry}
              onDismiss={clearError}
            />
          </div>
        )} */}

        {/* Навигация */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 mb-6 md:mb-8 p-2 sm:p-1 bg-muted rounded-xl">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-all flex-1 justify-center text-sm sm:text-base ${
                activeSection === section.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {section.icon}
              <span className="font-medium">{section.label}</span>
            </button>
          ))}
        </div>

        {/* Активная секция */}
        <div className="mb-6 min-h-[300px]">
          {activeSection === 'skinType' && (
            <SkinTypeSection request={request} onChange={updateRequest} />
          )}
          {activeSection === 'concerns' && (
            <ConcernsSection request={request} onChange={updateRequest} />
          )}
          {activeSection === 'productType' && (
            <ProductTypeSection request={request} onChange={updateRequest} />
          )}
          {activeSection === 'filters' && (
            <FiltersSection request={request} onChange={updateRequest} />
          )}
        </div>

        {/* Кнопка */}
        <div className="text-center">
          <button
            onClick={() => handleGenerate()}
            disabled={!isValid || isLoading}
            className={`
              w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg transition-all duration-300 transform
              ${isValid && !isLoading
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
              } ${isLoading ? 'opacity-70' : ''}
            `}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2 justify-center">
                <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                <span>Подбираем средство...</span>
              </div>
            ) : (
              '✨ ПОДОБРАТЬ СРЕДСТВО'
            )}
          </button>

          {!isValid && (
            <p className="text-sm text-muted-foreground mt-3">
              Выберите тип кожи и проблемы кожи для подбора
            </p>
          )}
        </div>
      </div>

      {/* Лоадер */}
      <div ref={loaderContainerRef}>
        <UniversalLoader
          isVisible={isLoading}
          title="Подбираем уходовые средства"
          message="Анализируем ваш тип кожи и потребности..."
        />
      </div>

      <div ref={errorContainerRef} className="scroll-mt-24">
        {error && (
          <ErrorDisplay
            error={error}
            onRetry={handleGenerate}
            onDismiss={clearError}
            module='skincare'
          />
        )}
      </div>

      {/* Результаты */}
      <div ref={resultsContainerRef} className="scroll-mt-24">
        {result && !isLoading && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-5 duration-400">
            <MemoizedSkincareResult
              response={result}
              onGenerateAnother={(excludeTitle) => {
                console.log('🔄 Запрос другого варианта');
                handleGenerate(excludeTitle);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}