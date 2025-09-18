export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  description: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  sortBy: string;
}