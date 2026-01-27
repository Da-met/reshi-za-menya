export interface SkincareRequest {
  skin_type?: string;           // тип кожи
  concerns?: string[];          // проблемы кожи
  product_type?: string;        // тип продукта
  budget?: string;              // бюджет
  brand_preference?: string[];  // предпочитаемые бренды
  exclude_ingredients?: string[]; // исключаемые ингредиенты
  spf_needed?: boolean;         // нужен ли SPF
  age_group?: string;          // возрастная группа
}

export interface SkincareProduct {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: string;
  price_range?: string;
  image?: string;
  category?: string;
  type?: string;               // 'face_cream', 'serum', 'toner', etc.
  key_ingredients: string[];
  features: string[];
  reasons: string[];           // почему хорошее средство
  reasoning?: string;          // почему подходит под критерии
  purchaseLink?: string;
  where_to_buy?: Array<{
    name: string;
    url: string;
    price: string;
  }>;
  tags: string[];
  rating?: number;
  size?: string;
}

export interface SkincareResponse {
  products: SkincareProduct[];
  recommendations: string;
  generationId: string;
}

export interface SavedSkincare {
  id: string;
  productData: SkincareProduct;
  requestData: SkincareRequest;
  createdAt: Date;
  userComment?: string;
}