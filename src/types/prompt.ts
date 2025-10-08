export interface Prompt {
    id: string;
    moduleName: string;
    promptKey: string;
    text: string;
    version: number;
    isActive: boolean;
    description: string;
    variables: string[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface TestVariables {
    [key: string]: string;
  }
  
  export interface TestResult {
    success: boolean;
    response?: any;
    error?: string;
  }
  
  export interface AdminModule {
    id: string;
    name: string;
    prompts: AdminPrompt[];
  }
  
  export interface AdminPrompt {
    key: string;
    name: string;
    description: string;
    variables: readonly string[];
}


export interface FoodRequest {
    mode: 'products' | 'dish';
    products?: string[];
    dishName?: string;
    excludeIngredients?: string[];
    filters: {
      dishType?: 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'snack';
      cookingTime?: '<15' | '<30' | '<45' | '<60' | '>60';
      cuisine?: 'russian' | 'italian' | 'asian' | 'georgian' | 'mexican';
      diet?: 'vegetarian' | 'vegan' | 'gluten-free' | 'lactose-free' | 'keto' | 'high-protein';
      allergens?: string[];
      occasion?: 'everyday' | 'holiday' | 'romantic' | 'kids' | 'healthy';
      difficulty?: 'easy' | 'medium' | 'hard';
      cookingMethod?: 'oven' | 'stove' | 'multicooker' | 'grill' | 'no-cook' | 'steam';
    };
}