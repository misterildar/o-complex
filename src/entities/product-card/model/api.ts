import { httpClient } from '@/shared';
import { ProductsResponse } from './types';

export const getProducts = ({ page, page_size }: { page?: number; page_size?: number }) => {
	return httpClient<ProductsResponse>('get', '/products', {
		params: { page, page_size },
	});
};
