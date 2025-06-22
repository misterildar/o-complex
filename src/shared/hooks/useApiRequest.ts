import { useState } from 'react';

export function useApiRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = async <T>(
    request: () => Promise<T>
  ): Promise<T | undefined> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await request();
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Неизвестная ошибка');
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, sendRequest };
}
