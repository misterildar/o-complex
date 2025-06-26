import Image from 'next/image';
import { useState } from 'react';

import { Product } from '@/entities/product-card';
import { useOrderStore } from '@/entities/basket';
import { Button, CounterButton } from '@/shared/ui';
import { PLACEHOLDER_IMAGE } from '@/shared/lib/constants';

import styles from './ProductCard.module.scss';

export const ProductCard = ({
	id,
	title,
	price,
	image_url,
	description,
	priority = false,
}: Product) => {
	const [src, setSrc] = useState(image_url);

	const { setCart } = useOrderStore.getState();

	const cart = useOrderStore((state) => state.cart);

	const isInCart = cart.some((item) => item.id === id);

	const handleAddToCart = () => {
		setCart({ title, id, quantity: 1, price });
	};

	return (
		<div className={styles.card}>
			<Image
				src={src}
				alt={title}
				width={281}
				height={366}
				onError={() => setSrc(PLACEHOLDER_IMAGE)}
				className={styles.image}
				unoptimized
				priority={priority}
			/>
			<h2 className={styles.title}>{title}</h2>
			<p className={styles.description}>{description}</p>
			<p className={styles.price}>Цена: {price} ₽</p>
			{isInCart ? (
				<CounterButton
					id={id}
					title={title}
					price={price}
				/>
			) : (
				<Button
					text='Купить'
					onClick={handleAddToCart}
				/>
			)}
		</div>
	);
};
