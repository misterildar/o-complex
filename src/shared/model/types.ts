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
