"use client";

import { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import { getReviews, getProducts } from "@/shared/api/api";
import { ReviewCard } from "@/entities/review-card";
import { ProductCard } from "@/entities/product-card";
import { Basket } from "@/entities/basket";

interface Review {
  id: number;
  text: string;
}

interface Product {
  id: number;
  image_url: string;
  price: number;
  title: string;
  description: string;
}

export const HomePage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviews = await getReviews();
      if (reviews) {
        setReviews(reviews);
      }
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      if (products) {
        setProducts(products.items);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <h1 className={styles.h1}>тестовое задание</h1>
      </div>
      <div className={styles.reviews}>
        {reviews.map((review) => (
          <ReviewCard key={review.id} text={review.text} />
        ))}
      </div>
      <Basket productName="Товар11" price={80} quantity={3} />
      <div className={styles.products}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            imageUrl={product.image_url}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
    </section>
  );
};
