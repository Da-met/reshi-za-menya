'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useThemeStore } from '@/stores/theme-store';

interface ModuleCardProps {
  title: string;
  description: string;
  href: string;
  moduleType: 'recipes' | 'gifts' | 'coming-soon';
  icon: string;
  colorScheme: 'primary' | 'inverted';
}

export function ModuleCard({ title, description, href, moduleType, icon, colorScheme }: ModuleCardProps) {
  const { theme } = useThemeStore();

  const isComingSoon = moduleType === 'coming-soon';

  // Путь к изображению в зависимости от темы
  const imagePath = isComingSoon 
    ? `/images/themes/${theme}/coming-soon.svg`
    : `/images/themes/${theme}/${icon}.svg`;

  // Цвета для карточек
  const getCardColors = () => {
    if (isComingSoon) {
      return {
        bg: 'bg-transparent',
        text: 'text-muted-foreground',
        border: 'border-dashed border-muted-foreground/30',
        buttonText: 'text-muted-foreground' // Цвет текста как у заголовка
      };
    }

    if (colorScheme === 'primary') {
      return {
        bg: 'bg-primary',
        text: 'text-primary-foreground',
        border: 'border-primary',
        buttonText: 'text-primary-foreground' // Цвет текста как у заголовка
      };
    } else {
      return {
        bg: 'bg-primary-foreground',
        text: 'text-primary',
        border: 'border-primary-foreground', 
        buttonText: 'text-primary' // Цвет текста как у заголовка
      };
    }
  };

  const colors = getCardColors();

  return (
    <Link 
      href={href}
      className={`
        group
        ${colors.bg}
        ${colors.text}
        border-2
        ${colors.border}
        rounded-xl
        overflow-hidden
        shadow-lg
        hover:shadow-xl
        transition-all
        duration-200
        hover:scale-105
        block
        h-full
        flex flex-col
        ${isComingSoon ? 'cursor-default' : 'cursor-pointer'}
        transform-gpu
        will-change-transform
      `}
    >
      
      {/* Вся основная карточка */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Заголовок */}
        <h3 className="
          font-bold
          text-center
          text-xl md:text-2xl lg:text-3xl
          flex-shrink-0
        ">
          {title}
        </h3>
        
        {/* Изображение */}
        <div className="flex-1 flex items-center justify-center p-4"> 
          {isComingSoon ? (
            <div className="text-center text-muted-foreground">
              <p className="text-sm md:text-base font-medium">В разработке</p>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={imagePath}
                alt={title}
                width={400}
                height={400}
                className="object-contain transition-transform duration-200 group-hover:scale-110 
                          w-full h-full 
                          min-h-[180px]  // Минимальная высота на мобильных
                          max-w-[90vw]   // 90% ширины экрана на мобильных
                          max-h-[50vh]   // 50% высоты экрана на мобильных
                          md:min-h-0 
                          md:max-w-[280px] md:max-h-[280px]
                          lg:max-w-[320px] lg:max-h-[320px]"
                priority={true}
              />
            </div>
          )}
        </div>

        {/* Кнопка с описанием */}
        <div className={`
          ${colors.buttonText} /* Только цвет текста, без фона */
          rounded-2xl
          min-h-[60px] /* Сохраняем фиксированную высоту */
          flex
          items-center
          justify-center
          text-center
          mx-2
          transition-all
          duration-200
          border-2 border-transparent /* Прозрачная граница для сохранения размера */
        `}>
          <p className="
            text-sm md:text-base
            font-medium
          ">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}