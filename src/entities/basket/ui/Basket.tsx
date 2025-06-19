import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Input } from "@/shared/ui";
import styles from "./Basket.module.scss";
import { createOrder } from "@/shared/api/api";

interface BasketProps {
  productName: string;
  price: number;
  quantity: number;
}

interface FormValues {
  phone: string;
}

export const Basket = ({ productName, price, quantity }: BasketProps) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "all",
    defaultValues: { phone: "" },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const cleanedPhone = data.phone.replace(/\D/g, "");

    try {
      const orderData = {
        phone: cleanedPhone,
        cart: [
          { id: 12, quantity: 2 },
          { id: 15, quantity: 5 },
        ],
      };

      const response = await createOrder(orderData);

      if (response.success === 1) {
        alert("Заказ успешно создан!");
        reset(
          { phone: "" },
          { keepErrors: false, keepDirty: false, keepTouched: false }
        );
      } else {
        alert(
          "Ошибка при создании заказа: " +
            (response.error || "Неизвестная ошибка")
        );
      }
    } catch (error) {
      alert("Ошибка сети или сервера: " + error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.basket}>
      <h2 className={styles.title}>Добавленные товары</h2>
      <div className={styles.product}>
        <p>{productName}</p>
        <p>{price}</p>
        <p>{quantity}</p>
      </div>
      <div className={styles.wrapper}>
        <Input
          {...register("phone", {
            validate: (value) => {
              if (!value || value.trim() === "") return "Телефон обязателен";
              const digits = value.replace(/\D/g, "");
              return digits.length === 11 || "Телефон должен содержать 11 цифр";
            },
          })}
          placeholder="7 (___) ___ __-__"
        />
        {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}

        <Button text="Заказать" disabled={!isValid} type="submit" />
      </div>
    </form>
  );
};
