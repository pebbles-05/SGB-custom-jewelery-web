import type { Product } from "@/interface/interfaces";
import productData from "@/enums/productData.json";

const getProduct = (id: string | number): Product | undefined => {
  return productData.find((product) => product.id === id);
};

export { getProduct };
