import { useState, useEffect } from "react";
import type { FilterOption } from "@/interface/interfaces";

export default function useTypeList() {
  const [data, setData] = useState<FilterOption[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/sgb-jewelry-type");

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const result: FilterOption[] = await response.json();
        setData(result);
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
