// src/types/collections.ts
import { GiftResponse } from './gifts';
import { FoodResponse } from './food';
import { MovieResponse } from './movies';
import { BookResponse } from './books';
import { SkincareProduct } from './skincare';
import { AnalyzerProduct } from './analyzer';

// Модули приложения
export type AppModule = 'gifts' | 'food' | 'movies' | 'books' | 'skincare' | 'analyzer';

// Элемент коллекции — используем существующие типы!
export type CollectionItem = 
  | { module: 'gifts'; data: GiftResponse['gift'] }
  | { module: 'food'; data: FoodResponse['recipe'] }
  | { module: 'movies'; data: MovieResponse['recommendation'] }
  | { module: 'books'; data: BookResponse['book'] }
  | { module: 'skincare'; data: SkincareProduct }
  | { module: 'analyzer'; data: AnalyzerProduct };

// Сама коллекция
export interface Collection {
  id: string;
  module: AppModule;
  title: string;
  description: string;
  image: string;
  items: CollectionItem[];  // массив элементов
  category?: string;         // для фильтрации на главной
}

// Для главной страницы (краткая версия)
export interface CollectionSummary {
  id: string;
  module: AppModule;
  title: string;
  description: string;
  image: string;
  itemsCount: number;
  category: string;
}