// types/analyzer.ts
export interface AnalyzerRequest {
  productName: string;
  // skinType?: 'normal' | 'dry' | 'oily' | 'combination' | 'sensitive';
  // skinConcerns?: string[];
  // preferences?: {
  //   vegan?: boolean;
  //   fragranceFree?: boolean;
  //   crueltyFree?: boolean;
  // };
  // inputMethod?: 'text' | 'photo' | 'link'; 
}

export interface AnalyzerProduct {
  id: string;
  name: string;
  brand: string;
  description: string; // ОБЯЗАТЕЛЬНО
  type?: string;
  price?: string;
  price_range?: string;
  image?: string;
  category?: string;
  features?: string[];
  examples?: string[];
  ingredients: IngredientAnalysis[];
  safetyScore: number;
  skinTypeCompatibility: Record<string, number>;
  warnings: string[];
  recommendations: string[];
  reasoning?: string;
  tags?: string[];
  purchaseLink?: string;
  purchaseLinks?: {
    ozon?: string;
    wildberries?: string;
    iherb?: string;
  };
}

export interface IngredientAnalysis {
  name: string;
  safety: 'excellent' | 'good' | 'warning' | 'danger';
  purpose: string;
  comedogenicRating: 0 | 1 | 2 | 3 | 4 | 5;
  irritancy: 'low' | 'medium' | 'high';
  benefits: string[];
  concerns: string[];
}

export interface AnalysisResponse {
  product: AnalyzerProduct;
  generationId: string;
  // Анализ делаем опциональным, т.к. можно брать из product
  analysis?: {
    overallScore: number;
    summary: string;
    bestFor: string[];
    avoidIf: string[];
  };
}

export interface SavedAnalysis {
  id: string;
  giftData: AnalyzerProduct;
  requestData: AnalyzerRequest;
  createdAt: Date;
  userComment?: string;
}