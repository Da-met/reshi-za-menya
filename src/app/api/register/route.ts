// src/app/api/register/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, email, firstName, lastName, password } = await request.json();

    console.log('📝 Регистрация нового пользователя:', { username, email });

    // 1. Проверяем наличие секрета
    if (!process.env.KEYCLOAK_CLIENT_SECRET) {
      console.error('❌ KEYCLOAK_CLIENT_SECRET не найден в .env.local');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // 2. Получаем токен администратора
    console.log('🔑 Запрашиваем admin токен...');
    const tokenResponse = await fetch('http://192.168.3.6:8080/realms/prompts/protocol/openid-connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: 'admin-client',
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
        grant_type: 'client_credentials',
      }),
    });

    console.log('📥 Token response status:', tokenResponse.status);

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('❌ Token error:', errorText);
      
      // Пробуем распарсить ошибку
      try {
        const errorJson = JSON.parse(errorText);
        return NextResponse.json(
          { error: `Failed to get admin token: ${errorJson.error_description || errorJson.error}` },
          { status: 400 }
        );
      } catch {
        return NextResponse.json(
          { error: 'Failed to get admin token' },
          { status: 400 }
        );
      }
    }

    const tokenData = await tokenResponse.json();
    const adminToken = tokenData.access_token;
    console.log('✅ Admin token получен');

    // 3. Создаем пользователя
    console.log('👤 Создаем пользователя...');
    const createUserResponse = await fetch('http://192.168.3.6:8080/admin/realms/prompts/users', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        firstName,
        lastName,
        enabled: true,
        emailVerified: false,
        credentials: [{
          type: 'password',
          value: password,
          temporary: false
        }]
      }),
    });

    console.log('📥 Create user response status:', createUserResponse.status);

    if (!createUserResponse.ok) {
      const errorText = await createUserResponse.text();
      console.error('❌ Create user error:', errorText);
      
      try {
        const errorJson = JSON.parse(errorText);
        return NextResponse.json(
          { error: `Failed to create user: ${errorJson.errorMessage || errorJson.error}` },
          { status: 400 }
        );
      } catch {
        return NextResponse.json(
          { error: 'Failed to create user' },
          { status: 400 }
        );
      }
    }

    console.log('✅ Пользователь успешно создан');
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('❌ Registration API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}