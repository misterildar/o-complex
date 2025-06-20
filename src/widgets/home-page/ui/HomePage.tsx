'use client';

import { useEffect } from 'react';

import { Basket } from '@/entities/basket';
import { ReviewCard } from '@/entities/review-card';
import { ProductCard } from '@/entities/product-card';
import { fetchReviews, useReviewStore } from '@/entities/review-card/';
import { fetchProductCart, useProductCartStore } from '@/entities/product-card';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  const products = useProductCartStore((state) => state.products);

  const reviews = useReviewStore((state) => state.reviews);

  useEffect(() => {
    fetchReviews();
    fetchProductCart();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <h1 className={styles.h1}>тестовое задание</h1>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.reviews}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} text={review.text} />
          ))}
        </div>
        <Basket />
        <div className={styles.products}>
          {products.map((product) => (
            <ProductCard
              id={product.id}
              key={product.id}
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
