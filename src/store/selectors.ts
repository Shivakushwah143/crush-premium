import { selector } from 'recoil';
import { cartState, wishlistState } from './atoms';

export const cartTotalSelector = selector({
  key: 'cartTotalSelector',
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  },
});

export const cartCountSelector = selector({
  key: 'cartCountSelector',
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce((count, item) => count + item.quantity, 0);
  },
});

export const wishlistCountSelector = selector({
  key: 'wishlistCountSelector',
  get: ({ get }) => {
    const wishlist = get(wishlistState);
    return wishlist.length;
  },
});