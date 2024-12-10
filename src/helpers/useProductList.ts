import { useState, useEffect, useCallback } from "react";
import type { FilterOption } from "@/interface/interfaces";
import { databases } from "@/helpers/appwrite";

export default function useProductList() {
  const [data, setData] = useState<FilterOption[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_PRODUCT_ID
      );
      const productList = result.documents;
      setData(productList);
      setError(null);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, isLoading, refetch: fetchData };
}
