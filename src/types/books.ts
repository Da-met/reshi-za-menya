export interface BookRequest {
  // Основные параметры
  readingMood?: string;           // ~ mood ~     "relax" | "inspire" | "think" | "entertain" | "learn" | "emotions" | "escape" | "any"
  preferredGenres?: string[];    // ~ interests ~       массив жанров и тем
  bookLength?: string;           // ~ volume ~       "single" | "short_series" | "long_series" | "any"
  
  // Характеристики
  narrativePace?: string;        // ~ pace ~        "dynamic" | "moderate" | "leisurely" | "any"
  emotionalIntensity?: string;   // ~ emotional ~         "light" | "emotional" | "dramatic" | "any"
  specialFeatures?: string[];    // ~ features ~          особенности книги
  
  // Фильтры
  authorRegion?: string;         // ~ region ~           "russian" | "europe_america" | "asia" | "other" | "any"
  publicationPeriod?: string;    // ~ period ~            "modern" | "recent" | "20th" | "classic" | "any"
  targetAudience?: string;       // ~ audience ~             "child" | "teen" | "adult" | "any"
  popularityLevel?: string;     // ~ popularity ~           "bestseller" | "average" | "hidden_gem" | "any"

  exclude_titles?: string[];
}

export interface BookResponse {
  book: {
    id: string;
    title: string;
    author: string;
    description: string;
    whyMatch: string;
    genres: string[];             // ~ genre ~ 
    length: string;
    readingComplexity: string;    // ~ complexity ~ 
    year?: number;
    country?: string;
    features?: string[];
    coverImage?: string;          // ~ cover ~ 

    // Дополнительные поля ТОЛЬКО для ответа
    pages?: number;
    language?: string;
    publisher?: string;
    isbn?: string;
    rating?: number;
    awards?: string[];

    // Партнерские ссылки
    affiliateLinks?: {
      litres?: string;
      book24?: string;
      labyrinth?: string;
      mybook?: string;
      bookmate?: string;
    };
  };
  generationId: string;
}

export interface BookOption {
  id: string;
  label: string;
  emoji?: string;
  hints?: string[];
}

export interface SavedBook {
  id: string;
  bookData: BookResponse;
  requestData: BookRequest;
  createdAt: Date;
  userComment?: string;
  userRating?: number;        // пользовательская оценка 1-10
  read?: boolean;             // прочитана/не прочитана
  readDate?: Date;            // когда прочитали
}