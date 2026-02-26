// src/components/collections/adapters/FoodCollectionCard.tsx
'use client';

import { FoodRecipeCard } from '@/components/food/FoodRecipeCard';
import type { FoodResponse } from '@/types/food';

interface Props {
  data: FoodResponse['recipe'];
}

export function FoodCollectionCard({ data }: Props) {
  // Просто передаем данные в существующий компонент
  return <FoodRecipeCard recipe={data} />;
}