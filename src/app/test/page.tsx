"use client";
import useBestSellerList from "@/helpers/useBestSellerList";
import useCategoryList from "@/helpers/useCategoryList";
import useProductList from "@/helpers/useProductList";
import React from "react";

const test = () => {
  const { data, isLoading, error } = useCategoryList();
  return (
    <div>
      <button onClick={() => console.log({ data })}>get category</button>
    </div>
  );
};

export default test;
