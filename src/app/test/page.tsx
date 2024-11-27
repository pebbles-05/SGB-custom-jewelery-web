"use client";
import useBestSellerList from "@/helpers/useBestSellerList";
import useProductList from "@/helpers/useProductList";
import React from "react";

const test = () => {
  //const { data, isLoading, error } = useBestSellerList();
  const { data, isLoading, error } = useProductList();
  return (
    <div>
      <button onClick={() => console.log(data)}>get bestseller</button>
    </div>
  );
};

export default test;
