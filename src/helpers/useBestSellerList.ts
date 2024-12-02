import type { FilterOption, Product } from "@/interface/interfaces";

export default function useBestSellerList(
  productData: Product[],
  categoryList: FilterOption[]
) {
  if (
    productData &&
    categoryList &&
    Array.isArray(productData) &&
    Array.isArray(categoryList)
  ) {
    const bestSellerProductData = productData?.filter((product) => {
      const productTargetCount = categoryList?.find(
        (category) => category?.name === product?.category
      )?.targetOrderCount;
      if (productTargetCount === 0) {
        return true;
      } else if (productTargetCount && product?.order >= productTargetCount) {
        return true;
      } else {
        return false;
      }
    });
    return bestSellerProductData;
  }
}
