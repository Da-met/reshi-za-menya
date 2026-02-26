import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    // 🔑 Получаем refresh_token из httpOnly cookie
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token')?.value;

    // Что здесь происходит:
    //     cookies() - функция Next.js для чтения cookie
    //     await - ждем пока придут cookie (асинхронно)
    //     .get('refresh_token') - берем нашу специальную cookie
    //     ?.value - если cookie есть, берем её значение
    // Важно: httpOnly cookie нельзя прочитать из JavaScript! Только сервер может.

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Нет refresh токена' },
        { status: 401 }
      );
    }
    // Проверка: Если нет refresh_token - значит пользователь не залогинен. Возвращаем ошибку 401.
    // 🔄 Запрашиваем новый access_token у Keycloak
    const response = await fetch('http://192.168.3.6:8080/realms/prompts/protocol/openid-connect/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: 'react-client',
            grant_type: 'refresh_token',  // Говорим: "хочу обновить токен"
            refresh_token: refreshToken,  // Отправляем старый refresh_token
        }),
    });

    // Как это работает в Keycloak:
    //     grant_type: 'refresh_token' - специальный тип запроса
    //     Keycloak проверяет ваш refresh_token
    //     Если он валидный - выдает новый access_token
    //     Иногда выдает и новый refresh_token (скользящая сессия)

    if (!response.ok) {
        // Если Keycloak отказал - удаляем cookie
        const nextResponse = NextResponse.json(
            { error: 'Не удалось обновить токен' },
            { status: 401 }
        );
      
        nextResponse.cookies.set({
            name: 'refresh_token',
            value: '',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 0,  // 👈 Устанавливаем время жизни 0 = удалить
        });
        return nextResponse;
    }

    // Если обновление не удалось:
    //     Значит refresh_token протух или невалидный
    //     Удаляем его из cookie (maxAge: 0)
    //     Отправляем ошибку на фронт

    const data = await response.json();
    // Создаем ответ с новым access_token
    const nextResponse = NextResponse.json({
      access_token: data.access_token,   // 👈 Новый токен
    });
    // Если Keycloak дал новый refresh_token - сохраняем
    if (data.refresh_token) {
      nextResponse.cookies.set({
        name: 'refresh_token',
        value: data.refresh_token,                         // 👈 Новый refresh_token
        httpOnly: true,                                    // Недоступен из JS
        secure: process.env.NODE_ENV === 'production',     // Только HTTPS в проде
        sameSite: 'lax',                                   // Защита от CSRF
        path: '/',
        maxAge: 30 * 24 * 60 * 60,                         // 30 дней
      });
    }

    return nextResponse;

    // Успешное обновление:
    //     Отправляем на фронт новый access_token
    //     Если Keycloak дал новый refresh_token - обновляем cookie
    //     Старый refresh_token в cookie заменяется новым

  } catch (error) {
    console.error('Refresh API error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}