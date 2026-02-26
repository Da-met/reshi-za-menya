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
    requestServings?: string;        // 👈 добавить
    healthGoal?: string;      // 👈 добавить
    calorieRange?: string;    // 👈 добавить
    excludeComposition?: string[]; // 👈 добавить
    diet?: string;
    allergens?: string[];
    occasion?: string;
    difficulty?: string;
    cookingMethod?: string;
  };
}

// Базовый тип для ингредиента
export interface IngredientItem {
  name: string;
  quantity?: string;
  category?: string;
}


// НОВЫЕ ТИПЫ ДЛЯ АДАПТАЦИОННЫХ ЗАМЕТОК
export interface AdaptationNote {
  type: 'key_ingredient_excluded' | 'ingredient_substitution' | 'diet_adaptation' | 'cooking_time_adjusted';
  message: string;
  original_ingredient?: string;
  suggested_alternatives?: string[];
  substituted_with?: string;
}

// НОВЫЙ ТИП ДЛЯ ЭФФЕКТИВНОСТИ ИНГРЕДИЕНТОВ
export interface IngredientEfficiency {
  available_used: string; // "85%"
  minimal_additional: string; // "только соль и перец"
}

export interface FoodResponse {
  recipe: {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    ingredients: {
      available: IngredientItem[];   // было: available_available? нет, так и оставляем!
      toBuy: IngredientItem[];       // было: to_buy → toBuy
    };
    steps: string[];
    cookingTime: string;              // было: cooking_time → cookingTime
    difficulty: string;
    nutritionInfo?: {                  // было: nutrition_info → nutritionInfo
      calories?: string;
      protein?: string;
      carbs?: string;
      fats?: string;
    };
    tips?: string[];
    cuisine?: string;                  // было: cuisine (ок)
    dishType?: string;                  // было: dish_type → dishType
    servings?: string;
    whyPerfect?: string;                 // было: why_perfect → whyPerfect
  };
  generationId: string;
}

export interface SavedRecipe extends FoodResponse {
  savedAt: Date;
  note?: string;
  requestData: FoodRequest;
}