// D:\МАЙО\JavaScript\ПРОЕКТЫ\РЕШИ ЗА МЕНЯ\reshi-za-menya\src\components\movies\MovieOptionTag.tsx
'use client';

import { Users, Smile, Film, Clock, Calendar, Globe, Star, Clapperboard, X } from 'lucide-react';

interface MovieOptionTagProps {
  label: string;
  value: string;
  type: 'context' | 'mood' | 'genre' | 'format' | 'duration' | 'year' | 'country' | 'rating';
  onRemove?: () => void;
  showRemove?: boolean;
}

const typeConfig = {
  context: { icon: Users, bgColor: 'bg-blue-50', textColor: 'text-blue-800' },
  mood: { icon: Smile, bgColor: 'bg-purple-50', textColor: 'text-purple-800' },
  genre: { icon: Film, bgColor: 'bg-green-50', textColor: 'text-green-800' },
  format: { icon: Clapperboard, bgColor: 'bg-orange-50', textColor: 'text-orange-800' },
  duration: { icon: Clock, bgColor: 'bg-red-50', textColor: 'text-red-800' },
  year: { icon: Calendar, bgColor: 'bg-pink-50', textColor: 'text-pink-800' },
  country: { icon: Globe, bgColor: 'bg-cyan-50', textColor: 'text-cyan-800' },
  rating: { icon: Star, bgColor: 'bg-yellow-50', textColor: 'text-yellow-800' },
};

export function MovieOptionTag({ label, value, type, onRemove, showRemove = false }: MovieOptionTagProps) {
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
        >
          <X size={10} />
        </button>
      )}
    </span>
  );
}