// src/components/common/PromoCard.tsx
'use client';

import Link from 'next/link';
import { useThemeStore } from '@/stores/theme-store';
import Image from 'next/image';

interface PromoCardProps {
  title: string;
  description: string;
  href: string;
  imagePath?: string;
  themeImage?: boolean;
  imageName?: string;
  bgColor?: 'primary' | 'secondary' | 'accent';
  height?: 'sm' | 'md' | 'lg';
}

export function PromoCard({ 
  title, 
  description, 
  href, 
  imagePath, 
  themeImage = false,
  imageName = 'gifts',
  bgColor = 'secondary',
  height = 'md'
}: PromoCardProps) {
  const { theme } = useThemeStore();
  
  const finalImagePath = themeImage 
    ? `/images/themes/${theme}/${imageName}.svg`
    : imagePath;

  const heightClasses = {
    sm: 'h-32',
    md: 'h-40',
    lg: 'h-48'
  };

  const bgColorClasses = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground', 
    accent: 'bg-accent text-accent-foreground'
  };

  return (
    <Link href={href} className="group block mb-6">
      <div className={`
        ${bgColorClasses[bgColor]}
        rounded-xl
        overflow-hidden
        shadow-lg
        hover:shadow-xl
        transition-all
        duration-200
        hover:scale-105
        flex
        cursor-pointer
        transform-gpu
        will-change-transform
        ${heightClasses[height]}
      `}>
        
        {/* Текстовая часть - ВСЕГДА СЛЕВА */}
        <div className="flex-1 flex flex-col justify-center p-6">
          <h3 className="
            text-lg md:text-xl
            mb-2
            leading-tight
            font-normal
          ">
            {title}
          </h3>
          
          <p className="
            text-xs md:text-sm
            opacity-90
            font-normal
            line-clamp-2
          ">
            {description}
          </p>
        </div>

        {/* Изображение - ВСЕГДА СПРАВА */}
        <div className="flex-shrink-0 w-2/5 md:w-1/3 relative overflow-hidden"> 
          {finalImagePath ? (
            <Image
              src={finalImagePath}
              width={0}
              height={0}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm">No image</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}