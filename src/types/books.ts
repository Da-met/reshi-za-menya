export interface BookRequest {
  // Основные параметры
  mood?: string;           // "relax" | "inspire" | "think" | "entertain" | "learn" | "emotions" | "escape" | "any"
  interests?: string[];    // массив жанров и тем
  volume?: string;         // "single" | "short_series" | "long_series" | "any"
  
  // Характеристики
  pace?: string;           // "dynamic" | "moderate" | "leisurely" | "any"
  emotional?: string;      // "light" | "emotional" | "dramatic" | "any"
  features?: string[];     // особенности книги
  
  // Фильтры
  region?: string;         // "russian" | "europe_america" | "asia" | "other" | "any"
  period?: string;         // "modern" | "recent" | "20th" | "classic" | "any"
  audience?: string;       // "child" | "teen" | "adult" | "any"
  popularity?: string;     // "bestseller" | "average" | "hidden_gem" | "any"
}

export interface BookResponse {
  book: {
    id: string;
    title: string;
    author: string;
    description: string;
    whyMatch: string;
    genre: string[];
    length: string;
    complexity: string;
    year?: number;
    country?: string;
    features?: string[];
  };
  generationId: string;
}

export interface BookOption {
  id: string;
  label: string;
  emoji?: string;
  hints?: string[];
}