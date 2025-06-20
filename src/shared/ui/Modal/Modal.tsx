import { useEffect, useRef } from 'react';

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

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
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
    <dialog ref={dialogRef} className='modal' onCancel={onClose}>
      <button
        className='modal-close'
        onClick={onClose}
        aria-label='Закрыть модальное окно'
      >
        &times;
      </button>
      <div className='modal-content'>{children}</div>

      <style jsx>{`
        dialog.modal {
          border: none;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
          max-width: 500px;
          width: 90%;
        }
        dialog::backdrop {
          background: rgba(0, 0, 0, 0.5);
        }
        .modal-close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: transparent;
          border: none;
          font-size: 28px;
          cursor: pointer;
          line-height: 1;
        }
        .modal-content {
          margin-top: 30px;
        }
      `}</style>
    </dialog>
  );
};
