// src/app/login/page.tsx
'use client'; // Добавляем эту директиву

import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/user-store';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useUserStore();

  const handleVKLogin = () => {
    // Здесь будет реальная OAuth логика
    console.log('VK login');
    
    // Временная заглушка - имитируем успешный вход
    login({
      id: '1', 
      email: 'user@vk.com', 
      name: 'Пользователь VK'
    });
    
    router.push('/'); // Перенаправляем на главную
  };

  const handleYandexLogin = () => {
    // Здесь будет реальная OAuth логика
    console.log('Yandex login');
    
    // Временная заглушка - имитируем успешный вход
    login({
      id: '2', 
      email: 'user@yandex.ru', 
      name: 'Пользователь Яндекс'
    });
    
    router.push('/'); // Перенаправляем на главную
  };

  return (
    <div className="min-h-screen bg-background py-6 md:py-8 lg:py-10">
      <div className="container mx-auto px-4 sm:px-6 max-w-md">
        
        {/* Заголовок */}
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <h1 className="
            text-4xl md:text-5xl lg:text-6xl 
            text-foreground
            mb-3 md:mb-4
          ">
            Вход
          </h1>
          <p className="
            text-base md:text-lg lg:text-xl
            text-muted-foreground
            mb-6 md:mb-8
          ">
            Войдите, чтобы получить персонализированные идеи
          </p>
        </div>

        {/* Социальные кнопки */}
        <div className="space-y-4 md:space-y-5">
          <button 
            onClick={handleVKLogin}
            className="
              w-full 
              bg-[#0077FF] 
              hover:bg-[#0066DD] 
              text-white 
              py-4 md:py-5
              px-6
              rounded-lg
              font-medium 
              transition-all
              text-lg
              shadow-lg
              hover:shadow-xl
              flex
              items-center
              justify-center
              space-x-3
            "
          >
            <span className="text-xl">🔓</span>
            <span>Продолжить с VK ID</span>
          </button>
          
          <button 
            onClick={handleYandexLogin}
            className="
              w-full 
              bg-[#FC3F1D] 
              hover:bg-[#E03515] 
              text-white 
              py-4 md:py-5
              px-6
              rounded-lg
              font-medium 
              transition-all
              text-lg
              shadow-lg
              hover:shadow-xl
              flex
              items-center
              justify-center
              space-x-3
            "
          >
            <span className="text-xl">🎯</span>
            <span>Продолжить с Яндекс</span>
          </button>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-8 md:mt-10 text-center">
          <p className="text-muted-foreground text-sm">
            Вход нужен для сохранения ваших предпочтений 
            и персонализации рекомендаций
          </p>
        </div>

      </div>
    </div>
  );
}