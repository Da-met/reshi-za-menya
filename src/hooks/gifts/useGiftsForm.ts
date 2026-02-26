// D:\МАЙО\JavaScript\ПРОЕКТЫ\РЕШИ ЗА МЕНЯ\reshi-za-menya\src\hooks\gifts\useGiftsForm.ts
'use client';

import { useState, useCallback } from 'react';
import { GiftRequest } from '@/types/gifts';

export function useGiftsForm(initialRequest: GiftRequest = {}) {
  const [request, setRequest] = useState<GiftRequest>({
    recipient_type: 'friend',
    gift_occasion: 'Без повода',
    budget: '1000-3000₽',
    ...initialRequest
  });

  const updateRequest = useCallback((updates: Partial<GiftRequest>) => {
    setRequest(prev => ({ ...prev, ...updates }));
  }, []);

  const isValid = useCallback(() => {
    const hasRecipient = !!request.recipient_type;
    const hasOccasion = !!request.gift_occasion;
    const hasBudget = !!request.budget;
    return hasRecipient && hasOccasion && hasBudget;
  }, [request]);

  const resetRequest = useCallback(() => {
    setRequest({
      recipient_type: 'friend',
      gift_occasion: 'Без повода',
      budget: '1000-3000₽'
    });
  }, []);

  return {
    request,
    updateRequest,
    isValid,
    resetRequest
  };
}