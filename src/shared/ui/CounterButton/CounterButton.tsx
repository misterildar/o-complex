import styles from "./CounterButton.module.scss";
import { useState } from "react";
import clsx from "clsx";

export const CounterButton = ({ onClick }: { onClick: () => void }) => {
  const [count, setCount] = useState(1);

  const handleDecrement = () => {
    if (count === 1) {
      onClick();
      return;
    }
    setCount(count - 1);
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div className={styles.container}>
      <button onClick={handleDecrement} className={styles.button}>
        <p className={styles.text}>-</p>
      </button>
      <div className={clsx(styles.button, styles.count)}>{count}</div>
      <button onClick={handleIncrement} className={styles.button}>
        <p className={styles.text}>+</p>
      </button>
    </div>
  );
};
