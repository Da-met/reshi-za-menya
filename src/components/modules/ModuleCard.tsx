// src/components/modules/ModuleCard.tsx - СОХРАНЯЕМ РАЗМЕР КАРТИНОК
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useThemeStore } from '@/stores/theme-store';

interface ModuleCardProps {
  title: string;
  description: string;
  href: string;
  icon: string;
  colorScheme: 'primary' | 'inverted';
  badge?: string;
  cardStatus?: 'active' | 'coming-soon';
}

export function ModuleCard({ 
  title, 
  description, 
  href, 
  icon, 
  colorScheme, 
  badge,
  cardStatus = 'active'
}: ModuleCardProps) {
  const { theme } = useThemeStore();

  const isComingSoon = cardStatus === 'coming-soon';

  const imagePath = isComingSoon 
    ? `/images/themes/${theme}/coming-soon.svg`
    : `/images/themes/${theme}/${icon}.svg`;

  const getCardColors = () => {
    if (isComingSoon) {
      return {
        bg: 'bg-transparent',
        text: 'text-muted-foreground',
        border: 'border-dashed border-muted-foreground/30',
        buttonText: 'text-muted-foreground'
      };
    }

    if (colorScheme === 'primary') {
      return {
        bg: 'bg-primary',
        text: 'text-primary-foreground',
        border: 'border-primary',
        buttonText: 'text-primary-foreground'
      };
    } else {
      return {
        bg: 'bg-primary-foreground',
        text: 'text-primary',
        border: 'border-primary-foreground', 
        buttonText: 'text-primary'
      };
    }
  };

  const colors = getCardColors();

  return (
    <div className="h-full flex"> {/* ВАЖНО: flex контейнер */}
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
          flex-1 /* Занимает всю доступную высоту */
          flex flex-col
          ${isComingSoon ? 'cursor-default' : 'cursor-pointer'}
          transform-gpu
          will-change-transform
          relative
          w-full
        `}
      >
        {/* Бейдж */}
        {badge && (
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
            <span className={`
              px-2 py-0.5 sm:px-3 sm:py-1 text-xs font-bold rounded-full
              ${colorScheme === 'primary' 
                ? 'bg-white/20 text-white' 
                : 'bg-black/20 text-primary'
              }
            `}>
              {badge}
            </span>
          </div>
        )}
        
        {/* Вся основная карточка */}
        <div className="
          p-4
          md:p-6
          flex-1 flex flex-col
        ">
          {/* Заголовок - ФИКСИРОВАННАЯ высота для всех */}
          <div className="
            flex-shrink-0
            mb-2
            flex items-center justify-center
            min-h-[48px] /* Фиксированная минимальная высота для заголовка */
            md:min-h-[70px]
            lg:min-h-[90px]
          ">
            <h3 className="
              text-center
              text-4xl /* 36px на очень маленьких */
              sm:text-[2.8rem] /* 44.8px на мобильных */
              md:text-[2.6rem] /* 41.6px на таблетках */
              lg:text-[3.3rem] /* 52.8px на десктопе */
              leading-[0.7]
              px-2
              md:px-0
            ">
              {title}
            </h3>
          </div>
          
          {/* Изображение - ВАШ ОРИГИНАЛЬНЫЙ РАЗМЕР */}
          <div className="
            flex-1 /* Растягивается между заголовком и описанием */
            flex items-center justify-center
            p-4 /* Ваш оригинальный отступ */
          "> 
            {isComingSoon ? (
              <div className="text-center text-muted-foreground">
                <p className="text-sm md:text-base font-medium">В разработке</p>
              </div>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={imagePath}
                  alt={title}
                  width={400}
                  height={400}
                  className="
                    object-contain 
                    transition-transform duration-200 group-hover:scale-110 
                    mx-auto
                    /* ВАШ ОРИГИНАЛЬНЫЙ РАЗМЕР КАРТИНОК: */
                    w-full h-full 
                    min-h-[180px]
                    max-w-[90vw]
                    max-h-[50vh]
                    md:min-h-0 
                    md:max-w-[280px] md:max-h-[280px]
                    lg:max-w-[320px] lg:max-h-[320px]
                  "
                  priority={true}
                />
              </div>
            )}
          </div>

          {/* Кнопка с описанием - Текст не обрезается */}
          <div className={`
            ${colors.buttonText}
            rounded-2xl
            h-auto /* Автоматическая высота вместо фиксированной */
            min-h-[35px] /* Минимальная высота */
            md:min-h-[50px] 
            lg:min-h-[60px]
            flex
            items-center
            justify-center
            text-center
            mx-1
            md:mx-2
            mt-2
            px-3
            md:px-4
            transition-all
            duration-200
            border-2 border-transparent
            flex-shrink-0
          `}>
            <p className="
              text-s
              md:text-base
              font-medium
              px-1
              md:px-2
              py-1 
            ">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}