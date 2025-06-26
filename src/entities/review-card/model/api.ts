import { httpClient } from '@/shared';
import { Review } from './types';

export const getReviews = async (): Promise<Review[]> => {
	return httpClient<Review[]>('get', '/reviews');
};
