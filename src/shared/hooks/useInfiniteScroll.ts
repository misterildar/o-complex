import { useCallback, useRef } from 'react';

interface UseInfiniteScrollOptions {
	onLoadMore: () => void;
	isLoading: boolean;
	hasMore: boolean;
	options?: IntersectionObserverInit;
}

export const useInfiniteScroll = ({
	onLoadMore,
	isLoading,
	hasMore,
	options,
}: UseInfiniteScrollOptions) => {
	const observer = useRef<IntersectionObserver | undefined>(undefined);

	const triggerRef = useCallback(
		(node: HTMLElement | null) => {
			if (isLoading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) onLoadMore();
			}, options);
			if (node) observer.current.observe(node);
		},
		[isLoading, hasMore, onLoadMore, options]
	);
	return { triggerRef };
};
