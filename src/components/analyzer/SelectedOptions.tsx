// components/analyzer/SelectedOptions.tsx
'use client';

import React from 'react';
import { AnalyzerRequest } from '@/types/analyzer';
import { Search } from 'lucide-react';


interface SelectedOptionsProps {
  request: AnalyzerRequest;
}

export function SelectedOptionsComponent({ request }: SelectedOptionsProps) {
  const hasSelections = request.productName;

  if (!hasSelections) {
    return null;
  }

  return (
    <div className="bg-card rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border-l-4 border-primary">
      <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-foreground">
        Вы выбрали:
      </h3>

      <div className="flex flex-wrap gap-1 md:gap-2">
        {/* Название продукта */}
        {request.productName && (
          <span className="
            bg-section-development/20 text-section-development
            px-2 py-1 md:px-3 md:py-1
            rounded-full
            text-xs md:text-sm
            font-medium
            flex items-center space-x-1
            flex-shrink-0
          ">
            <Search size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate max-w-[200px]">{request.productName}</span>
          </span>
        )}
      </div>

      {/* Счетчик выбранных параметров */}
      <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-border">
        <p className="text-xs md:text-sm text-muted-foreground">
          Готово к анализу
        </p>
      </div>
    </div>
  );
}

export const SelectedOptions = React.memo(SelectedOptionsComponent);
SelectedOptions.displayName = 'SelectedOptions';