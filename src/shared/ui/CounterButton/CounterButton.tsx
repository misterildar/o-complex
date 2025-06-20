import clsx from 'clsx';
import { useState } from 'react';
import { Button } from '@/shared/ui';
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

  return (
    <div className={styles.container}>
      <Button onClick={handleDecrement} className={styles.button} text='-' />
      <div className={clsx(styles.button, styles.count)}>
        <p>{count}</p>
      </div>
      <Button onClick={handleIncrement} className={styles.button} text='+' />
    </div>
  );
};
