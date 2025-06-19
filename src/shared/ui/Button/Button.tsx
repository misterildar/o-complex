import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
}

export const Button = ({
  text,
  onClick,
  disabled,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles.button}
    >
      <p className={styles.text}>{text}</p>
    </button>
  );
};
