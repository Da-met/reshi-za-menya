'use client';

import React from 'react';
import { X } from 'lucide-react';
import { typeConfig } from '@/constants/movies.constants';


interface MovieOptionTagProps {
  label: string;
  value: string;
  type: 'context' | 'mood' | 'genre' | 'format' | 'duration' | 'year' | 'country' | 'rating';
  onRemove?: () => void;
  showRemove?: boolean;
}



function MovieOptionTagComponent({ 
  label, 
  type, 
  onRemove, 
  showRemove = false 
}: MovieOptionTagProps) {
  const { icon: Icon, bgColor, textColor } = typeConfig[type];

  return (
    <span className={`
      ${bgColor} ${textColor}
      px-2 py-1 md:px-3 md:py-1
      rounded-full
      text-xs md:text-sm
      font-medium
      flex items-center space-x-1
      flex-shrink-0
      transition-all duration-200
    `}>
      <Icon size={12} className="md:size-[14px] flex-shrink-0" />
      <span className="truncate">{label}</span>
      {showRemove && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-black/10 transition-colors"
          aria-label="Удалить"
        >
          <X size={10} />
        </button>
      )}
    </span>
  );
}

export const MovieOptionTag = React.memo(MovieOptionTagComponent);