// D:\МАЙО\JavaScript\ПРОЕКТЫ\РЕШИ ЗА МЕНЯ\reshi-za-menya\src\components\gifts\OptionTag.tsx

'use client';
import { 
  User, Briefcase, Heart, Calendar, DollarSign, Cake, Gift, X, 
  Package, Ticket, Hammer, LucideIcon 
} from 'lucide-react';
import React from 'react';

interface OptionTagProps {
  label: string;
  value: string;
  type: 'category' | 'profession' | 'interest' | 'personality' | 'budget' | 'age' | 'occasion' | 'giftType';
  onRemove?: () => void;
  showRemove?: boolean;
}

// Тип для конфигурации
interface TypeConfig {
  icon: LucideIcon;
  bgColor: string;
  getIcon?: (value: string) => LucideIcon; // 👈 делаем опциональным
}

// Типизируем конфиг
const typeConfig: Record<OptionTagProps['type'], TypeConfig> = {
  category: { 
    icon: User, 
    bgColor: 'bg-section-development/20 text-section-development' 
  },
  profession: { 
    icon: Briefcase, 
    bgColor: 'bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
  },
  interest: { 
    icon: Heart, 
    bgColor: 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200' 
  },
  personality: { 
    icon: User, 
    bgColor: 'bg-purple-50 text-purple-800 dark:bg-purple-900 dark:text-purple-200' 
  },
  budget: { 
    icon: DollarSign, 
    bgColor: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' 
  },
  age: { 
    icon: Cake, 
    bgColor: 'bg-pink-50 text-pink-800 dark:bg-pink-900 dark:text-pink-200' 
  },
  occasion: { 
    icon: Calendar, 
    bgColor: 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200' 
  },
  giftType: { 
    icon: Gift, // 👈 иконка по умолчанию
    bgColor: 'bg-cyan-50 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    // 👇 специальная функция для выбора иконки
    getIcon: (value: string) => {
      switch (value) {
        case 'thing': return Package;
        case 'experience': return Ticket;
        case 'handmade': return Hammer;
        default: return Gift;
      }
    }
  },
};

export function OptionTagComponent({ label, type, value, onRemove, showRemove = false }: OptionTagProps) {
  const config = typeConfig[type];
  
  // Выбираем иконку: если есть getIcon, используем его, иначе берем icon по умолчанию
  const Icon = config.getIcon ? config.getIcon(value) : config.icon;

  return (
    <span className={`
      ${config.bgColor}
      px-3 py-1
      rounded-full
      text-xs md:text-sm
      font-medium
      flex items-center space-x-1.5
      flex-shrink-0
      transition-all duration-200
    `}>
      <Icon size={12} className="flex-shrink-0" />
      <span>{label}</span>
      {showRemove && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors ml-1"
          aria-label="Удалить"
        >
          <X size={10} />
        </button>
      )}
    </span>
  );
}

export const OptionTag = React.memo(OptionTagComponent);