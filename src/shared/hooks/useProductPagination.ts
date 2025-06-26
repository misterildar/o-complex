import { useState, useEffect, useCallback } from 'react';

import { useApiRequest } from '@/shared/hooks/useApiRequest';
import { fetchProductCart, useProductCartStore } from '@/entities/product-card';
import { ProductRequestParams, ProductsResponse } from '@/entities/product-card/model/types';

export const useProductPagination = () => {
	const setProducts = useProductCartStore((state) => state.setProducts);
	const addProducts = useProductCartStore((state) => state.addProducts);

	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	const { error, isLoading, sendRequest } = useApiRequest<ProductsResponse, ProductRequestParams>();

	useEffect(() => {
		sendRequest(fetchProductCart, { page: 1, page_size: 20 }).then((data) => {
			if (data?.items) {
				setProducts(data.items);
				if (data.items.length < 20) {
					setHasMore(false);
				}
			}
		});
	}, [sendRequest, setProducts]);

	const loadMore = useCallback(() => {
		if (isLoading || !hasMore) return;

		const nextPage = page + 1;
		sendRequest(fetchProductCart, { page: nextPage, page_size: 20 }).then((data) => {
			if (data?.items && data.items.length > 0) {
				addProducts(data.items);
				setPage(nextPage);
			} else {
				setHasMore(false);
			}
		});
	}, [page, isLoading, hasMore, sendRequest, addProducts]);

	return { isLoading, error, hasMore, loadMore };
};
