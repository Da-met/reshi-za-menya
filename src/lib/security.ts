// src/lib/security.ts - ПОЛНАЯ ОБНОВЛЕННАЯ ВЕРСИЯ
/**
 * Утилиты для обеспечения безопасности приложения
 */

import { SECURITY_CONFIG } from '@/config/security-config';

// ==================== БАЗОВЫЕ ФУНКЦИИ ====================

/**
 * Экранирует специальные символы в строке
 */
export const escapeHtml = (text: unknown): string => {
  if (!text) return '';
  
  const textStr = String(text);
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '`': '&#x60;'
  };
  
  return textStr.replace(/[&<>"'`]/g, (m) => map[m]);
};

/**
 * Безопасно преобразует текст с переносами строк в массив параграфов
 */
export const splitParagraphs = (text: unknown): string[] => {
  if (!text) return [];
  
  const textStr = String(text);
  return textStr
    .split('\n')
    .map(p => p.trim())
    .filter(p => p.length > 0);
};

// ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================

/**
 * Проверяет, разрешен ли протокол
 */
function isAllowedProtocol(protocol: string): boolean {
  const normalizedProtocol = protocol.toLowerCase();
  
  // Относительные пути
  if (normalizedProtocol === '') {
    return SECURITY_CONFIG.ALLOWED_PROTOCOLS['relative:'];
  }
  
  // Проверка по белому списку
  const allowedProtocols = SECURITY_CONFIG.ALLOWED_PROTOCOLS as Record<string, boolean>;
  return allowedProtocols[normalizedProtocol] || false;
}

/**
 * Проверяет, разрешен ли домен
 */
function isAllowedDomain(hostname: string): boolean {
  if (!SECURITY_CONFIG.ALLOWED_DOMAINS) {
    return true;
  }
  
  return SECURITY_CONFIG.ALLOWED_DOMAINS.some(allowed => {
    if (hostname === allowed) return true;
    
    if (hostname.endsWith(`.${allowed}`)) {
      const parts = hostname.split('.');
      const domain = parts.slice(-2).join('.');
      return domain === allowed;
    }
    
    return false;
  });
}

/**
 * Проверяет относительный путь на безопасность
 */
function isValidRelativePath(path: string): boolean {
  if (path.includes('..') || path.includes('//')) {
    return false;
  }
  
  if (path.length > 500) return false;
  
  const lowerPath = path.toLowerCase();
  if (lowerPath.includes('script') || 
      lowerPath.includes('javascript') ||
      lowerPath.includes('data:')) {
    return false;
  }
  
  return true;
}

/**
 * Проверяет URL на фишинговые паттерны
 */
function isPhishingUrl(urlObj: URL): boolean {
  const hostname = urlObj.hostname.toLowerCase();
  
  // 1. Homograph атаки (кириллические символы в латинском домене)
  const cyrillicHomographs = /[авекмнорстух]/;
  if (cyrillicHomographs.test(hostname)) {
    return true;
  }
  
  // 2. Подмена домена
  const trustedDomains = ['reshizamena.ru', 'wildberries.ru', 'ozon.ru'];
  for (const trusted of trustedDomains) {
    if (hostname.includes(trusted) && 
        hostname !== trusted && 
        !hostname.endsWith(`.${trusted}`)) {
      return true;
    }
  }
  
  // 3. Слишком много поддоменов
  const subdomainCount = hostname.split('.').length - 2;
  if (subdomainCount > 4) return true;
  
  return false;
}

/**
 * Логирует подозрительные URL
 */
function logSuspiciousUrl(url: string, reason: string): void {
  if (!SECURITY_CONFIG.LOG_SUSPICIOUS_URLS) return;
  
  const logData = {
    timestamp: new Date().toISOString(),
    url: url.substring(0, 100),
    reason,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
  };
  
  if (process.env.NODE_ENV === 'development') {
    console.warn('🔒 Подозрительный URL:', logData);
  } else {
    console.warn('🔒 Подозрительный URL обнаружен');
  }
}

// ==================== ОСНОВНЫЕ ФУНКЦИИ ====================

/**
 * Проверяет, является ли строка безопасным URL
 */
export const isValidUrl = (url: unknown): url is string => {
  // 1. Базовая проверка типа
  if (typeof url !== 'string' || url.trim() === '') {
    return false;
  }
  
  const urlStr = url.trim();
  
  // 2. Проверка длины
  if (urlStr.length > SECURITY_CONFIG.MAX_URL_LENGTH) {
    logSuspiciousUrl(urlStr, 'URL слишком длинный');
    return false;
  }
  
  // 3. Проверка на опасные символы
  if (/[\x00-\x1F\x7F<>"']/.test(urlStr)) {
    logSuspiciousUrl(urlStr, 'Содержит опасные символы');
    return false;
  }
  
  // 4. Проверка относительных путей
  if (urlStr.startsWith('/') || urlStr.startsWith('#') || urlStr.startsWith('?')) {
    return isValidRelativePath(urlStr);
  }
  
  try {
    const urlObj = new URL(urlStr);
    
    // 5. Проверка протокола
    if (!isAllowedProtocol(urlObj.protocol)) {
      logSuspiciousUrl(urlStr, `Запрещенный протокол: ${urlObj.protocol}`);
      return false;
    }
    
    // 6. Проверка домена (только в production)
    if (SECURITY_CONFIG.MODE === 'strict' && !isAllowedDomain(urlObj.hostname)) {
      logSuspiciousUrl(urlStr, `Запрещенный домен: ${urlObj.hostname}`);
      return false;
    }
    
    // 7. Проверка на фишинг
    if (SECURITY_CONFIG.CHECK_PHISHING && isPhishingUrl(urlObj)) {
      logSuspiciousUrl(urlStr, 'Обнаружен фишинговый паттерн');
      return false;
    }
    
    // 8. Дополнительные проверки для HTTP/HTTPS
    if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
      // Проверяем порт
      if (urlObj.port && !['', '80', '443'].includes(urlObj.port)) {
        logSuspiciousUrl(urlStr, `Нестандартный порт: ${urlObj.port}`);
        return false;
      }
      
      // Проверяем hostname
      if (/[@\[\]\\]/.test(urlObj.hostname)) {
        logSuspiciousUrl(urlStr, 'Подозрительные символы в домене');
        return false;
      }
    }
    
    return true;
    
  } catch (error: unknown) {
    // Безопасная обработка ошибки
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logSuspiciousUrl(urlStr, `Ошибка парсинга URL: ${errorMessage}`);
    return false;
  }
};

/**
 * Создает безопасный атрибут href
 */
export const safeHref = (url: unknown, fallback: string = '#'): string => {
  // 1. Проверяем URL
  if (!isValidUrl(url)) {
    logSuspiciousUrl(String(url), 'URL не прошел проверку безопасности');
    return fallback;
  }
  
  const urlStr = url as string;
  
  // 2. Дополнительные проверки для production
  if (SECURITY_CONFIG.MODE === 'strict') {
    try {
      const urlObj = new URL(urlStr);
      
      // Если это наш домен и HTTP - меняем на HTTPS
      if (urlObj.protocol === 'http:' && 
          (urlObj.hostname === 'reshizamena.ru' || 
           urlObj.hostname === 'www.reshizamena.ru')) {
        urlObj.protocol = 'https:';
        return urlObj.toString();
      }
      
    } catch {
      // Если не парсится, это относительный путь
      return urlStr;
    }
  }
  
  // 3. Добавляем атрибуты безопасности для внешних ссылок
  if (isExternalUrl(urlStr)) {
    return `${urlStr}${urlStr.includes('?') ? '&' : '?'}ref=reshizamena`;
  }
  
  return urlStr;
};

/**
 * Проверяет, является ли URL внешним
 */
function isExternalUrl(url: string): boolean {
  if (url.startsWith('/') || url.startsWith('#') || url.startsWith('?')) {
    return false;
  }
  
  try {
    const urlObj = new URL(url);
    const currentDomain = typeof window !== 'undefined' 
      ? window.location.hostname 
      : 'reshizamena.ru';
    
    return urlObj.hostname !== currentDomain && 
           !urlObj.hostname.endsWith(`.${currentDomain}`);
  } catch {
    return false;
  }
}

/**
 * Безопасное открытие ссылки
 */
export const safeOpenUrl = (
  url: string, 
  options?: {
    target?: string;
    features?: string;
    noopener?: boolean;
    noreferrer?: boolean;
  }
): Window | null => {
  const safeUrl = safeHref(url);
  
  if (safeUrl === '#') {
    console.warn('Попытка открыть небезопасный URL:', url);
    return null;
  }
  
  const target = options?.target || '_blank';
  const features = options?.features || 'noopener,noreferrer';
  
  return window.open(safeUrl, target, features);
};

// ==================== ДЛЯ ОБРАТНОЙ СОВМЕСТИМОСТИ ====================

/**
 * Старая функция - оставляем для обратной совместимости
 * @deprecated Используйте safeHref
 */
export const oldSafeHref = (url: unknown): string => {
  return safeHref(url);
};