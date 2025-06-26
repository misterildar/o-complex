import { useEffect, useRef } from 'react';

import styles from './Modal.module.scss';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isOpen) {
			if (!dialog.open) dialog.showModal();
		} else {
			if (dialog.open) dialog.close();
		}
	}, [isOpen, onClose]);

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('body-no-scroll');
		} else {
			document.body.classList.remove('body-no-scroll');
		}

		return () => {
			document.body.classList.remove('body-no-scroll');
		};
	}, [isOpen]);

	return (
		<dialog
			ref={dialogRef}
			className={styles.modal}
			onCancel={onClose}
		>
			<button
				type='button'
				className={styles.close}
				onClick={onClose}
				aria-label='Закрыть модальное окно'
			>
				&times;
			</button>
			<div className={styles.content}>{children}</div>
		</dialog>
	);
};
