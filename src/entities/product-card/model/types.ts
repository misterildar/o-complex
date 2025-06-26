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
	priority?: boolean;
}

export interface ProductStoreProps {
	products: Product[];
	productIds: Set<number>;
	setProducts: (productsData: Product[]) => void;
	addProducts: (newProducts: Product[]) => void;
}

export interface ProductRequestParams {
	page: number;
	page_size: number;
}
