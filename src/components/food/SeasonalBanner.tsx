'use client';

import { ChefHat, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SeasonalContent {
  title: string;
  description: string;
  emoji: string;
}

export function SeasonalBanner() {
  const [seasonalContent, setSeasonalContent] = useState<SeasonalContent>({
    title: "",
    description: "",
    emoji: ""
  });

  useEffect(() => {
    // Определяем текущий сезон
    const month = new Date().getMonth() + 1;
    let season = '';
    
    if (month >= 12 || month <= 2) season = 'winter';
    else if (month >= 3 && month <= 5) season = 'spring';
    else if (month >= 6 && month <= 8) season = 'summer';
    else season = 'autumn';

    const seasonalContentMap: Record<string, SeasonalContent> = {
      winter: {
        title: "Зимние рецепты для уюта",
        description: "Согревающие супы и горячие блюда",
        emoji: "🍲"
      },
      spring: {
        title: "Весенние свежие рецепты", 
        description: "Легкие салаты и блюда с первой зеленью",
        emoji: "🌱"
      },
      summer: {
        title: "Летние освежающие рецепты",
        description: "Холодные супы и салаты",
        emoji: "🍉"
      },
      autumn: {
        title: "Осенние уютные рецепты",
        description: "Блюда из сезонных овощей и грибов", 
        emoji: "🍂"
      }
    };

    const content = seasonalContentMap[season];
    if (content) {
      setSeasonalContent(content);
    }
  }, []);

  const handleBannerClick = () => {
    console.log('Открываем сезонные подборки рецептов');
    // Здесь будет логика открытия сезонных подборок
  };

  if (!seasonalContent.title) return null;

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
          <div className="flex items-center space-x-2">
            <span className="text-lg md:text-xl">{seasonalContent.emoji}</span>
            <ChefHat size={20} className="md:size-6 flex-shrink-0" />
          </div>
          <div>
            <h4 className="font-bold text-sm md:text-base lg:text-lg">
              {seasonalContent.title}
            </h4>
            <p className="text-xs md:text-sm opacity-90 mt-0.5">
              {seasonalContent.description}
            </p>
          </div>
        </div>
        
        {/* Стрелка как в подарках */}
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