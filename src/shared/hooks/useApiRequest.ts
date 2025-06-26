import { useState, useCallback, useRef } from 'react';

export const useApiRequest = <T, P>(initialData?: T) => {
	const [data, setData] = useState<T | undefined>(initialData);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const loadingTimer = useRef<NodeJS.Timeout | null>(null);

	const sendRequest = useCallback(async (requestFn: (params?: P) => Promise<T>, params?: P) => {
		setError(null);

		loadingTimer.current = setTimeout(() => {
			setIsLoading(true);
		}, 300);

		try {
			const result = await requestFn(params);
			setData(result);
			return result;
		} catch (e: unknown) {
			if (e instanceof Error) {
				setError(e.message || 'Что-то пошло не так');
			} else {
				setError('Что-то пошло не так');
			}
			return undefined;
		} finally {
			if (loadingTimer.current) {
				clearTimeout(loadingTimer.current);
			}
			setIsLoading(false);
		}
	}, []);

	return { data, isLoading, error, sendRequest };
};
