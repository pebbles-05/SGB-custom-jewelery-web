import type { Product } from "@/interface/interfaces";
import producData from "@/enums/productData.json";

const getProduct = (id: string | number): Product | undefined => {
  return producData.find((product) => product.id === id);
};

export { getProduct };
