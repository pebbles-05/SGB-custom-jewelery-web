import type { Product } from "@/interface/interfaces";
import producData from "@/enums/productData.json";

const getProduct = async (id: string): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    const product = producData.find((item) => item.id === id);
    resolve(product);
  });
};

export { getProduct };
