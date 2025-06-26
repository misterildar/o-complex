import styles from './ReviewCard.module.scss';

export const ReviewCard = ({ text }: { text: string }) => {
	return (
		<div
			className={styles.card}
			dangerouslySetInnerHTML={{ __html: text }}
		></div>
	);
};
