import { httpClient } from '@/shared';
import { ProductsResponse } from './types';

export const getProducts = (page: number = 1, page_size: number = 20) => {
  return httpClient<ProductsResponse>('get', '/products', {
    params: { page, page_size },
  });
};
