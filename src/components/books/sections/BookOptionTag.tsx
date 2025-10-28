'use client';

import { Book, Users, Heart, Calendar, Globe } from 'lucide-react';

interface BookOptionTagProps {
  type: 'context' | 'mood' | 'genre' | 'format' | 'year' | 'country';
  label: string;
  value: string;
}

export function BookOptionTag({ type, label }: BookOptionTagProps) {
  const getIcon = () => {
    switch (type) {
      case 'context':
        return <Users size={12} />;
      case 'mood':
        return <Heart size={12} />;
      case 'genre':
        return <Book size={12} />;
      case 'format':
        return <Book size={12} />;
      case 'year':
        return <Calendar size={12} />;
      case 'country':
        return <Globe size={12} />;
      default:
        return null;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'context':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'mood':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'genre':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'format':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'year':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'country':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2 py-1 
        border rounded-full text-xs font-medium
        ${getColor()}
      `}
    >
      {getIcon()}
      {label}
    </span>
  );
}