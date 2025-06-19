import axios from "axios";

const api = axios.create({
  baseURL: "http://o-complex.com:1337",
  headers: {
    "Content-Type": "application/json",
  },
});

interface Review {
  id: number;
  text: string;
}

interface Product {
  id: number;
  image_url: string;
  title: string;
  description: string;
  price: number;
}

interface ProductsResponse {
  page: number;
  amount: number;
  total: number;
  items: Product[];
}

interface CartItem {
  id: number;
  quantity: number;
}

interface OrderRequest {
  phone: string;
  cart: CartItem[];
}

interface OrderResponse {
  success: number;
  error?: string;
}

export const getReviews = async (): Promise<Review[]> => {
  const response = await api.get<Review[]>("/reviews");
  return response.data;
};

export const getProducts = async (
  page: number = 1,
  page_size: number = 20
): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>("/products", {
    params: { page, page_size },
  });
  return response.data;
};

export const createOrder = async (
  orderData: OrderRequest
): Promise<OrderResponse> => {
  const response = await api.post<OrderResponse>("/order", orderData);
  return response.data;
};

export default api;
