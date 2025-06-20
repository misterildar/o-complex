import { api } from '@/shared/api';
import { Review } from './types';

export const getReviews = async (): Promise<Review[]> => {
  const response = await api.get<Review[]>('/reviews');
  return response.data;
};
