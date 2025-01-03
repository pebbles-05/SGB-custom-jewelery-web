"use client";
import React, { useState, useEffect } from "react";
import type { Product, SelectedFilteredData } from "@/interface/interfaces";
import StoreProductBox from "@/components/StoreProductBox";
import useProductList from "@/helpers/useProductList";
import { useSearchParams } from "next/navigation";
import StoreStatusBar from "@/components/StoreStatusBar";
import { SortingOptions } from "@/enums/enums";
import useCartList from "@/helpers/useCartList";
import useFilteredProductList from "@/helpers/useFilteredProductList";
import useCategoryList from "@/helpers/useCategoryList";
import useBestSellerList from "@/helpers/useBestSellerList";

const Store: React.FC = () => {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { getCartList, setCartListById, removeCartItemById } = useCartList();
  const [cartList, setcartList] = useState([]);
  const [bestSellerList, setBestSellerList] = useState<Product[]>([]);
  const [minPriceLimit, setMinPriceLimit] = useState(0);
  const [maxPriceLimit, setMaxPriceLimit] = useState(Infinity);
  const {
    data: productData,
    error: productDataError,
    isLoading: isProductDataLoading,
  } = useProductList();
  const { data: categoryList, isLoading: isCategoryDataLoading } =
    useCategoryList();

  const getMaxPrice = (productList: Product[]) => {
    if (!Array.isArray(productList) || productList.length === 0) {
      return null;
    }
    return productList.reduce((maxPrice, item) => {
      if (item.price && !isNaN(item.price)) {
        return item.price > maxPrice ? item.price : maxPrice;
      }
      return maxPrice;
    }, -Infinity);
  };
  const getMinPrice = (productList: Product[]) => {
    if (!Array.isArray(productList) || productList.length === 0) {
      return null;
    }
    return productList.reduce((minPrice, item) => {
      if (item.price && !isNaN(item.price)) {
        return item.price < minPrice ? item.price : minPrice;
      }
      return minPrice;
    }, Infinity);
  };

  const fetchCartItems = async () => {
    const cartList = await getCartList(); // Await the asynchronous function
    setcartList(cartList);
  };

  const getFilterOptionsFromURL = (): SelectedFilteredData => {
    return {
      search: searchParams?.get("search") || "",
      type: searchParams?.get("type") || "",
      category: searchParams?.get("category") || "",
      minPrice: parseFloat(searchParams.get("minPrice")),
      maxPrice: parseFloat(searchParams?.get("maxPrice")),
      sortingOption:
        searchParams?.get("sorting_option") || SortingOptions[0].name,
    };
  };

  useEffect(() => {
    const filterOptions = getFilterOptionsFromURL();
    const filteredData = useFilteredProductList(productData, filterOptions);
    const bestSellerList = useBestSellerList(filteredData, categoryList);
    setFilteredProducts(filteredData);
    setBestSellerList(bestSellerList);
    const maxPriceLimitByProductlist = getMaxPrice(productData);
    const minPriceLimitByProductlist = getMinPrice(productData);
    setMaxPriceLimit(maxPriceLimitByProductlist);
    setMinPriceLimit(minPriceLimitByProductlist);
  }, [searchParams, isProductDataLoading, isCategoryDataLoading]);

  useEffect(() => {
    fetchCartItems();
  }, [getCartList]);

  const handleAddToCart = async (id: string) => {
    await setCartListById(productData, id);
    fetchCartItems();
  };

  const handleRemoveFromCart = async (id: string) => {
    await removeCartItemById(id);
    fetchCartItems();
  };

  return (
    <div className="w-full flex flex-col gap-8 px-16 py-8 font-serif">
      <div className="md:ml-28">
        <StoreStatusBar
          minPriceLimit={minPriceLimit}
          maxPriceLimit={maxPriceLimit}
          categoryList={categoryList}
        />
      </div>
      {!isProductDataLoading &&
      !productDataError &&
      filteredProducts?.length ? (
        <div className="grid gap-14 md:grid-cols-3 lg-grid-cols-4 grid-cols-2 md:mx-56 xs:mx-5 ">
          {filteredProducts.map((product) => (
            <StoreProductBox
              key={product.id}
              id={product.id}
              name={product.name}
              img={product.img}
              price={product.price}
              onCartAdd={handleAddToCart}
              onCartRemove={handleRemoveFromCart}
              isCartClicked={
                cartList?.length
                  ? cartList?.some((item) => item.id === product.id)
                  : false
              }
              isBestSeller={bestSellerList?.some(
                (item) => item.id === product.id
              )}
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
