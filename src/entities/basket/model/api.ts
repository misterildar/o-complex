import { httpClient } from '@/shared';
import { OrderResponse, OrderRequest } from './types';

export const createOrder = (orderData: OrderRequest) => {
	return httpClient<OrderResponse>('post', '/order', orderData);
};
