// src/components/shared/Tag.tsx
'use client';

import { X, LucideIcon } from 'lucide-react';

interface TagProps {
  label: string;
  icon?: LucideIcon | React.ReactNode;
  color?: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'pink' | 'cyan' | 'yellow';
  removable?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Tag({ 
  label, 
  icon: IconComponent,
  color = 'blue',
  removable = false,
  onRemove,
  onClick,
  className = '',
  size = 'md'
}: TagProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    green: 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200',
    red: 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200',
    purple: 'bg-purple-50 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    orange: 'bg-orange-50 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    pink: 'bg-pink-50 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    cyan: 'bg-cyan-50 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    yellow: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  const iconSize = {
    sm: 10,
    md: 12,
    lg: 14,
  };

  return (
    <span
      className={`
        ${colorClasses[color]}
        ${sizeClasses[size]}
        rounded-full
        font-medium
        flex items-center space-x-1.5
        flex-shrink-0
        ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {IconComponent && (
        typeof IconComponent === 'function' ? 
          <IconComponent size={iconSize[size]} className="flex-shrink-0" /> :
          IconComponent
      )}
      <span className="truncate">{label}</span>
      {removable && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 hover:opacity-70 flex items-center justify-center"
          aria-label="Удалить"
        >
          <X size={iconSize[size] - 2} />
        </button>
      )}
    </span>
  );
}