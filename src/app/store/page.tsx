"use client";
import React, { useState, useEffect } from "react";
import type { Product, SelectedFilteredData } from "@/interface/interfaces";
import StoreProductBox from "@/components/StoreProductBox";
import useProductList from "@/helpers/useProductList";
import { useSearchParams } from "next/navigation";
import StoreStatusBar from "@/components/StoreStatusBar";
import { PriceRange, SortingOptions } from "@/enums/enums";
import useCartList from "@/helpers/useCartList";
import useFilteredProductList from "@/helpers/useFilteredProductList";

const Store: React.FC = () => {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { getCartList, setCartListById, removeCartItemById } = useCartList();
  const [cartList, setcartList] = useState(getCartList());
  const {
    data: productData,
    error: productDataError,
    isLoading: isProductDataLoading,
  } = useProductList();

  const getFilterOptionsFromURL = (): SelectedFilteredData => {
    return {
      search: searchParams?.get("search") || "",
      type: searchParams?.get("type") || "",
      category: searchParams?.get("category") || "",
      minPrice: parseFloat(searchParams.get("minPrice") || PriceRange.min[0]),
      maxPrice: parseFloat(
        searchParams?.get("maxPrice") ||
          PriceRange?.max[PriceRange?.max.length - 1]
      ),
      sortingOption:
        searchParams?.get("sorting_option") || SortingOptions[0].name,
    };
  };

  useEffect(() => {
    const filterOptions = getFilterOptionsFromURL();
    const filteredData = useFilteredProductList(productData, filterOptions);
    setFilteredProducts(filteredData);
  }, [searchParams, isProductDataLoading]);

  const handleAddToCart = (id: string) => {
    setCartListById(productData, id);
    const currentCartList = getCartList();
    setcartList(currentCartList);
  };

  const handleRemoveFromCart = (id: string) => {
    removeCartItemById(id);
    setcartList(getCartList());
  };

  return (
    <div className="w-full flex flex-col gap-8 px-16 py-8 font-serif">
      <div className="md:ml-28">
        <StoreStatusBar />
      </div>
      {!isProductDataLoading &&
      !productDataError &&
      filteredProducts?.length ? (
        <div className="grid gap-14 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:mx-28 xs:mx-5 ">
          {filteredProducts.map((product) => (
            <StoreProductBox
              key={product.id}
              id={product.id}
              name={product.name}
              img={product.img}
              price={product.price}
              onCartAdd={handleAddToCart}
              onCartRemove={handleRemoveFromCart}
              isCartClicked={cartList?.some((item) => item.id === product.id)}
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
