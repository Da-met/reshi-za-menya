// src/config/security-config.ts
export const SECURITY_CONFIG = {
  // Режимы: 'strict' (продакшн), 'development' (разработка)
  MODE: process.env.NODE_ENV === 'production' ? 'strict' : 'development',
  
  // Максимальная длина URL
  MAX_URL_LENGTH: 2000,
  
  // Разрешенные протоколы
  ALLOWED_PROTOCOLS: {
    'https:': true,
    'http:': process.env.NODE_ENV === 'development', // Только в разработке
    'relative:': true, // Для относительных путей
  },
  
  // Разрешенные домены (только в strict режиме)
  ALLOWED_DOMAINS: [
    'reshizamena.ru',
    'www.reshizamena.ru',
    'ozon.ru',
    'wildberries.ru',
    'market.yandex.ru',
    'images.unsplash.com',
    'source.unsplash.com',
  ],
  
  // Проверка на фишинг
  CHECK_PHISHING: true,
  
  // Логировать подозрительные URL
  LOG_SUSPICIOUS_URLS: true,
  
  // Параметры для внешних ссылок
  EXTERNAL_LINKS: {
    ADD_REF_PARAM: true,
    REF_PARAM: 'ref=reshizamena',
    OPEN_IN_NEW_TAB: true,
    REL_ATTRIBUTES: 'noopener noreferrer nofollow',
  },
} as const;