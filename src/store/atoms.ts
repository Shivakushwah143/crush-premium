import { atom } from 'recoil';
import { CartItem, Product, FilterState } from '../types';

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: [],
});

export const wishlistState = atom<Product[]>({
  key: 'wishlistState',
  default: [],
});

export const filterState = atom<FilterState>({
  key: 'filterState',
  default: {
    category: 'all',
    priceRange: [0, 10000],
    sizes: [],
    colors: [],
    sortBy: 'name',
  },
});

export const searchState = atom<string>({
  key: 'searchState',
  default: '',
});