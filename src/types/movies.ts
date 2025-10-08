export interface MovieRequest {
  context?: string;           // "family" | "child" | "friends" | "romance" | "solo" | "party" | "parents" | "colleagues"
  mood?: string;              // "funny", "thrilling", "thoughtful", "any"
  genres?: string[];          // ["comedy", "adventure", "drama"]
  format?: string[];          // ["movie", "series", "cartoon", "anime"]
  duration?: string;          // "short", "medium", "long", "any"
  year?: string;             // "2020s" | "2010s" | "2000s" | "90s" | "80s" | "70s" | "classic" | "any"
  country?: string;          // "russia" | "usa" | "europe" | "korea" | "japan" | "china" | "india" | "latin" | "any"
  rating?: string;           // "high" | "good" | "average" | "any" (новое поле)
}

export interface MovieResponse {
  recommendation: {
    id: string;
    title: string;
    type: string;
    genre: string[];
    year: number;
    description: string;
    whyMatch: string;
    duration: string;
    country: string;
  };
  generationId: string;
}

export interface MovieOption {
  id: string;
  label: string;
  emoji?: string;
  hints?: string[];
}