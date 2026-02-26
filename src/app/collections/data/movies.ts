// src/app/collections/data/movies.ts
import { Collection } from '@/types/collections';
import type { MovieResponse } from '@/types/movies';

const dateMovies: MovieResponse['recommendation'][] = [
  {
    id: 'm1',
    title: '1+1 (Неприкасаемые)',
    type: 'movie',
    genre: ['драма', 'комедия', 'биография'],
    releaseYear: 2011,
    description: 'Аристократ, прикованный к инвалидному креслу, нанимает в сиделки бывшего заключенного. Несмотря на разницу в происхождении, они становятся друзьями.',
    whyMatch: 'Идеальный фильм для свидания — смешной, трогательный и жизнеутверждающий. После него хочется обниматься и радоваться жизни.',
    runtime: '1 час 52 минуты',
    productionCountry: 'Франция',
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop',
    director: 'Оливье Накаш, Эрик Толедано',
    actors: ['Франсуа Клюзе', 'Омар Си'],
    kinopoiskRating: 8.9,
    imdbRating: 8.5,
    streamingPlatforms: ['Netflix', 'Кинопоиск'],
    tags: ['дружба', 'жизнь', 'юмор']
  },
  {
    id: 'm2',
    title: 'Отель "Гранд Будапешт"',
    type: 'movie',
    genre: ['комедия', 'драма', 'приключения'],
    releaseYear: 2014,
    description: 'История приключений легендарного консьержа и его юного протеже в знаменитом европейском отеле между двумя войнами.',
    whyMatch: 'Невероятно стильный и уютный фильм с потрясающей картинкой. Создает ощущение праздника и волшебства.',
    runtime: '1 час 40 минут',
    productionCountry: 'США, Германия',
    poster: 'https://images.unsplash.com/photo-1524985069026-dd647a71c27e?w=400&h=600&fit=crop',
    director: 'Уэс Андерсон',
    actors: ['Рэйф Файнс', 'Тони Револори'],
    kinopoiskRating: 7.9,
    imdbRating: 8.1,
    streamingPlatforms: ['Кинопоиск', 'Okko'],
    tags: ['стиль', 'эстетика', 'приключения']
  },
  {
    id: 'm3',
    title: 'До встречи с тобой',
    type: 'movie',
    genre: ['драма', 'мелодрама'],
    releaseYear: 2016,
    description: 'Девушка становится сиделкой богатого парня, который прикован к инвалидному креслу. Их жизнь меняется навсегда.',
    whyMatch: 'Очень эмоциональный фильм о любви и выборе. Идеален для свидания, если хочется поплакать.',
    runtime: '1 час 50 минут',
    productionCountry: 'Великобритания',
    poster: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=600&fit=crop',
    director: 'Теа Шэррок',
    actors: ['Эмилия Кларк', 'Сэм Клафлин'],
    kinopoiskRating: 8.0,
    imdbRating: 7.4,
    streamingPlatforms: ['Netflix'],
    tags: ['любовь', 'слезы', 'трогательно']
  }
];

const familyMovies: MovieResponse['recommendation'][] = [
  {
    id: 'm4',
    title: 'Тайна Коко',
    type: 'cartoon',
    genre: ['мультфильм', 'фэнтези', 'комедия', 'приключения'],
    releaseYear: 2017,
    description: 'Мальчик Мигель мечтает стать музыкантом и попадает в мир мертвых, где встречает своих предков.',
    whyMatch: 'Красивый, добрый и очень музыкальный мультфильм о семье. Будет интересно и детям, и взрослым.',
    runtime: '1 час 45 минут',
    productionCountry: 'США',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0824?w=400&h=600&fit=crop',
    director: 'Ли Анкрич',
    actors: ['Энтони Гонсалес', 'Гаэль Гарсиа Берналь'],
    kinopoiskRating: 8.8,
    imdbRating: 8.4,
    streamingPlatforms: ['Кинопоиск', 'Disney+'],
    tags: ['семья', 'музыка', 'смешно']
  },
  {
    id: 'm5',
    title: 'Холодное сердце 2',
    type: 'cartoon',
    genre: ['мультфильм', 'мюзикл', 'фэнтези', 'комедия'],
    releaseYear: 2019,
    description: 'Анна, Эльза и их друзья отправляются в опасное путешествие, чтобы узнать тайну прошлого.',
    whyMatch: 'Детский хит с отличной музыкой и важными темами взросления, сестринской любви и принятия себя.',
    runtime: '1 час 43 минуты',
    productionCountry: 'США',
    poster: 'https://images.unsplash.com/photo-1618414074995-4a2a10f381ea?w=400&h=600&fit=crop',
    director: 'Крис Бак, Дженнифер Ли',
    actors: ['Кристин Белл', 'Идина Мензел'],
    kinopoiskRating: 7.7,
    imdbRating: 6.8,
    streamingPlatforms: ['Кинопоиск', 'Disney+'],
    tags: ['принцессы', 'песни', 'приключения']
  }
];

const newYearMovies: MovieResponse['recommendation'][] = [
  {
    id: 'm6',
    title: 'Ирония судьбы, или С легким паром!',
    type: 'movie',
    genre: ['комедия', 'мелодрама'],
    releaseYear: 1975,
    description: 'В канун Нового года двое мужчин по иронии судьбы меняются местами. Один из них попадает в квартиру к незнакомой женщине.',
    whyMatch: 'Абсолютная новогодняя классика. Создает то самое настроение праздника и уюта.',
    runtime: '3 часа 15 минут',
    productionCountry: 'СССР',
    poster: 'https://images.unsplash.com/photo-1542327897-d73f4005b533?w=400&h=600&fit=crop',
    director: 'Эльдар Рязанов',
    actors: ['Андрей Мягков', 'Барбара Брыльска'],
    kinopoiskRating: 8.3,
    imdbRating: 7.9,
    streamingPlatforms: ['Кинопоиск', 'Ivi'],
    tags: ['новый год', 'любовь', 'классика']
  },
  {
    id: 'm7',
    title: 'Один дома',
    type: 'movie',
    genre: ['комедия', 'семейный'],
    releaseYear: 1990,
    description: 'Мальчика случайно забывают дома, когда семья улетает на Рождество. Он вынужден защищать дом от грабителей.',
    whyMatch: 'Ностальгическая комедия, которую можно пересматривать бесконечно. Смешно и уютно.',
    runtime: '1 час 43 минуты',
    productionCountry: 'США',
    poster: 'https://images.unsplash.com/photo-1512909006721-3d601888d258?w=400&h=600&fit=crop',
    director: 'Крис Коламбус',
    actors: ['Маколей Калкин', 'Джо Пеши'],
    kinopoiskRating: 8.3,
    imdbRating: 7.7,
    streamingPlatforms: ['Кинопоиск', 'Disney+'],
    tags: ['рождество', 'комедия', 'дети']
  }
];

const thrillerMovies: MovieResponse['recommendation'][] = [
  {
    id: 'm8',
    title: 'Начало',
    type: 'movie',
    genre: ['фантастика', 'триллер', 'драма'],
    releaseYear: 2010,
    description: 'Профессиональный вор проникает в сны людей, чтобы красть идеи. Ему предлагают последнее дело — внедрить идею.',
    whyMatch: 'Гениальный фильм, который хочется обсуждать после просмотра. Идеален для свидания с умным собеседником.',
    runtime: '2 часа 28 минут',
    productionCountry: 'США, Великобритания',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop',
    director: 'Кристофер Нолан',
    actors: ['Леонардо ДиКаприо', 'Джозеф Гордон-Левитт'],
    kinopoiskRating: 8.7,
    imdbRating: 8.8,
    streamingPlatforms: ['Кинопоиск', 'Okko'],
    tags: ['мозг', 'сны', 'экшн']
  }
];

export const movieCollections: Collection[] = [
  {
    id: '5',
    module: 'movies',
    title: 'Фильмы для свидания',
    description: 'Романтическое кино для особенных вечеров',
    image: 'https://images.unsplash.com/photo-1489599809505-7c8e1c75ce13?w=600&h=400&fit=crop',
    category: 'movies',
    items: dateMovies.map(movie => ({ module: 'movies', data: movie }))
  },
  {
    id: '9',
    module: 'movies',
    title: 'Семейный вечер',
    description: 'Мультфильмы и кино для просмотра с детьми',
    image: 'https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?w=600&h=400&fit=crop',
    category: 'movies',
    items: familyMovies.map(movie => ({ module: 'movies', data: movie }))
  },
  {
    id: '10',
    module: 'movies',
    title: 'Новогоднее кино',
    description: 'Самые уютные фильмы для зимних праздников',
    image: 'https://images.unsplash.com/photo-1542327897-d73f4005b533?w=600&h=400&fit=crop',
    category: 'movies',
    items: newYearMovies.map(movie => ({ module: 'movies', data: movie }))
  },
  {
    id: '11',
    module: 'movies',
    title: 'Захватывающие триллеры',
    description: 'Фильмы, от которых невозможно оторваться',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&h=400&fit=crop',
    category: 'movies',
    items: thrillerMovies.map(movie => ({ module: 'movies', data: movie }))
  }
];