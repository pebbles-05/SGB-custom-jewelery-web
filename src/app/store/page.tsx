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
  SortingOptions,
  TypeFilterOption,
} from "@/enums/enums";
import Bg from "@/components/Bg";

const Store: React.FC = () => {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

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
      sortingOption:
        searchParams.get("sorting_option") || SortingOptions[0].name,
    };
  };

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const filterOptions = getFilterOptionsFromURL();
      const filteredData = await getProductList(filterOptions);
      setFilteredProducts(filteredData);
    };

    fetchFilteredProducts();
  }, [searchParams]);
  return (
    <div className="w-full flex flex-col gap-8 px-16 py-8 font-serif">
      <div className="md:mx-auto">
        <StoreStatusBar />
      </div>
      {filteredProducts?.length ? (
        <div className="grid gap-14 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:mx-28 xs:mx-5 ">
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
      ) : (
        <div className="w-full h-[calc(100vh-300px)] flex items-center justify-center text-2xl text-custom-black/50">
          No Products have matched the filter
        </div>
      )}
    </div>
  );
};

export default Store;
