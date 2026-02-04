export interface SkincareRequest {
  skin_type?: string;           // 'сухая', 'жирная'
  concerns?: string[];          // ['акне', 'сухость']
  desired_product_type?: string; // 'сыворотка', 'крем' (ЧТО ХОЧЕТ)
  budget?: string;
  brand_preference?: string[];
  exclude_ingredients?: string[];
  spf_needed?: boolean;
  age_group?: string;
  exclude_titles?: string[];
}

export interface SkincareProduct {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: string;
  price_range?: string;
  image?: string;
  recommended_product_type: string; // 'Гиалуроновая сыворотка', 'Увлажняющий крем' (ЧТО AI ПРЕДЛАГАЕТ)
  key_ingredients: string[];
  features: string[];
  reasons: string[];
  reasoning?: string;
  purchaseLink?: string;
  where_to_buy?: Array<{
    name: string;
    url: string;
    price: string;
  }>;
  tags: string[];
  rating?: number;
  size?: string;
  image_search_query?: string;
}

export interface SkincareResponse {
  products: SkincareProduct[];
  recommendations: string;
  generationId: string;
  alreadySuggested?: string[];
}

export interface SavedSkincare {
  id: string;
  productData: SkincareProduct;
  requestData: SkincareRequest;
  createdAt: Date;
  userComment?: string;
}