import clsx from 'clsx';
import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'reset' | 'submit';
  className?: string;
  loading?: boolean;
}

export const Button = ({
  text,
  onClick,
  disabled,
  loading,
  className,
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(className, styles.button)}
    >
      {loading ? (
        <div className={styles.spinner} aria-label='loading' />
      ) : (
        <p>{text}</p>
      )}
    </button>
  );
};
