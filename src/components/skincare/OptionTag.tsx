'use client';

import { Droplets, AlertCircle, Filter, DollarSign, Cake, Sun, Tag } from 'lucide-react';

interface OptionTagProps {
  label: string;
  value: string;
  type: 'skinType' | 'concern' | 'productType' | 'budget' | 'ageGroup' | 'spf' | 'brand';
}

const typeConfig = {
  skinType: { 
    icon: Droplets, 
    bgColor: 'bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  },
  concern: { 
    icon: AlertCircle, 
    bgColor: 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200'
  },
  productType: { 
    icon: Filter, 
    bgColor: 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200'
  },
  budget: { 
    icon: DollarSign, 
    bgColor: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  },
  ageGroup: { 
    icon: Cake, 
    bgColor: 'bg-purple-50 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  },
  spf: { 
    icon: Sun, 
    bgColor: 'bg-orange-50 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
  },
  brand: { 
    icon: Tag, 
    bgColor: 'bg-cyan-50 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200'
  },
};

export function OptionTag({ label, type }: OptionTagProps) {
  const { icon: Icon, bgColor } = typeConfig[type];

  return (
    <span className={`
      ${bgColor}
      px-3 py-1
      rounded-full
      text-sm
      font-medium
      flex items-center space-x-1.5
      flex-shrink-0
    `}>
      <Icon size={14} className="flex-shrink-0" />
      <span>{label}</span>
    </span>
  );
}