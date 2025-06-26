import { getReviews } from './api';
import { Review } from './types';

export const fetchReviews = async (): Promise<Review[]> => {
	return await getReviews();
};
