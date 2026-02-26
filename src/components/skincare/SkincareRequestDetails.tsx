// src/components/skincare/SkincareRequestDetails.tsx
'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { SkincareOptionTag } from './SkincareOptionTag';
import type { SkincareRequest } from '@/types/skincare';
import { ageGroupLabels, concernLabels, productTypeLabels, skinTypeLabels } from '@/constants/skincare.constants';


interface SkincareRequestDetailsProps {
  request: SkincareRequest;
  createdAt?: Date;
  title?: string;
  className?: string;
  showDate?: boolean;
}


export function SkincareRequestDetailsComponent({ 
  request, 
  createdAt, 
  title = 'Детали запроса',
  className = '',
  showDate = true
}: SkincareRequestDetailsProps) {
  return (
    <div className={`bg-card rounded-2xl shadow-lg p-6 md:p-8 ${className}`}>
      <h2 className="text-lg md:text-xl text-foreground mb-4">{title}</h2>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Тип кожи */}
        {request.skin_type && (
          <SkincareOptionTag
            type="skinType"
            label={skinTypeLabels[request.skin_type] || request.skin_type}
          />
        )}
        
        {/* Тип продукта */}
        {request.desired_product_type && (
          <SkincareOptionTag
            type="productType"
            label={productTypeLabels[request.desired_product_type] || request.desired_product_type}
          />
        )}
        
        {/* Проблемы кожи */}
        {request.concerns?.map((concern, i) => (
          <SkincareOptionTag
            key={i}
            type="concern"
            label={concernLabels[concern] || concern}
          />
        ))}
        
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
        {request.brand_preference?.map((brand, i) => (
          <SkincareOptionTag
            key={i}
            type="brand"
            label={brand}
          />
        ))}
      </div>
      
      {showDate && createdAt && (
        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground pt-4 border-t border-border">
          <Clock size={12} />
          <span>Сохранено {createdAt.toLocaleDateString('ru-RU')}</span>
        </div>
      )}
    </div>
  );
}


export const SkincareRequestDetails = React.memo(SkincareRequestDetailsComponent);