import { create } from 'zustand';

import { ProductStoreProps } from './types';

export const useProductCartStore = create<ProductStoreProps>((set) => ({
	products: [],
	productIds: new Set(),

	setProducts: (productsData) =>
		set(() => ({
			products: productsData,
			// При полной замене товаров, пересоздаем и Set с ID
			productIds: new Set(productsData.map((products) => products.id)),
		})),

	addProducts: (newProducts) => {
		set((state) => {
			// Фильтруем новые продукты, используя Set для проверки уникальности (O(1) сложность)
			const uniqueNewProducts = newProducts.filter(
				(newProduct) => !state.productIds.has(newProduct.id)
			);

			// Если нет действительно новых продуктов, ничего не делаем, чтобы избежать лишних ререндеров
			if (uniqueNewProducts.length === 0) {
				return state;
			}

			// Обновляем и массив продуктов, и Set с ID
			const newProductIds = new Set(state.productIds);
			uniqueNewProducts.forEach((products) => newProductIds.add(products.id));

			return {
				products: [...state.products, ...uniqueNewProducts],
				productIds: newProductIds,
			};
		});
	},
}));
