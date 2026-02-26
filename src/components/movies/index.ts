// src/components/movies/index.ts

// Главные компоненты
export { MovieSelector } from './MovieSelector';
export { MovieResult } from './MovieResult';
export { SavedMovies } from './SavedMovies';

// Карточка фильма и детали
export { MovieProductCard } from './MovieProductCard';
export { MovieRequestDetails } from './MovieRequestDetails';

// UI компоненты
export { MovieOptionTag } from './MovieOptionTag';
export { SelectedOptions } from './SelectedOptions';
export { MovieActions } from './MovieActions';



// Секции формы
export { ContextSection } from './sections/ContextSection';
export { MoodSection } from './sections/MoodSection';
export { FiltersSection } from './sections/FiltersSection';

// Хуки
export { useMoviesForm } from '@/hooks/movies/useMoviesForm';
export { useMoviesApi } from '@/hooks/movies/useMoviesApi';