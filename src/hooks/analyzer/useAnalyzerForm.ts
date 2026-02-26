// src/hooks/analyzer/useAnalyzerForm.ts
'use client';

import { useState, useCallback, useMemo } from 'react';
import { AnalyzerRequest } from '@/types/analyzer';

export const useAnalyzerForm = (initialRequest?: Partial<AnalyzerRequest>) => {
  const [request, setRequest] = useState<AnalyzerRequest>(() => ({
    productName: '',
    ...initialRequest
  }));

  const updateRequest = useCallback((updates: Partial<AnalyzerRequest>) => {
    setRequest(prev => {
      // Проверяем, действительно ли есть изменения
      let hasChanges = false;
      
      for (const key in updates) {
        const typedKey = key as keyof AnalyzerRequest;
        const newValue = updates[typedKey];
        const oldValue = prev[typedKey];
        
        if (Array.isArray(newValue) && Array.isArray(oldValue)) {
          if (newValue.length !== oldValue.length ||
              !newValue.every((val, idx) => val === oldValue[idx])) {
            hasChanges = true;
            break;
          }
        } else if (typeof newValue === 'object' && newValue !== null && 
                   typeof oldValue === 'object' && oldValue !== null) {
          // Для объектов (preferences) делаем поверхностное сравнение
          const newPrefs = newValue as Record<string, boolean>;
          const oldPrefs = oldValue as Record<string, boolean>;
          
          for (const prefKey in newPrefs) {
            if (newPrefs[prefKey] !== oldPrefs?.[prefKey]) {
              hasChanges = true;
              break;
            }
          }
        } else if (newValue !== oldValue) {
          hasChanges = true;
          break;
        }
      }
      
      return hasChanges ? { ...prev, ...updates } : prev;
    });
  }, []);

  const resetRequest = useCallback(() => {
    setRequest({ productName: '' });
  }, []);

  const isValid = useMemo(() => {
    return !!request.productName?.trim();
  }, [request.productName]);

  return {
    request,
    updateRequest,
    resetRequest,
    isValid
  };
};