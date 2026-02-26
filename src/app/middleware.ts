import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Добавляем заголовки безопасности
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Логируем запросы
  const url = request.url;
  const method = request.method;
  console.log(`[Middleware] ${method} ${url}`);

  return response;
}

// Применяем middleware только к API роутам
export const config = {
  matcher: '/api/:path*',
};