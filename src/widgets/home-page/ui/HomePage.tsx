'use client';

import { useEffect } from 'react';

import { Basket } from '@/entities/basket';
import { ReviewCard } from '@/entities/review-card';
import { ProductCard } from '@/entities/product-card';
import { useApiRequest } from '@/shared/hooks/useApiRequest';
import { fetchReviews, useReviewStore } from '@/entities/review-card/';
import { fetchProductCart, useProductCartStore } from '@/entities/product-card';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  const reviews = useReviewStore((state) => state.reviews);
  const setReviews = useReviewStore((state) => state.setReviews);

  const products = useProductCartStore((state) => state.products);
  const setProducts = useProductCartStore((state) => state.setProducts);


  const {
    isLoading: reviewsLoading,
    error: reviewsError,
    sendRequest: sendReviewsRequest,
  } = useApiRequest();

  const {
    isLoading: productsLoading,
    error: productsError,
    sendRequest: sendProductsRequest,
  } = useApiRequest();

  useEffect(() => {
    sendReviewsRequest(fetchReviews).then((data) => {
      if (data) setReviews(data);
    });
  }, []);

  useEffect(() => {
    sendProductsRequest(fetchProductCart).then((data) => {
      if (data) setProducts(data);
    });
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <h1 className={styles.h1}>тестовое задание</h1>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.reviews}>
          {reviewsLoading && <p>Загрузка отзывов...</p>}
          {reviewsError && (
            <p style={{ color: 'red' }}>Ошибка: {reviewsError}</p>
          )}
          {!reviewsLoading &&
            !reviewsError &&
            reviews.map((review) => (
              <ReviewCard key={review.id} text={review.text} />
            ))}
        </div>
        <Basket />
        <div className={styles.products}>
          {productsLoading && <p>Загрузка товаров...</p>}
          {productsError && (
            <p style={{ color: 'red' }}>Ошибка: {productsError}</p>
          )}
          {!productsLoading &&
            !productsError &&
            products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image_url={product.image_url}
                title={product.title}
                price={product.price}
                description={product.description}
              />
            ))}
        </div>
      </div>
    </section>
  );
};
