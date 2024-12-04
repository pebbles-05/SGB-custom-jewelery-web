"use client";
import useBestSellerList from "@/helpers/useBestSellerList";
import useCartList from "@/helpers/useCartList";
import useCategoryList from "@/helpers/useCategoryList";
import useProductList from "@/helpers/useProductList";
import useTypeList from "@/helpers/useTypeList";
import React from "react";

const test = () => {
  const { data: categoryList } = useCategoryList();
  const { data: productData } = useProductList();
  const { getCartList } = useCartList();
  const { data: typeList } = useTypeList();

  return (
    <div>
      <button onClick={() => useBestSellerList(productData, categoryList)}>
        get category
      </button>
      <button onClick={() => console.log(getCartList())}>get carts</button>
      <button onClick={() => console.log(typeList)}>get types</button>
    </div>
  );
};

export default test;
