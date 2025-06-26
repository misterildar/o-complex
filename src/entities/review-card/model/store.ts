import { create } from 'zustand';
import { Review } from './types';

export const useReviewStore = create<{
	reviews: Review[];
	setReviews: (review: Review[]) => void;
}>((set) => ({
	reviews: [],
	setReviews: (review) =>
		set(() => ({
			reviews: review,
		})),
}));
