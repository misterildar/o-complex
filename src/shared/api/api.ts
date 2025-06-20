import axios from 'axios';
import { OrderResponse, OrderRequest } from '../model/types';

export const api = axios.create({
  baseURL: 'http://o-complex.com:1337',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createOrder = async (
  orderData: OrderRequest
): Promise<OrderResponse> => {
  const response = await api.post<OrderResponse>('/order', orderData);
  return response.data;
};

export default api;
