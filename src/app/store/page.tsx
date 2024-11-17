"use client";
import React, { useState, useEffect } from "react";
import type { Product, SelectedFilteredData } from "@/interface/interfaces";
import StoreProductBox from "@/components/StoreProductBox";
import { getProductList } from "@/helpers/getProductList";
import { useSearchParams } from "next/navigation";
import StoreStatusBar from "@/components/StoreStatusBar";
import {
  CategoryFilterOption,
  PriceRange,
  TypeFilterOption,
} from "@/enums/enums";

const Store: React.FC = () => {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [type, setType] = useState(TypeFilterOption[0]?.name);
  const [category, setCategory] = useState(CategoryFilterOption[0]?.name);
  const [minPrice, setMinPrice] = useState(PriceRange.min[0]);
  const [maxPrice, setMaxPrice] = useState(
    PriceRange.max[PriceRange.max.length - 1]
  );

  const getFilterOptionsFromURL = (): SelectedFilteredData => {
    return {
      search: searchParams.get("search") || "",
      type: searchParams.get("type") || TypeFilterOption[0]?.name,
      category: searchParams.get("category") || CategoryFilterOption[0]?.name,
      minPrice: parseFloat(searchParams.get("minPrice") || PriceRange.min[0]),
      maxPrice: parseFloat(
        searchParams.get("maxPrice") ||
          PriceRange.max[PriceRange.max.length - 1]
      ),
    };
  };

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const filterOptions = getFilterOptionsFromURL();
      setType(filterOptions.type);
      setCategory(filterOptions.category);
      setMinPrice(filterOptions.minPrice);
      setMaxPrice(filterOptions.maxPrice);
      const filteredData = await getProductList(filterOptions);
      setFilteredProducts(filteredData);
    };

    fetchFilteredProducts();
  }, [searchParams]);

  if (filteredProducts?.length) {
    return (
      <div className="w-full flex flex-col gap-8 px-16 py-8 font-serif">
        <StoreStatusBar
          type={type}
          category={category}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
        <div className="grid gap-14 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
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
