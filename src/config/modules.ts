export interface ModuleConfig {
    id: string;
    title: string;
    description: string;
    href: string;
    moduleType: 'active' | 'coming-soon';
    icon: string;
    status: 'active' | 'development' | 'planned';
  }
  
  export const modulesConfig: ModuleConfig[] = [
    // Активные модули
    {
      id: 'food',
      title: 'Что приготовить?',
      description: 'Рецепты по вашим продуктам или предпочтениям',
      href: '/food',
      moduleType: 'active',
      icon: 'recipes',
      status: 'active',
    },
    {
      id: 'gifts', 
      title: 'Что подарить?',
      description: 'Идеи подарков для любого человека и повода',
      href: '/gifts',
      moduleType: 'active',
      icon: 'gifts',
      status: 'active',
    },
    {
      id: 'movies',
      title: 'Что посмотреть?',
      description: 'Подборки фильмов и сериалов по вашему настроению',
      href: '/movies',
      moduleType: 'active',
      icon: 'movies',
      status: 'active',
    },
    {
      id: 'books',
      title: 'Что почитать?',
      description: 'Книжные рекомендации по вашим интересам',
      href: '#',
      moduleType: 'active', 
      icon: 'books',
      status: 'active',
    },


    // Модули в разработке (только для внутреннего использования)
    {
      id: 'places',
      title: 'Куда сходить?',
      description: 'Интересные места и мероприятия в вашем городе',
      href: '#',
      moduleType: 'coming-soon',
      icon: 'places',
      status: 'development',
    },
  ];