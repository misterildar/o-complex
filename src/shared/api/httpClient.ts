import { api } from './api';

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export const httpClient = <T>(method: HttpMethod, url: string, config?: unknown) => {
	return api[method]<T>(url, config)
		.then((res) => res.data)
		.catch((error) => {
			throw new Error(`API Error: ${error.message}`);
		});
};
