export interface User {
  id: string;
  email: string;
  name: string;
  type: 'customer' | 'shopkeeper';
  phone?: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  inStock: boolean;
  shopId: string;
  description?: string;
}

export interface Shop {
  id: string;
  name: string;
  ownerId: string;
  address: string;
  phone: string;
  openingHours: string;
  verified: boolean;
  distance?: number;
  latitude: number;
  longitude: number;
  products: Product[];
}

export interface ChatMessage {
  id: string;
  message: string;
  response: string;
  timestamp: Date;
  userType: 'customer' | 'shopkeeper';
}

export type Language = 'en' | 'hi' | 'mr';

export interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    mr: string;
  };
}