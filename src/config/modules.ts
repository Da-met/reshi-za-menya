// src/config/modules.ts
import type { LucideIcon } from 'lucide-react';
import { Sparkles, Brain } from 'lucide-react';

export interface ModuleConfig {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  status: 'active' | 'development' | 'planned';
  isNew?: boolean;
}

export interface ModuleCategory {
  id: string;
  title: string;
  description?: string;
  icon: LucideIcon;
  modules: ModuleConfig[];
}

export const moduleCategories: ModuleCategory[] = [
  {
    id: 'creative',
    title: 'Креативные помощники',
    description: 'Идеи для вдохновения и развлечений',
    icon: Sparkles,
    modules: [
      {
        id: 'food',
        title: 'Что приготовить?',
        description: 'Рецепты по вашим продуктам или предпочтениям',
        href: '/food',
        icon: 'recipes',
        status: 'active',
      },
      {
        id: 'gifts',
        title: 'Что подарить?',
        description: 'Идеи подарков для любого человека и повода',
        href: '/gifts',
        icon: 'gifts',
        status: 'active',
      },
      {
        id: 'movies',
        title: 'Что посмотреть?',
        description: 'Подборки фильмов и сериалов по настроению',
        href: '/movies',
        icon: 'movies',
        status: 'active',
      },
      {
        id: 'books',
        title: 'Что почитать?',
        description: 'Книжные рекомендации по интересам',
        href: '/books',
        icon: 'books',
        status: 'active',
      },
    ],
  },
  {
    id: 'expert',
    title: 'Экспертные помощники',
    description: 'Анализ и персональные рекомендации',
    icon: Brain,
    modules: [
      {
        id: 'skincare-selector',
        title: 'Подбор уходовых средств',
        description: 'Крем, сыворотка, тоник под ваш тип кожи',
        href: '/skincare',
        icon: 'skincare', // Нужно создать файл skincare.svg в папках тем
        status: 'active',
        isNew: true,
      },
      {
        id: 'ingredient-analyzer',
        title: 'Анализ состава',
        description: 'Проверьте состав косметики на безопасность',
        href: '/analyzer',
        icon: 'analyzer', // Нужно создать файл analyze.svg в папках тем
        status: 'active',
        isNew: true,
      },
    ],
  },
];

// Для обратной совместимости
export const modulesConfig = moduleCategories.flatMap(cat => cat.modules);