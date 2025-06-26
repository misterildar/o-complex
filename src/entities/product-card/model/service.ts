import { getProducts } from './api';
import { ProductsResponse, ProductRequestParams } from './types';

export const fetchProductCart = async (
	params?: ProductRequestParams
): Promise<ProductsResponse> => {
	if (!params) {
		throw new Error('Product request parameters are required to fetch products.');
	}
	return await getProducts(params);
};
