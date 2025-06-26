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

interface CartItem {
	id: number;
	quantity: number;
}

export interface OrderRequest {
	phone: string;
	cart: CartItem[];
}

export interface OrderResponse {
	success: number;
	error?: string;
}
