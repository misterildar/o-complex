import { getProducts } from './api';
import { useProductCartStore } from './store';

const { setProducts } = useProductCartStore.getState();

export const fetchProductCart = async () => {
  const productsCart = await getProducts();
  setProducts(productsCart);
};
