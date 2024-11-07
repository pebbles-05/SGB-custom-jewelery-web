import React from "react";
import producData from "@/enums/productData.json";
import Link from "next/link";

const Store = () => {
  return (
    <ul>
      {producData?.length &&
        producData.map((product) => {
          return (
            <ul key={product.id}>
              <Link href={`/store/${product?.id}`}>{product?.name}</Link>
            </ul>
          );
        })}
    </ul>
  );
};

export default Store;
