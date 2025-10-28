'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { GiftGenerator } from '@/components/gifts/GiftGenerator';
import { GiftResult } from '@/components/gifts/GiftResult';
import { SavedGifts } from '@/components/gifts/SavedGifts';
import { GiftResponse, GiftRequest } from '@/types/gifts';

function GiftsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentView, setCurrentView] = useState<'generator' | 'saved'>('generator');
  const [currentGift, setCurrentGift] = useState<GiftResponse | null>(null);
  const [currentRequest, setCurrentRequest] = useState<GiftRequest>({});
  const [isGenerating, setIsGenerating] = useState(false);

  // При загрузке проверяем параметр URL
  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'saved') {
      setCurrentView('saved');
    }
  }, [searchParams]);

  // Функция для переключения вкладок с обновлением URL
  const handleViewChange = (view: 'generator' | 'saved') => {
    setCurrentView(view);
    const newParams = new URLSearchParams(searchParams.toString());
    if (view === 'saved') {
      newParams.set('view', 'saved');
    } else {
      newParams.delete('view');
    }
    router.replace(`/gifts?${newParams.toString()}`, { scroll: false });
  };

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
              onClick={() => handleViewChange('generator')}
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
              onClick={() => handleViewChange('saved')}
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

export default function GiftsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    }>
      <GiftsContent />
    </Suspense>
  );
}