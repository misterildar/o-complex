import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { OrderStoreProps } from './types';

export const useOrderStore = create(
	persist<OrderStoreProps>(
		(set) => ({
			cart: [],

			setCart: (cartItem) =>
				set((state) => {
					const existingItemIndex = state.cart.findIndex((item) => item.id === cartItem.id);

					if (existingItemIndex !== -1) {
						const updatedCart = [...state.cart];
						updatedCart[existingItemIndex] = {
							...updatedCart[existingItemIndex],
							quantity: cartItem.quantity,
						};
						return { cart: updatedCart };
					}

					return { cart: [...state.cart, cartItem] };
				}),

			removeItem: (id: number) =>
				set((state) => ({
					cart: state.cart.filter((item) => item.id !== id),
				})),

			clearCart: () =>
				set(() => ({
					cart: [],
				})),
		}),
		{
			name: 'order-storage',
		}
	)
);
