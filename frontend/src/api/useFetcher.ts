import { useEffect, useState } from "react";

export const useApi = <T = unknown>(f: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleFetch = async () => {
      setLoading(true);
      try {
        const result = await f();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    handleFetch();
  }, [f]);

  return { data, error, loading };
};
