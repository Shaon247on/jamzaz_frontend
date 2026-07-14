/**
 * Product Types
 * Type definitions for product-related data structures
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  trending: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ProductDetailResponse {
  success: boolean;
  data: Product;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  createdAt: string;
}

export interface WishlistResponse {
  success: boolean;
  data: WishlistItem[];
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  productId?: string;
  timestamp: string;
  details?: Record<string, unknown>;
}

export interface ActivityLogsResponse {
  success: boolean;
  data: ActivityLog[];
}


export interface ProductRow {
  id: string;
  name: string;
  category: string;
  platform: string;
  viewer: number;
}