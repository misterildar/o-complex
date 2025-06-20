export interface ProductsResponse {
  page: number;
  amount: number;
  total: number;
  items: Product[];
}

export interface Product {
  id: number;
  image_url: string;
  title: string;
  description: string;
  price: number;
}

export interface ProductStoreProps {
  products: Product[];
  setProducts: (productsData: ProductsResponse) => void;
}
