import { useState, useEffect } from "react";
import { api } from "@/api/fakeAPI";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    api
      .get(url, { signal: controller.signal })
      .then((res) => {
        setData(res.data);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== "CanceledError") {
          setError(err.message || "Gagal memuat data produk");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [url]);

  return { data, isLoading, error };
}
