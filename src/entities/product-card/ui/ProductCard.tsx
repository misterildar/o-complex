import { useState } from "react";
import Image from "next/image";
import styles from "./ProductCard.module.scss";
import { Button, CounterButton } from "@/shared/ui";

interface ProductProps {
  imageUrl: string;
  title: string;
  price: number;
  description: string;
}

const PLACEHOLDER_IMAGE = "/placeholder.png";

export const ProductCard = ({
  imageUrl,
  title,
  price,
  description,
}: ProductProps) => {
  const [src, setSrc] = useState(imageUrl);

  const [isCounter, setIsCounter] = useState(false);

  const handleClick = () => {
    setIsCounter((prev) => !prev);
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
      />
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Цена: {price} ₽</p>
      {isCounter ? (
        <CounterButton onClick={handleClick} />
      ) : (
        <Button text="Купить" onClick={handleClick} />
      )}
    </div>
  );
};
