import { api } from '@/shared/api';
import { ProductsResponse } from './types';

export const getProducts = async (
  page: number = 1,
  page_size: number = 20
): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>('/products', {
    params: { page, page_size },
  });
  return response.data;
};
