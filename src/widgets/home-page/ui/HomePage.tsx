'use client';

import { useCallback, useEffect, useState } from 'react';

import { Basket } from '@/entities/basket';
import { ProductCard } from '@/entities/product-card';
import { Review } from '@/entities/review-card/model/types';
import { useApiRequest } from '@/shared/hooks/useApiRequest';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { fetchProductCart, useProductCartStore } from '@/entities/product-card';
import { ReviewCard, fetchReviews, useReviewStore } from '@/entities/review-card/';
import { ProductRequestParams, ProductsResponse } from '@/entities/product-card/model/types';

import styles from './HomePage.module.scss';

export const HomePage = () => {
	const reviews = useReviewStore((state) => state.reviews);
	const setReviews = useReviewStore((state) => state.setReviews);

	const products = useProductCartStore((state) => state.products);
	const addProducts = useProductCartStore((state) => state.addProducts);

	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	const {
		error: reviewsError,
		isLoading: reviewsLoading,
		sendRequest: sendReviewsRequest,
	} = useApiRequest<Review[], void>();

	const {
		error: productsError,
		isLoading: productsLoading,
		sendRequest: sendProductsRequest,
	} = useApiRequest<ProductsResponse, ProductRequestParams>();

	useEffect(() => {
		sendReviewsRequest(fetchReviews).then((data) => {
			if (Array.isArray(data)) setReviews(data);
		});
	}, [sendReviewsRequest, setReviews]);

	useEffect(() => {
		sendProductsRequest(fetchProductCart, { page: 1, page_size: 20 }).then((data) => {
			if (data?.items) addProducts(data.items);
		});
	}, [addProducts, sendProductsRequest]);

	const loadMoreProducts = useCallback(() => {
		const nextPage = page + 1;
		sendProductsRequest(fetchProductCart, {
			page: nextPage,
			page_size: 20,
		}).then((data) => {
			if (data?.items && data.items.length > 0) {
				addProducts(data.items);
				setPage(nextPage);
			} else {
				setHasMore(false);
			}
		});
	}, [page, sendProductsRequest, addProducts]);

	const { triggerRef } = useInfiniteScroll({
		onLoadMore: loadMoreProducts,
		isLoading: productsLoading,
		hasMore,
		options: { threshold: 0.3 },
	});

	return (
		<section className={styles.section}>
			<div className={styles.title}>
				<h1 className={styles.h1}>тестовое задание</h1>
			</div>
			<div className={styles.reviews}>
				{reviewsLoading && <p>Загрузка отзывов...</p>}
				{reviewsError && <p style={{ color: 'red' }}>Ошибка: {reviewsError}</p>}
				{!reviewsLoading &&
					!reviewsError &&
					reviews.map((review) => (
						<ReviewCard
							key={review.id}
							text={review.text}
						/>
					))}
			</div>
			<Basket />
			<div className={styles.products}>
				{products.map((product, index) => (
					<ProductCard
						key={product.id}
						id={product.id}
						image_url={product.image_url}
						title={product.title}
						price={product.price}
						description={product.description}
						priority={index < 4}
					/>
				))}
			</div>
			<div ref={triggerRef} />
			{productsLoading && hasMore && <p>Загрузка товаров...</p>}
			{productsError && <p style={{ color: 'red' }}>Ошибка: {productsError}</p>}
		</section>
	);
};
