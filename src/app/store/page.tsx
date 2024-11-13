"use client";
import React, { useState, useEffect } from "react";
import type { Product, SelectedFilteredData } from "@/interface/interfaces";
import StoreProductBox from "@/components/StoreProductBox";
import { getProductList } from "@/helpers/getProductList";
import { useSearchParams } from "next/navigation";

const Store: React.FC = () => {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const getFilterOptionsFromURL = (): SelectedFilteredData => {
    return {
      search: searchParams.get("search") || "",
      type: searchParams.get("type") || "",
      category: searchParams.get("category") || "",
      minPrice: parseFloat(searchParams.get("minPrice") || "0"),
      maxPrice: parseFloat(searchParams.get("maxPrice") || "Infinity"),
    };
  };

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const filterOptions = getFilterOptionsFromURL();
      const filteredData = await getProductList(filterOptions);
      setFilteredProducts(filteredData);
      console.log(filterOptions, filteredData);
    };

    fetchFilteredProducts();
  }, [searchParams]);

  if (filteredProducts?.length) {
    return (
      <div className="px-16 py-8 grid gap-14 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {filteredProducts.map((product) => (
          <StoreProductBox
            key={product.id}
            id={product.id}
            name={product.name}
            img={product.img}
            price={product.price}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="w-full h-[calc(100vh-80px)] flex items-center justify-center text-2xl text-custom-black/50">
        No Products have matched the filter
      </div>
    );
  }
};

export default Store;
