"use client";
import React, { useState, useEffect } from "react";
import type { Product, SelectedFilteredData } from "@/interface/interfaces";
import StoreProductBox from "@/components/StoreProductBox";
import { getProductList } from "@/helpers/getProductList";
import { useRouter, useSearchParams } from "next/navigation";
import StoreStatusBar from "@/components/StoreStatusBar";
import {
  CategoryFilterOption,
  PriceRange,
  SortingOptions,
  TypeFilterOption,
} from "@/enums/enums";
import Bg from "@/components/Bg";
import useCartList from "@/helpers/useCartList";
import Cookies from "js-cookie";
import { Router } from "next/router";

const Store: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { getCartList, setCartListById, removeCartItemById } = useCartList();
  const [cartList, setcartList] = useState(getCartList());

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

  //useEffect(() => {
  //  // Reload cookies when route changes back to /store
  //  const handleRouteChange = (url) => {
  //    if (url === "/store") {
  //      setcartList(getCartList());
  //    }
  //  };
  //
  //  Router.events.on("routeChangeComplete", handleRouteChange);
  //
  //  return () => {
  //    Router.events.off("routeChangeComplete", handleRouteChange);
  //  };
  //}, []);

  const handleAddToCart = (id: string) => {
    setCartListById(id);
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
        <button
          onClick={() => {
            const currentCartlist = getCartList();
            console.log(currentCartlist);
          }}
        >
          show cart
        </button>
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
