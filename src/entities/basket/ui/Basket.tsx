import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { createOrder } from '@/shared/api/api';
import { useOrderStore } from '@/entities/basket';
import { Button, Input, Modal } from '@/shared/ui';

import { FormValues, CartIdQuantity } from '../model/types';

import styles from './Basket.module.scss';

export const Basket = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'all',
    defaultValues: { phone: '' },
  });

  const [showModal, setShowModal] = useState(false);

  const basketStore = useOrderStore((store) => store.cart);

  const { clearCart } = useOrderStore.getState();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const cleanedPhone = data.phone.replace(/\D/g, '');

    try {
      const orderData = {
        phone: cleanedPhone,
        cart: basketStore.map(({ id, quantity }: CartIdQuantity) => ({
          id: id,
          quantity: quantity,
        })),
      };

      const response = await createOrder(orderData);

      if (response.success === 1) {
        setShowModal(true);
        reset(
          { phone: '' },
          { keepErrors: false, keepDirty: false, keepTouched: false }
        );
      } else {
        alert(
          'Ошибка при создании заказа: ' +
            (response.error || 'Неизвестная ошибка')
        );
      }
    } catch (error) {
      alert('Ошибка сети или сервера: ' + error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.basket}>
      <div className={styles.container}>
        <h2 className={styles.title}>Добавленные товары</h2>
        <button type='button' onClick={clearCart} className={styles.clear}>
          <p>Очистить корзину</p>
        </button>
      </div>
      {basketStore.map(({ title, price, quantity, id }) => (
        <div className={styles.product} key={id}>
          <p>{title}</p>
          <p>{price}</p>
          <p>{quantity}</p>
        </div>
      ))}
      <div className={styles.wrapper}>
        <Input
          {...register('phone', {
            validate: (value) => {
              if (!value || value.trim() === '') return 'Телефон обязателен';
              const digits = value.replace(/\D/g, '');
              return digits.length === 11 || 'Телефон должен содержать 11 цифр';
            },
          })}
          placeholder='7 (___) ___ __-__'
        />
        {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}

        <Button text='Заказать' disabled={!isValid} type='submit' />
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2>Вы успешно оформили заказ!</h2>
      </Modal>
    </form>
  );
};
