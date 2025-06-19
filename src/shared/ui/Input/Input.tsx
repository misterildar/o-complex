import { ChangeEvent, forwardRef, InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      maxLength={11}
      {...props}
      ref={ref}
      className={styles.input}
      type="tel"
    />
  );
});

Input.displayName = "Input";
