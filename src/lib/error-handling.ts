// D:\МАЙО\JavaScript\ПРОЕКТЫ\РЕШИ ЗА МЕНЯ\reshi-za-menya\src\lib\error-handling.ts
/**
 * Система обработки ошибок приложения
 */
// import { toast } from 'sonner'; 

// Типы ошибок приложения
export enum ErrorCode {
  // API ошибки
  API_ERROR = 'API_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTH_ERROR = 'AUTH_ERROR',
  
  // Бизнес-логика
  NO_PRODUCTS_FOUND = 'NO_PRODUCTS_FOUND',
  INVALID_INPUT = 'INVALID_INPUT',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  
  // Общие
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  
  // Специфичные для модулей
  GIFT_GENERATION_ERROR = 'GIFT_GENERATION_ERROR',
  SKINCARE_GENERATION_ERROR = 'SKINCARE_GENERATION_ERROR',
  MOVIE_GENERATION_ERROR = 'MOVIE_GENERATION_ERROR',
  ANALYZER_GENERATION_ERROR = 'ANALYZER_GENERATION_ERROR',
}

// Кастомный класс ошибок
export class AppError extends Error {
  constructor(
    message: string,
    public code: ErrorCode,
    public userMessage?: string,
    public originalError?: unknown,
    public context?: string
  ) {
    super(message);
    this.name = 'AppError';
    
    // Сохраняем стектрейс оригинальной ошибки
    if (originalError instanceof Error) {
      this.stack = originalError.stack;
    }
  }
}

/**
 * Обработчик ошибок для UI
 */
export function handleError(error: unknown, context?: string): AppError {
  console.error(`❌ Ошибка в ${context || 'unknown context'}:`, error);

  let appError: AppError;
  
  if (error instanceof AppError) {
    appError = error;
  } else if (error instanceof Error) {
    appError = new AppError(
      error.message,
      ErrorCode.UNKNOWN_ERROR,
      'Произошла непредвиденная ошибка',
      error,
      context
    );
  } else {
    appError = new AppError(
      String(error),
      ErrorCode.UNKNOWN_ERROR,
      'Произошла непредвиденная ошибка',
      error,
      context
    );
  }
  return appError;
}

/**
 * Создает промис с таймаутом
 */
export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorCode: ErrorCode = ErrorCode.TIMEOUT_ERROR
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(() => {
        reject(new AppError(
          `Таймаут через ${timeoutMs}ms`,
          errorCode,
          'Операция заняла слишком много времени'
        ));
      }, timeoutMs);
    })
  ]);
}

/**
 * Повторяет операцию с экспоненциальной задержкой
 */
export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, attempt);
        console.log(`Повтор через ${delay}ms (попытка ${attempt + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError!;
}


// В ТОТ ЖЕ ФАЙЛ error-handling.ts в самом конце добавьте:

/**
 * Простая функция для преобразования ошибок в ошибки подарков
 */
export function createGiftError(error: unknown, context?: string): AppError {
  if (error instanceof AppError) {
    return error;
  }
  
  const errorMessage = error instanceof Error ? error.message : String(error);
  
  // Определяем тип ошибки
  let code: ErrorCode = ErrorCode.GIFT_GENERATION_ERROR;
  let userMessage = 'Ошибка при генерации подарка';
  
  if (errorMessage.includes('Таймаут') || errorMessage.includes('timeout')) {
    code = ErrorCode.TIMEOUT_ERROR;
    userMessage = 'Поиск подарка занял слишком много времени';
  } else if (errorMessage.includes('Ошибка сервера') || errorMessage.includes('Network')) {
    code = ErrorCode.NETWORK_ERROR;
    userMessage = 'Проблема с соединением. Проверьте интернет';
  }
  
  return new AppError(
    errorMessage,
    code,
    userMessage,
    error,
    context ? `Gifts: ${context}` : 'Gifts'
  );
}


/**
 * Простая функция для преобразования ошибок в ошибки skincare
 */
export function createSkincareError(error: unknown, context?: string): AppError {
  if (error instanceof AppError) {
    return error;
  }
  
  const errorMessage = error instanceof Error ? error.message : String(error);
  
  let code: ErrorCode = ErrorCode.SKINCARE_GENERATION_ERROR;
  let userMessage = 'Ошибка при подборе средств по уходу за кожей';
  
  if (errorMessage.includes('Таймаут') || errorMessage.includes('timeout')) {
    code = ErrorCode.TIMEOUT_ERROR;
    userMessage = 'Поиск средств занял слишком много времени';
  } else if (errorMessage.includes('Ошибка сервера') || errorMessage.includes('Network')) {
    code = ErrorCode.NETWORK_ERROR;
    userMessage = 'Проблема с соединением. Проверьте интернет';
  }
  
  return new AppError(
    errorMessage,
    code,
    userMessage,
    error,
    context ? `Skincare: ${context}` : 'Skincare'
  );
}

export function createMovieError(error: unknown, context?: string): AppError {
  if (error instanceof AppError) {
    return error;
  }
  
  const errorMessage = error instanceof Error ? error.message : String(error);
  
  let code: ErrorCode = ErrorCode.MOVIE_GENERATION_ERROR;
  let userMessage = 'Ошибка при подборе фильма';
  
  if (errorMessage.includes('Таймаут') || errorMessage.includes('timeout')) {
    code = ErrorCode.TIMEOUT_ERROR;
    userMessage = 'Поиск фильма занял слишком много времени';
  } else if (errorMessage.includes('Ошибка сервера') || errorMessage.includes('Network')) {
    code = ErrorCode.NETWORK_ERROR;
    userMessage = 'Проблема с соединением. Проверьте интернет';
  }
  
  return new AppError(
    errorMessage,
    code,
    userMessage,
    error,
    context ? `Movies: ${context}` : 'Movies'
  );
}


// src/lib/error-handling.ts (добавить в конец)

/**
 * Простая функция для преобразования ошибок в ошибки книг
 */
export function createBookError(error: unknown, context?: string): AppError {
  if (error instanceof AppError) {
    return error;
  }
  
  const errorMessage = error instanceof Error ? error.message : String(error);
  
  let code: ErrorCode = ErrorCode.UNKNOWN_ERROR; // или можно добавить BOOK_GENERATION_ERROR в enum
  let userMessage = 'Ошибка при подборе книги';
  
  if (errorMessage.includes('Таймаут') || errorMessage.includes('timeout')) {
    code = ErrorCode.TIMEOUT_ERROR;
    userMessage = 'Поиск книги занял слишком много времени';
  } else if (errorMessage.includes('Ошибка сервера') || errorMessage.includes('Network')) {
    code = ErrorCode.NETWORK_ERROR;
    userMessage = 'Проблема с соединением. Проверьте интернет';
  } else if (errorMessage.includes('Нет книг') || errorMessage.includes('not found')) {
    code = ErrorCode.NO_PRODUCTS_FOUND;
    userMessage = 'Не удалось найти книгу по вашим критериям';
  }
  
  return new AppError(
    errorMessage,
    code,
    userMessage,
    error,
    context ? `Books: ${context}` : 'Books'
  );
}



/**
 * Простая функция для преобразования ошибок в ошибки еды/рецептов
 */
export function createFoodError(error: unknown, context?: string): AppError {
  if (error instanceof AppError) {
    return error;
  }
  
  const errorMessage = error instanceof Error ? error.message : String(error);
  
  // Можно добавить новый код ошибки в enum ErrorCode, а пока используем существующий
  let code: ErrorCode = ErrorCode.UNKNOWN_ERROR;
  let userMessage = 'Ошибка при генерации рецепта';
  
  if (errorMessage.includes('Таймаут') || errorMessage.includes('timeout')) {
    code = ErrorCode.TIMEOUT_ERROR;
    userMessage = 'Поиск рецепта занял слишком много времени';
  } else if (errorMessage.includes('Ошибка сервера') || errorMessage.includes('Network')) {
    code = ErrorCode.NETWORK_ERROR;
    userMessage = 'Проблема с соединением. Проверьте интернет';
  } else if (errorMessage.includes('Нет рецептов') || errorMessage.includes('not found')) {
    code = ErrorCode.NO_PRODUCTS_FOUND;
    userMessage = 'Не удалось найти рецепт по вашим критериям';
  }
  
  return new AppError(
    errorMessage,
    code,
    userMessage,
    error,
    context ? `Food: ${context}` : 'Food'
  );
}


export function createAnalyzerError(error: unknown, context?: string): AppError {
  if (error instanceof AppError) {
    return error;
  }
  
  const errorMessage = error instanceof Error ? error.message : String(error);
  
  let code: ErrorCode = ErrorCode.ANALYZER_GENERATION_ERROR;
  let userMessage = 'Ошибка при анализе состава косметики';
  
  if (errorMessage.includes('Таймаут') || errorMessage.includes('timeout')) {
    code = ErrorCode.TIMEOUT_ERROR;
    userMessage = 'Анализ состава занял слишком много времени';
  } else if (errorMessage.includes('Ошибка сервера') || errorMessage.includes('Network')) {
    code = ErrorCode.NETWORK_ERROR;
    userMessage = 'Проблема с соединением. Проверьте интернет';
  } else if (errorMessage.includes('Не найден') || errorMessage.includes('not found')) {
    code = ErrorCode.NO_PRODUCTS_FOUND;
    userMessage = 'Не удалось найти информацию о продукте';
  }
  
  return new AppError(
    errorMessage,
    code,
    userMessage,
    error,
    context ? `Analyzer: ${context}` : 'Analyzer'
  );
}