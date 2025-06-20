import clsx from 'clsx';
import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'reset' | 'submit';
  className?: string;
}

export const Button = ({
  text,
  onClick,
  disabled,
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
      <p className={styles.text}>{text}</p>
    </button>
  );
};
