import type { Product } from "@/interface/interfaces";

const useProduct = (
  productData: Product[],
  id: string | number
): Product | undefined => {
  if (Array.isArray(productData) && productData?.length) {
    return productData.find((product) => product.id === id);
  }
};

export default useProduct;
