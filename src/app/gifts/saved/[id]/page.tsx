// D:\МАЙО\JavaScript\ПРОЕКТЫ\РЕШИ ЗА МЕНЯ\reshi-za-menya\src\app\gifts\saved\[id]\page.tsx
'use client';

import { useState } from 'react';
import { ArrowLeft, Edit3, Trash2, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { SavedGift } from '@/types/gifts';
import { GiftProductCard, GiftRequestDetails } from '@/components/gifts';
import { CommentSection } from '@/components/ui/shared/CommentSection';





// Заглушка данных
const mockGiftData: SavedGift = {
  id: '1',
  giftData: {
    id: 'gift-1',
    title: 'Apple Watch Series 9',
    description: 'Умные часы с расширенными функциями здоровья, отслеживанием сна и фитнес-трекингом. Идеальный подарок для активных людей.',
    type: 'thing',
    price: '45 990 ₽',
    image: 'https://avatars.mds.yandex.net/get-mpic/12217350/2a0000019ac6619aef0632bce5cda107ad50/orig',
    brand: 'Apple',
    category: 'Электроника',
    features: [
      'Отслеживание сна и активности',
      'Фитнес-трекинг с GPS',
      'Водонепроницаемость 50м',
      'ЭКГ и измерение кислорода в крови',
    ],
    reasons: [
      'Практичный и современный гаджет',
      'Подходит для здоровья и спорта',
      'Стильный аксессуар для повседневной носки',
      'Высокое качество и надежность бренда',
    ],
    purchaseLink: 'https://www.apple.com/ru/watch/',
    tags: ['технологии', 'здоровье', 'премиум', 'гаджеты'],
    reasoning: 'Идеально подходит для активного человека, который следит за здоровьем и ведет современный образ жизни.',
  },
  requestData: {
    recipient_type: 'mother',
    gift_occasion: 'День рождения',
    interests_hobbies: ['спорт', 'технологии', 'здоровье'],
    profession: ['IT-специалист'],
    budget: '10000-15000',
    age: 'adult',
    gender: 'female',
  },
  createdAt: new Date('2024-01-15'),
  userComment: 'Идеально для мамы - она давно хотела умные часы для прогулок',
};

export default function GiftDetailPage({ }: { params: Promise<{ id: string }> }) {
  const [gift, setGift] = useState<SavedGift>(mockGiftData);
  console.log('🎁 gift.giftData:', gift.giftData);
  console.log('🖼️ gift.giftData.image:', gift.giftData.image);
  console.log('📦 Весь gift объект:', gift);
  const imageUrl = gift.giftData.image 
  ? gift.giftData.image
  : `https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=600&fit=crop&q=80`;

  // Обработка комментария
  const handleSaveComment = (comment: string) => {
    setGift(prev => ({
      ...prev,
      userComment: comment.trim(),
    }));
  };

  const handleDeleteComment = () => {
    setGift(prev => ({
      ...prev,
      userComment: undefined,
    }));
  };

  const giftWithImage = {
    ...gift.giftData,
    image: imageUrl,
  };


  return (
    <div className="min-h-screen bg-background py-6 md:py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Навигация */}
        <div className="mb-6 md:mb-8">
          <Link
            href="/gifts?view=saved"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Назад к моим подаркам
          </Link>
        </div>

        <div className="space-y-8">
          {/* Карточка подарка */}
          <GiftProductCard
            gift={giftWithImage}
            showPurchaseButtons={true}
          />

          {/* Детали запроса */}
          <GiftRequestDetails
            request={gift.requestData}
            createdAt={gift.createdAt}
          />

          {/* Комментарий */}
          <CommentSection
            comment={gift.userComment}
            onSave={handleSaveComment}
            onDelete={handleDeleteComment}
            placeholder="Напишите ваши мысли о подарке, почему выбрали именно его или для кого он подойдет..."
            title="Моя заметка"
            editIcon={<Edit3 size={18} />}
            deleteIcon={<Trash2 size={18} />}
            addIcon={<MessageCircle size={24} />}
            addText="Добавьте свою заметку"
            addDescription="Поделитесь мыслями о подарке или почему выбрали именно его"
          />
        </div>
      </div>
    </div>
  );
}