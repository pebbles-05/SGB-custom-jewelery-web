import { useState, useEffect } from "react";
import type { FilterOption } from "@/interface/interfaces";
import { databases } from "@/helpers/appwrite"; // Reuse the existing instance from appwrite.ts

export default function useProductList() {
  const [data, setData] = useState<FilterOption[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await databases.listDocuments(
          process.env.NEXT_PUBLIC_DATABASE_ID,
          process.env.NEXT_PUBLIC_PRODUCT_ID
        );
        const productList = result.documents;
        setData(productList);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, error, isLoading };
}
