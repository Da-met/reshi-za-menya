export interface GiftRequest {
  recipient_type?: string;
  gift_occasion?: string;
  profession?: string[];
  interests_hobbies?: string[];
  temperament?: string[];
  budget?: string;
  age?: string;
  gift_format?: string[];
  gender?: string;
  excludeTitles?: string[];
}

export interface GiftResponse {
  gift: {
    id: string;
    title: string;
    description: string;
    type: string;
    price: string; // изменил с price_range на price
    image?: string; // новое поле
    brand?: string; // новое поле
    category?: string; // новое поле
    features?: string[]; // новое поле (вместо examples)
    reasons?: string[]; // новое поле
    purchaseLink?: string; // новое поле
    tags?: string[]; // новое поле
    reasoning: string;
    // сохраняем examples для обратной совместимости
    examples?: string[];
    // сохраняем price_range для обратной совместимости  
    price_range?: string;
  };
  generationId: string;
}

export interface SavedGift {
  id: string;
  giftData: GiftResponse['gift'];
  requestData: GiftRequest;
  createdAt: Date;
  userComment?: string;
  isCommentEditing?: boolean; // флаг редактирования
}

// Добавляем алиас для удобства
export type SavedGiftType = SavedGift;