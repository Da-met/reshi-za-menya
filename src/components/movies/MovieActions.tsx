'use client';

interface MovieActionsProps {
  isFormValid: boolean; // 👈 Должно быть boolean, а не boolean | undefined
  isGenerating: boolean;
  onGenerate: () => void;
  onLucky: () => void;
}

export function MovieActions({ 
  isFormValid, 
  isGenerating, 
  onGenerate, 
  onLucky 
}: MovieActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
      <button
        onClick={onGenerate}
        disabled={!isFormValid || isGenerating}
        className={`
          w-full sm:w-auto
          px-6 py-3 md:px-8 md:py-4 
          rounded-xl md:rounded-2xl 
          font-bold 
          text-base md:text-lg
          transition-all duration-300 transform
          ${isFormValid && !isGenerating
            ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer'
            : 'bg-muted text-muted-foreground cursor-not-allowed'
          }
          ${isGenerating ? 'opacity-70' : ''}
        `}
      >
        {isGenerating ? (
          <div className="flex items-center space-x-2 justify-center">
            <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            <span>Ищем фильмы...</span>
          </div>
        ) : (
          '🎬 РЕШИТЬ ЗА МЕНЯ!'
        )}
      </button>

      <button
        onClick={onLucky}
        disabled={isGenerating}
        className="
          w-full sm:w-auto
          px-4 py-3 md:px-6 md:py-3
          rounded-xl
          font-medium
          text-sm md:text-base
          bg-secondary text-secondary-foreground
          hover:bg-secondary/80
          transition-all
          flex items-center space-x-2 justify-center
        "
      >
        <span>🎲</span>
        <span>Мне повезет!</span>
      </button>
    </div>
  );
}

