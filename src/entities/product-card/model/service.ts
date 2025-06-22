import { getProducts } from './api';
import { ProductsResponse } from './types';

export const fetchProductCart = async (): Promise<ProductsResponse> => {
  return await getProducts();
};
