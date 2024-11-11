import React from "react";
import producData from "@/enums/productData.json";
import StoreProductBox from "@/components/StoreProductBox";

const Store = () => {
  return (
    <div className="px-16 py-8 grid gap-14 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
      {producData?.length &&
        producData.map((product) => {
          return (
            <StoreProductBox
              key={product?.id}
              id={product?.id}
              name={product?.name}
              img={product?.img}
              price={product?.price}
            />
          );
        })}
    </div>
  );
};

export default Store;
