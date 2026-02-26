// src/components/skincare/SelectedOptions.tsx
'use client';

import React from 'react';
import { SkincareRequest } from '@/types/skincare';
import { SkincareOptionTag } from './SkincareOptionTag';
import {
  skinTypeLabels,
  productTypeLabels,
  concernLabels,
  ageGroupLabels
} from '@/constants/skincare.constants';


interface SelectedOptionsProps {
  request: SkincareRequest;
}

export function SelectedOptionsComponent({ request }: SelectedOptionsProps) {
  // Считаем общее количество выбранных параметров
  const totalSelections =
    (request.skin_type ? 1 : 0) +
    (request.concerns?.length || 0) +
    (request.desired_product_type ? 1 : 0) +
    (request.budget ? 1 : 0) +
    (request.age_group ? 1 : 0) +
    (request.spf_needed !== undefined ? 1 : 0) +
    (request.brand_preference?.length || 0);

  if (totalSelections === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border-l-4 border-primary">
      <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-foreground">
        Вы выбрали:
      </h3>

      <div className="flex flex-wrap gap-2">
        {/* Тип кожи */}
        {request.skin_type && (
          <SkincareOptionTag
            type="skinType"
            label={skinTypeLabels[request.skin_type] || request.skin_type}
          />
        )}

        {/* Проблемы кожи */}
        {request.concerns?.map((concern) => (
          <SkincareOptionTag
            key={concern}
            type="concern"
            label={concernLabels[concern] || concern}
          />
        ))}

        {/* Тип продукта */}
        {request.desired_product_type && (
          <SkincareOptionTag
            type="productType"
            label={productTypeLabels[request.desired_product_type] || request.desired_product_type}
          />
        )}

        {/* Бюджет */}
        {request.budget && (
          <SkincareOptionTag
            type="budget"
            label={request.budget}
          />
        )}

        {/* Возрастная группа */}
        {request.age_group && (
          <SkincareOptionTag
            type="ageGroup"
            label={ageGroupLabels[request.age_group] || request.age_group}
          />
        )}

        {/* SPF */}
        {request.spf_needed !== undefined && (
          <SkincareOptionTag
            type="spf"
            label={request.spf_needed ? 'Нужен SPF' : 'Без SPF'}
          />
        )}

        {/* Предпочитаемые бренды */}
        {request.brand_preference?.map((brand) => (
          <SkincareOptionTag
            key={brand}
            type="brand"
            label={brand}
          />
        ))}
      </div>

      <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-border">
        <p className="text-xs md:text-sm text-muted-foreground">
          Выбрано параметров: <span className="font-semibold">{totalSelections}</span>
        </p>
      </div>
    </div>
  );
}

export const SelectedOptions = React.memo(SelectedOptionsComponent);