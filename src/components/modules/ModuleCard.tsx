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
        buttonBg: 'bg-muted/50',
        buttonText: 'text-muted-foreground'
      };
    }

    if (colorScheme === 'primary') {
      return {
        bg: 'bg-primary',
        text: 'text-primary-foreground',
        border: 'border-primary',
        buttonBg: 'bg-primary-foreground', // Зеленый фон для кнопки
        buttonText: 'text-primary' // Розовый текст на кнопке
      };
    } else {
      return {
        bg: 'bg-primary-foreground',
        text: 'text-primary',
        border: 'border-primary-foreground', 
        buttonBg: 'bg-primary', // Розовый фон для кнопки
        buttonText: 'text-primary-foreground' // Зеленый текст на кнопке
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
        <div className="flex-1 flex items-center justify-center min-h-[200px] p-4 mb-4"> 
          {isComingSoon ? (
            <div className="text-center text-muted-foreground">
              <p className="text-sm md:text-base font-medium">В разработке</p>
            </div>
          ) : (
            <div className="relative w-full h-full max-w-[280px] max-h-[280px] md:max-w-[320px] md:max-h-[320px]">
              <Image
                src={imagePath}
                alt={title}
                width={320}
                height={320}
                className="object-contain transition-transform duration-200 group-hover:scale-110 w-full h-full"
                priority={true}
              />
            </div>
          )}
        </div>

        {/* Кнопка с описанием ВНУТРИ карточки */}
        <div className={`
          ${colors.buttonBg}
          ${colors.buttonText}
          rounded-2xl /* Скругленные углы */
          p-2 /* Внутренние отступы */
          min-h-[60px] /* Фиксированная высота */
          flex
          items-center
          justify-center
          text-center
          mx-2 /* Отступы от краев карточки */
          transition-all
          duration-200
          group-hover:shadow-md
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