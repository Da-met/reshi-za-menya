'use client';

import { User, Briefcase, Heart, Calendar, DollarSign, Cake, Gift, X } from 'lucide-react';

interface OptionTagProps {
  label: string;
  value: string;
  type: 'category' | 'profession' | 'interest' | 'personality' | 'budget' | 'age' | 'occasion' | 'giftType';
  onRemove?: () => void;
  showRemove?: boolean;
}

const typeConfig = {
  category: { icon: User, bgColor: 'bg-section-development/20', textColor: 'text-section-development' },
  profession: { icon: Briefcase, bgColor: 'bg-blue-50', textColor: 'text-blue-800' },
  interest: { icon: Heart, bgColor: 'bg-green-50', textColor: 'text-green-800' },
  personality: { icon: User, bgColor: 'bg-purple-50', textColor: 'text-purple-800' },
  budget: { icon: DollarSign, bgColor: 'bg-orange-50', textColor: 'text-orange-800' },
  age: { icon: Cake, bgColor: 'bg-pink-50', textColor: 'text-pink-800' },
  occasion: { icon: Calendar, bgColor: 'bg-red-50', textColor: 'text-red-800' },
  giftType: { icon: Gift, bgColor: 'bg-cyan-50', textColor: 'text-cyan-800' },
};

export function OptionTag({ label, value, type, onRemove, showRemove = false }: OptionTagProps) {
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