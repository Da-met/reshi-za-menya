'use client';

import { Snowflake, ArrowRight } from 'lucide-react';

export function SeasonalBanner() {
  const handleBannerClick = () => {
    console.log('Открываем новогодние подборки');
    // Здесь будет логика открытия спец. подборок
  };

  return (
    <div 
      onClick={handleBannerClick}
      className="
        bg-gradient-to-r from-primary/90 to-secondary/90 
        text-primary-foreground 
        p-4 md:p-5 
        rounded-xl 
        mb-4 md:mb-6
        cursor-pointer
        transition-all
        duration-300
        hover:shadow-lg
        hover:scale-[1.02]
        active:scale-[0.98]
        group
      "
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 md:space-x-4">
          <Snowflake size={20} className="md:size-6 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-sm md:text-base lg:text-lg">
              Скоро Новый год!
            </h4>
            <p className="text-xs md:text-sm opacity-90 mt-0.5">
              Специальные подборки подарков
            </p>
          </div>
        </div>
        
        {/* Стрелка вместо кнопки */}
        <ArrowRight 
          size={18} 
          className="
            md:size-5 
            opacity-80 
            group-hover:opacity-100 
            group-hover:translate-x-1
            transition-all
            duration-300
            flex-shrink-0
          " 
        />
      </div>
    </div>
  );
}