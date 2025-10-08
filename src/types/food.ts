export type InputMode = 'products' | 'dish';

export interface FoodRequest {
  mode: InputMode;
  products?: string[];
  dishName?: string;
  excludeIngredients?: string[];
  filters: {
    dishType?: string;
    cookingTime?: string;
    cuisine?: string;
    diet?: string;
    allergens?: string[];
    occasion?: string;
    difficulty?: string;
    cookingMethod?: string;
  };
}

export interface FoodResponse {
  recipe: {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    ingredients: {
      available: string[];
      toBuy: Array<{
        name: string;
        quantity?: string;
        category?: string;
      }>;
    };
    steps: string[];
    cookingTime: string;
    difficulty: string;
    nutritionInfo?: {
      calories?: string;
      protein?: string;
      carbs?: string;
      fats?: string;
    };
    tips?: string[];
  };
  generationId: string;
}

export interface SavedRecipe extends FoodResponse {
  savedAt: Date;
  note?: string;
}