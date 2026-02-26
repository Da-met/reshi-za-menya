import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Простой in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 минута
const RATE_LIMIT_MAX = 10; // 10 запросов в минуту

// Функция для получения IP адреса
function getClientIP(request: NextRequest): string {
  // Пробуем разные методы получения IP
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  // Для локальной разработки используем 'local'
  return 'local';
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  
  // 1. Rate limiting только для API
  if (url.pathname.startsWith('/api/')) {
    const ip = getClientIP(request);
    const now = Date.now();
    const userLimit = rateLimitMap.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW };
    
    // Сброс счетчика если время истекло
    if (now > userLimit.resetTime) {
      userLimit.count = 0;
      userLimit.resetTime = now + RATE_LIMIT_WINDOW;
    }
    
    // Проверка лимита
    if (userLimit.count >= RATE_LIMIT_MAX) {
      console.log(`🚫 Rate limit exceeded for IP: ${ip}`);
      
      return NextResponse.json(
        { 
          error: 'Слишком много запросов',
          message: 'Пожалуйста, подождите минуту',
          retryAfter: Math.ceil((userLimit.resetTime - now) / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((userLimit.resetTime - now) / 1000)),
            'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(userLimit.resetTime),
          }
        }
      );
    }
    
    // Увеличиваем счетчик
    userLimit.count++;
    rateLimitMap.set(ip, userLimit);
    
    // Заголовки для клиента
    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', String(RATE_LIMIT_MAX));
    response.headers.set('X-RateLimit-Remaining', String(RATE_LIMIT_MAX - userLimit.count));
    response.headers.set('X-RateLimit-Reset', String(userLimit.resetTime));
    
    return response;
  }
  
  // 2. Безопасные заголовки для всех ответов
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};