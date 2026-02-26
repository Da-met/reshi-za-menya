// src/hooks/usePromotionalBanner.ts
'use client';

import { useMemo } from 'react';
import { getPrimaryBanner, getVariantBanner, ModuleType } from '@/config/banners';

interface UsePromotionalBannerOptions {
  module: ModuleType;
  userId?: string;               // Для персонализации
  useABTesting?: boolean;        // Включить A/B тесты
}

export function usePromotionalBanner({
  module,
  userId,
  useABTesting = false
}: UsePromotionalBannerOptions) {
  const banner = useMemo(() => {
    if (useABTesting) {
      return getVariantBanner(module, userId);
    }
    return getPrimaryBanner(module);
  }, [module, userId, useABTesting]);

  const hasBanner = !!banner;

  return {
    banner,
    hasBanner,
    // Дополнительные данные для аналитики
    bannerId: banner?.id,
    bannerVariant: banner?.variant
  };
}