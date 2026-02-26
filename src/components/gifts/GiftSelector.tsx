// D:\МАЙО\JavaScript\ПРОЕКТЫ\РЕШИ ЗА МЕНЯ\reshi-za-menya\src\components\gifts\GiftSelector.tsx

'use client';
import React, { useState, useEffect, useRef } from 'react';
import { GiftRequest, GiftResponse } from '@/types/gifts';
import { useGiftsForm } from '@/hooks/gifts/useGiftsForm';
import { useGiftsApi } from '@/hooks/gifts/useGiftsApi';
import {
  SelectedOptions,
  CategorySection,
  CharacteristicsSection,
  FiltersSection,
  GiftResult
} from '@/components/gifts';
import { User, FileText, Settings } from 'lucide-react';
import { UniversalLoader } from '@/components/ui/UniversalLoader';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { PromotionalBanner } from '@/components/ui/shared';
import { GIFT_BANNER } from '@/constants/gifts.constants';

// Мемоизируем компоненты
const MemoizedCategorySection = React.memo(CategorySection);
const MemoizedCharacteristicsSection = React.memo(CharacteristicsSection);
const MemoizedFiltersSection = React.memo(FiltersSection);
const MemoizedSelectedOptions = React.memo(SelectedOptions);
const MemoizedGiftResult = React.memo(GiftResult);

interface GiftGeneratorProps {
  onGiftGenerated?: (gift: GiftResponse) => void;
  onRequestChange?: (request: GiftRequest) => void;
  currentRequest?: GiftRequest;
}

function GiftSelector({
  onGiftGenerated,
  onRequestChange,
  currentRequest = {},
}: GiftGeneratorProps) {
  // Хуки
  const { request, updateRequest, isValid } = useGiftsForm(currentRequest);
  const { generateGift, isLoading, error, clearError } = useGiftsApi({
    onSuccess: (response) => {
      setCurrentGift(response);
      onGiftGenerated?.(response);
    },
    onError: (error) => {
      console.error('Error in gift generation:', error);
    }
  });

  // Состояния
  const [currentGift, setCurrentGift] = useState<GiftResponse | null>(null);
  const [activeSection, setActiveSection] = useState<'category' | 'characteristics' | 'filters'>('category');

  // Refs для скролла
  const loaderContainerRef = useRef<HTMLDivElement>(null);
  const errorContainerRef = useRef<HTMLDivElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Уведомляем родителя об изменениях запроса
  useEffect(() => {
    onRequestChange?.(request);
  }, [request, onRequestChange]);

  // Скролл к лоадеру
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

  // Скролл к результатам
  useEffect(() => {
    if (currentGift && resultsContainerRef.current) {
      setTimeout(() => {
        resultsContainerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  }, [currentGift]);

  const handleGenerate = async (excludeTitle?: string) => {
    // Защита от события
    if (excludeTitle && typeof excludeTitle !== 'string') {
      console.warn('🚨 Gifts: excludeTitle не строка! Очищаем');
      excludeTitle = undefined;
    }

    if (!isValid() || isLoading) return;

    // Очищаем предыдущий результат
    setCurrentGift(null);
    clearError();

    try {
      await generateGift(request, excludeTitle);
    } catch (error) {
      console.error('❌ Ошибка генерации подарка:', error);
    }
  };

  const handleRetry = () => {
    handleGenerate();
  };

  // Секции навигации
  const sections = [
    { id: 'category' as const, label: 'Кому дарим', icon: <User size={16} /> },
    { id: 'characteristics' as const, label: 'О человеке', icon: <FileText size={16} /> },
    { id: 'filters' as const, label: 'Фильтры', icon: <Settings size={16} /> }
  ];

  return (
    <div className="space-y-6">
      <PromotionalBanner
        title={GIFT_BANNER.title}
        description={GIFT_BANNER.description}
        route={GIFT_BANNER.route}
        emoji={GIFT_BANNER.emoji}
      />

      <MemoizedSelectedOptions request={request} />

      <div className="bg-card rounded-2xl shadow-lg p-6">
        {/* Ошибки */}
        <div ref={errorContainerRef} className="scroll-mt-24">
          {error && (
            <div className="mb-6">
              <ErrorDisplay
                error={error}
                onRetry={handleRetry}
                onDismiss={clearError}
                module="gifts"
              />
            </div>
          )}
        </div>

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
          {activeSection === 'category' && (
            <MemoizedCategorySection
              request={request}
              onChange={updateRequest}
            />
          )}
          {activeSection === 'characteristics' && (
            <MemoizedCharacteristicsSection
              request={request}
              onChange={updateRequest}
            />
          )}
          {activeSection === 'filters' && (
            <MemoizedFiltersSection
              request={request}
              onChange={updateRequest}
            />
          )}
        </div>

        {/* Кнопка генерации */}
        <div className="text-center">
          <button
            onClick={() => handleGenerate()}
            disabled={!isValid() || isLoading}
            className={`
              w-full sm:w-auto
              px-6 py-3 md:px-8 md:py-4
              rounded-xl md:rounded-2xl
              font-bold
              text-base md:text-lg
              transition-all duration-300 transform
              ${isValid() && !isLoading
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
              }
              ${isLoading ? 'opacity-70' : ''}
            `}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2 justify-center">
                <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                <span>Подбираем подарок...</span>
              </div>
            ) : (
              '🎁 РЕШИТЬ ЗА МЕНЯ!'
            )}
          </button>

          {!isValid() && (
            <p className="text-sm text-muted-foreground mt-3">
              Выберите кому дарим, повод и бюджет для генерации подарка
            </p>
          )}
        </div>
      </div>

      {/* Лоадер */}
      <div ref={loaderContainerRef}>
        <UniversalLoader
          isVisible={isLoading}
          title="Подбираем идеальный подарок"
          message="Анализируем ваши параметры и находим лучшие варианты..."
        />
      </div>

      {/* Результаты с анимацией как в skincare */}
      <div 
        ref={resultsContainerRef} 
        className="scroll-mt-24"
      >
        {currentGift && !isLoading && (
          <div 
            className="
              mt-8
              animate-in
              fade-in
              slide-in-from-bottom-5
              duration-400
            "
          >
            <MemoizedGiftResult
              gift={currentGift}
              onSave={() => {
                console.log('Сохранение подарка:', currentGift);
                // Здесь будет логика сохранения
              }}
              onGenerateAnother={(excludeTitle) => {
                console.log('🔄 Запрос другого варианта для:', excludeTitle);
                handleGenerate(excludeTitle);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(GiftSelector);