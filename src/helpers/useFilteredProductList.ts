import type { Product, SelectedFilteredData } from "@/interface/interfaces";
import { SortingOptions } from "@/enums/enums";

const useFilteredProductList = (
  productData: Product,
  options: SelectedFilteredData & { sortOrder?: string } = {}
): Product[] => {
  const {
    search = "",
    type = "",
    category = "",
    minPrice = 0,
    maxPrice = Infinity,
    sortingOption = SortingOptions[0].name,
  } = options;

  const filteredData = productData?.filter((item) => {
    const matchesQuery = search
      ? item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      : true;

    const matchesType = type
      ? item.type.toLowerCase() === type.toLowerCase()
      : true;

    const matchesCategory = category
      ? item.category.toLowerCase() === category.toLowerCase()
      : true;

    // Apply price range filter only if minPrice or maxPrice is non-zero/defined
    const matchesPriceRange =
      minPrice > 0 || maxPrice < Infinity // Only check if there's an active price range
        ? item.price >= minPrice && item.price <= maxPrice
        : true;

    return matchesQuery && matchesType && matchesCategory && matchesPriceRange;
  });

  const sortedData = filteredData?.sort((a, b) => {
    if (sortingOption === SortingOptions[0].name) {
      const dateA = new Date(a.date.split("/").reverse().join("-"));
      const dateB = new Date(b.date.split("/").reverse().join("-"));
      return dateB.getTime() - dateA.getTime();
    } else if (sortingOption === SortingOptions[1].name) {
      const dateA = new Date(a.date.split("/").reverse().join("-"));
      const dateB = new Date(b.date.split("/").reverse().join("-"));
      return dateA.getTime() - dateB.getTime();
    } else if (sortingOption === SortingOptions[2].name) {
      return a.price - b.price;
    } else if (sortingOption === SortingOptions[3].name) {
      return b.price - a.price;
    }
    return 0;
  });

  return sortedData;
};

export default useFilteredProductList;
