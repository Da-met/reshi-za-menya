'use client';

import { useState } from 'react';
import { GiftGenerator } from '@/components/gifts/GiftGenerator';
import { GiftResult } from '@/components/gifts/GiftResult';
import { SavedGifts } from '@/components/gifts/SavedGifts';
import { GiftResponse, GiftRequest } from '@/types/gifts';

export default function GiftsPage() {
  const [currentView, setCurrentView] = useState<'generator' | 'saved'>('generator');
  const [currentGift, setCurrentGift] = useState<GiftResponse | null>(null);
  const [currentRequest, setCurrentRequest] = useState<GiftRequest>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGiftGenerated = (gift: GiftResponse) => {
    setCurrentGift(gift);
  };

  const handleClearGift = () => {
    setCurrentGift(null);
  };

  const handleRequestChange = (request: GiftRequest) => {
    setCurrentRequest(request);
  };

  const handleSaveGift = () => {
    console.log('Сохранение подарка:', currentGift);
    // Здесь будет логика сохранения
  };

  return (
    <div className="min-h-screen bg-background py-6 md:py-8 lg:py-10">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Заголовок и навигация */}
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <h1 className="
            text-4xl md:text-5xl lg:text-6xl  
            font-accent 
            text-foreground 
            mb-3 md:mb-4
          ">
            Что подарить?
          </h1>
          <p className="
            text-base md:text-lg lg:text-xl
            text-muted-foreground
            mb-6 md:mb-8
            max-w-2xl
            mx-auto
          ">
            Найдем идеальный подарок для любого человека и повода
          </p>
          
          {/* Переключение между вкладками */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-6 md:mb-8">
            <button
              onClick={() => setCurrentView('generator')}
              className={`
                px-5 py-3 md:px-6 md:py-3 
                rounded-full 
                font-medium 
                transition-all
                text-sm md:text-base
                ${currentView === 'generator'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
                }
              `}
            >
              🎁 Генератор подарков
            </button>
            <button
              onClick={() => setCurrentView('saved')}
              className={`
                px-5 py-3 md:px-6 md:py-3 
                rounded-full 
                font-medium 
                transition-all
                text-sm md:text-base
                ${currentView === 'saved'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
                }
              `}
            >
              💾 Мои подарки
            </button>
          </div>
        </div>

        {currentView === 'generator' ? (
          <>
            <GiftGenerator 
              onGiftGenerated={handleGiftGenerated}
              isGenerating={isGenerating}
              onGeneratingChange={setIsGenerating}
              onRequestChange={handleRequestChange}
              currentRequest={currentRequest}
              onClearGift={handleClearGift}
            />
            
            {currentGift && (
              <GiftResult
                gift={currentGift}
                onSave={handleSaveGift}
                onGenerateAnother={() => setCurrentGift(null)}
              />
            )}
          </>
        ) : (
          <SavedGifts />
        )}
      </div>
    </div>
  );
}