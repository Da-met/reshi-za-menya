import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // 1. Запрашиваем токены у Keycloak
    const response = await fetch('http://192.168.3.6:8080/realms/prompts/protocol/openid-connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: 'react-client',
        grant_type: 'password',
        username,
        password,
        scope: 'openid profile email',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.error_description || 'Ошибка входа' },
        { status: 401 }
      );
    }

    const data = await response.json();

    // 2. Безопасно декодируем токен
    let tokenData;
    try {
      const parts = data.access_token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid token format');
      }
      const payload = parts[1];
      const decodedString = Buffer.from(payload, 'base64').toString('utf-8');
      tokenData = JSON.parse(decodedString);
    } catch (e) {
      console.error('Token decode error:', e);
      // Заглушка на случай ошибки
      tokenData = {
        sub: 'unknown',
        preferred_username: username,
        email: username.includes('@') ? username : '',
        name: username,
      };
    }

    const user = {
      id: tokenData.sub,
      username: tokenData.preferred_username || username,
      email: tokenData.email || (username.includes('@') ? username : ''),
      name: tokenData.name || username,
    };

    // 3. Создаем ответ с access_token в теле
    const nextResponse = NextResponse.json({
      access_token: data.access_token,
      user,
    });

    // 4. Устанавливаем refresh_token в httpOnly cookie
    nextResponse.cookies.set({
      name: 'refresh_token',
      value: data.refresh_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 дней
    });

    return nextResponse;

  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}