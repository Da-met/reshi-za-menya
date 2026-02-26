// src/components/collections/adapters/GiftCollectionCard.tsx
'use client';

import { GiftProductCard } from '@/components/gifts/GiftProductCard';
import type { GiftResponse } from '@/types/gifts';

interface Props {
  data: GiftResponse['gift'];
}

export function GiftCollectionCard({ data }: Props) {
  return <GiftProductCard gift={data} showPurchaseButtons={false} />;
}