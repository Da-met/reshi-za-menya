export interface GiftRequest {
    category?: string;
    occasion?: string;
    profession?: string[];
    interests?: string[];
    personality?: string[];
    budget?: string;
    age?: string;
    giftTypes?: string[];
    gender?: string;
    excludeTitles?: string[];
  }
  
  export interface GiftResponse {
    gift: {
      id: string;
      title: string;
      description: string;
      type: "thing" | "experience" | "handmade";
      price_range: string;
      examples: string[];
      reasoning: string;
    };
    generationId: string;
  }
  
  export interface SavedGift {
    id: string;
    giftData: GiftResponse['gift'];
    requestData: GiftRequest;
    createdAt: Date;
    userComment?: string;
  }