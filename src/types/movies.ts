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
    releaseYear: number;          // 👈 было year → releaseYear
    description: string;
    whyMatch: string;
    runtime: string;          // 👈 было duration → runtime
    productionCountry: string; // 👈 было country → productionCountry
    poster?: string;
    director?: string;
    actors?: string[];
    kinopoiskRating?: number;     // 👈 было rating → kinopoiskRating
    imdbRating?: number;          // 👈 новое поле для IMDb
    streamingPlatforms?: string[]; // 👈 новое поле
    streamingLink?: string;       // 👈 новое поле
    tags?: string[];              // 👈 новое поле
  };
  generationId: string;
}

export interface MovieOption {
  id: string;
  label: string;
  emoji?: string;
  hints?: string[];
}

// Аналог SavedGift для фильмов
export interface SavedMovie {
  id: string;
  movieData: MovieResponse;
  requestData: MovieRequest;
  createdAt: Date;
  userComment?: string;
  userRating?: number;        // пользовательская оценка 1-10
  watched?: boolean;          // просмотрено/не просмотрено
  watchDate?: Date;           // когда посмотрели
}