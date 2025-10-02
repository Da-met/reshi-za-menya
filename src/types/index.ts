// Все типы для нашего приложения

export type ModuleType = 'recipes' | 'gifts' | 'movies' | 'places';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface FavoriteBase {
  id: string;
  moduleType: ModuleType;
  title: string;
  image?: string;
  metadata: Record<string, any>;
}

export interface FavoriteWithComments extends FavoriteBase {
  userComment?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  name: string;
  price?: number;
  quantity: number;
  moduleType: ModuleType;
  image?: string;
}

export interface ThemeState {
  theme: 'light' | 'night' | 'sky';
  setTheme: (theme: ThemeState['theme']) => void;
}