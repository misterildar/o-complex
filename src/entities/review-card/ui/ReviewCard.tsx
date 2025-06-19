import styles from "./ReviewCard.module.scss";

export const ReviewCard = ({ text }: { text: string }) => {
  return <div className={styles.card}>{text}</div>;
};
