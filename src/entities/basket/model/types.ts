export interface FormValues {
  phone: string;
}

export interface OrderStoreProps {
  cart: CartProps[];
  setCart: (cart: CartProps) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

export interface CartProps {
  id: number;
  quantity: number;
  title: string;
  price: number;
}

export type CartIdQuantity = Pick<CartProps, 'id' | 'quantity'>;
