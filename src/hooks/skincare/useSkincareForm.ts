// src/hooks/skincare/useSkincareForm.ts
'use client';

import { useState, useCallback, useMemo } from 'react';
import { SkincareRequest } from '@/types/skincare';

export const useSkincareForm = (initialRequest?: Partial<SkincareRequest>) => {
  // Используем useReducer-like подход для предотвращения лишних ре-рендеров
  const [request, setRequest] = useState<SkincareRequest>(() => ({
    skin_type: 'normal',
    concerns: ['dullness'],
    ...initialRequest
  }));

  // Оптимизированный updateRequest с глубоким сравнением
  const updateRequest = useCallback((updates: Partial<SkincareRequest>) => {
    setRequest(prev => {
      // Проверяем, действительно ли есть изменения
      let hasChanges = false;
      
      for (const key in updates) {
        const typedKey = key as keyof SkincareRequest;
        const newValue = updates[typedKey];
        const oldValue = prev[typedKey];
        
        // Сравниваем массивы и примитивы
        if (Array.isArray(newValue) && Array.isArray(oldValue)) {
          if (newValue.length !== oldValue.length || 
              !newValue.every((val, idx) => val === oldValue[idx])) {
            hasChanges = true;
            break;
          }
        } else if (newValue !== oldValue) {
          hasChanges = true;
          break;
        }
      }
      
      // Возвращаем старый объект если изменений нет
      return hasChanges ? { ...prev, ...updates } : prev;
    });
  }, []);

  const resetRequest = useCallback(() => {
    setRequest({
      skin_type: 'normal',
      concerns: ['dullness']
    });
  }, []);

  // Оптимизируем проверку валидности
  const isValid = useMemo(() => {
    const hasSkinType = !!request.skin_type;
    const hasConcerns = Array.isArray(request.concerns) && request.concerns.length > 0;
    return hasSkinType && hasConcerns;
  }, [request.skin_type, request.concerns]);

  // Оптимизируем подсчет параметров
  const selectedCount = useMemo(() => {
    let count = 0;
    if (request.skin_type) count++;
    if (request.concerns?.length) count += request.concerns.length;
    if (request.desired_product_type) count++;
    if (request.budget) count++;
    if (request.age_group) count++;
    if (request.spf_needed !== undefined) count++;
    if (request.brand_preference?.length) count += request.brand_preference.length;
    return count;
  }, [
    request.skin_type,
    request.concerns,
    request.desired_product_type,
    request.budget,
    request.age_group,
    request.spf_needed,
    request.brand_preference
  ]);

  return {
    request,
    updateRequest,
    resetRequest,
    isValid,
    selectedCount
  };
};