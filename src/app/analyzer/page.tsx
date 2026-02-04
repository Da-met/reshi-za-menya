// /app/analyzer/page.tsx
'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AnalyzerSelector } from '@/components/analyzer/AnalyzerSelector';
import { AnalyzerResult } from '@/components/analyzer/AnalyzerResult';
import { AnalysisResponse, AnalyzerRequest } from '@/types/analyzer';
import { SavedAnalysis } from '@/components/analyzer/SavedAnalysis';


function AnalyzerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentView, setCurrentView] = useState<'analyzer' | 'saved'>('analyzer');
  const [currentResult, setCurrentResult] = useState<AnalysisResponse | null>(null);
  const [currentRequest, setCurrentRequest] = useState<AnalyzerRequest>({ productName: '' });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // При загрузке проверяем параметр URL
  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'saved') {
      setCurrentView('saved');
    }
  }, [searchParams]);

  // Функция для переключения вкладок с обновлением URL
  const handleViewChange = (view: 'analyzer' | 'saved') => {
    setCurrentView(view);
    const newParams = new URLSearchParams(searchParams.toString());
    if (view === 'saved') {
      newParams.set('view', 'saved');
    } else {
      newParams.delete('view');
    }
    router.replace(`/analyzer?${newParams.toString()}`, { scroll: false });
  };

  const handleResultGenerated = (result: AnalysisResponse) => {
    setCurrentResult(result);
  };

  const handleClearResult = () => {
    setCurrentResult(null);
  };

  const handleRequestChange = (request: AnalyzerRequest) => {
    setCurrentRequest(request);
  };

  const handleSaveAnalysis = () => {
    console.log('Сохранение анализа:', currentResult);
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
            Разбери состав косметики
          </h1>
          <p className="
            text-base md:text-lg lg:text-xl
            text-muted-foreground
            mb-6 md:mb-8
            max-w-2xl
            mx-auto
          ">
            Узнай, что на самом деле в твоих средствах для ухода
          </p>
          
          {/* Переключение между вкладками */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-6 md:mb-8">
            <button
              onClick={() => handleViewChange('analyzer')}
              className={`
                px-5 py-3 md:px-6 md:py-3
                rounded-full
                font-medium
                transition-all
                text-sm md:text-base
                cursor-pointer
                ${currentView === 'analyzer'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
                }
              `}
            >
              🧪 Анализатор
            </button>
            <button
              onClick={() => handleViewChange('saved')}
              className={`
                px-5 py-3 md:px-6 md:py-3
                rounded-full
                font-medium
                transition-all
                text-sm md:text-base
                cursor-pointer
                ${currentView === 'saved'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
                }
              `}
            >
              💾 Мои анализы
            </button>
          </div>
        </div>
        {currentView === 'analyzer' ? (
          <>
            <AnalyzerSelector
              onResultGenerated={handleResultGenerated}
              isAnalyzing={isAnalyzing}
              onAnalyzingChange={setIsAnalyzing}
              onRequestChange={handleRequestChange}
              currentRequest={currentRequest}
              onClearResult={handleClearResult}
            />
            
            {currentResult && (
              <AnalyzerResult
                result={currentResult}
                onSave={handleSaveAnalysis}
                onAnalyzeAnother={() => setCurrentResult(null)}
              />
            )}
          </>
        ) : (
          <SavedAnalysis />
        )}
      </div>
    </div>
  );
}

export default function AnalyzerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    }>
      <AnalyzerContent />
    </Suspense>
  );
}