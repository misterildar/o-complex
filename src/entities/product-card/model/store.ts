import { create } from 'zustand';

import { ProductStoreProps } from './types';

export const useProductCartStore = create<ProductStoreProps>((set) => ({
  products: [],
  setProducts: (productsData) =>
    set(() => ({
      products: productsData.items,
    })),
}));
