import { ChangeEvent, useState } from 'react';

import { Button, Input } from '@/shared/ui';
import { useOrderStore } from '@/entities/basket';

import styles from './CounterButton.module.scss';

export const CounterButton = ({
	id,
	title,
	price,
}: {
	id: number;
	title: string;
	price: number;
}) => {
	const [count, setCount] = useState(1);

	const { setCart, removeItem } = useOrderStore.getState();

	const handleDecrement = () => {
		if (count === 1) {
			removeItem(id);
			return;
		}
		setCount(count - 1);
		setCart({ title, id, quantity: count - 1, price });
	};

	const handleIncrement = () => {
		setCount(count + 1);
		setCart({ title, id, quantity: count + 1, price });
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setCount(Number(event.target.value));
		setCart({ title, id, quantity: Number(event.target.value), price });
	};

	return (
		<div className={styles.container}>
			<Button
				onClick={handleDecrement}
				text='-'
			/>
			<div className={styles.button}>
				<Input
					value={String(count)}
					tagType='input'
					className={styles.count}
					onChange={handleInputChange}
				/>
			</div>
			<Button
				onClick={handleIncrement}
				text='+'
			/>
		</div>
	);
};
