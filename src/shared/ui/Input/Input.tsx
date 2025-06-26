import { ChangeEvent, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	tagType?: string;
	className?: string;
}
export const Input = ({
	tagType = 'input',
	placeholder,
	className,
	onChange,
	...props
}: InputProps) => {
	return (
		<input
			maxLength={11}
			type={tagType}
			placeholder={placeholder}
			onChange={onChange}
			{...props}
			className={clsx(styles.input, className)}
		/>
	);
};
