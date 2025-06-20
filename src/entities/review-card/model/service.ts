import { getReviews } from './api';
import { useReviewStore } from './store';

const { setReviews } = useReviewStore.getState();

export const fetchReviews = async () => {
  const reviews = await getReviews();
  setReviews(reviews);
};
