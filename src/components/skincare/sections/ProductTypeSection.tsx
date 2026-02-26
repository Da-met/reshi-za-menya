'use client';

import React from 'react';
import { SkincareRequest } from '@/types/skincare';
import { PRODUCT_TYPES } from '@/constants/skincare.constants';

interface ProductTypeSectionProps {
  request: SkincareRequest;
  onChange: (updates: Partial<SkincareRequest>) => void;
}

function ProductTypeSectionComponent({ request, onChange }: ProductTypeSectionProps) {
  const handleProductTypeToggle = (type: string) => {
    // Если кликаем на уже выбранный тип - отменяем выбор
    if (request.desired_product_type === type) {
      onChange({
        ...request,
        desired_product_type: undefined
      });
    } else {
      // Иначе выбираем этот тип
      onChange({
        ...request,
        desired_product_type: type
      });
    }
  };

  return (
    <div>
      <h3 className="text-xl md:text-2xl lg:text-3xl font-accent mb-3 md:mb-4 text-foreground">
        Какое средство вы ищете?
      </h3>
      <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
        Выберите тип уходового средства
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
        {PRODUCT_TYPES.map((productType) => (
          <button
            key={productType.id}
            onClick={() => handleProductTypeToggle(productType.id)}
            className={`p-3 md:p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center space-y-1 md:space-y-2 ${
              request.desired_product_type === productType.id
                ? 'bg-primary border-primary text-primary-foreground shadow-md scale-105'
                : 'bg-card border-border text-foreground hover:border-primary hover:shadow-md'
            }`}
          >
            <span className="text-xl md:text-2xl">{productType.icon}</span>
            <span className="font-medium text-xs md:text-sm text-center">{productType.label}</span>
            <span className="text-xs text-muted-foreground text-center hidden sm:block">{productType.description}</span>
          </button>
        ))}
      </div>

      {request.desired_product_type && (
        <div className="mt-3 md:mt-4 p-2 md:p-3 bg-accent rounded-lg">
          <p className="text-xs md:text-sm text-accent-foreground">
            ✅ Выбрано: {PRODUCT_TYPES.find(t => t.id === request.desired_product_type)?.label}
          </p>
        </div>
      )}
    </div>
  );
}

export const ProductTypeSection = React.memo(ProductTypeSectionComponent);