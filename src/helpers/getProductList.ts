import type { Product, SelectedFilteredData } from "@/interface/interfaces";
import producData from "@/enums/productData.json";
import {
  CategoryFilterOption,
  SortingOptions,
  TypeFilterOption,
} from "@/enums/enums";

const getProductList = async (
  options: SelectedFilteredData & { sortOrder?: string } = {}
): Promise<Product[]> => {
  const {
    search = "",
    type = "",
    category = "",
    minPrice = 0,
    maxPrice = Infinity,
    sortingOption = SortingOptions[0].name, // Default sort order
  } = options;

  const filteredData = producData.filter((item) => {
    const matchesQuery = search
      ? item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      : true;

    const matchesType =
      type && type !== TypeFilterOption[0].name
        ? item.type.toLowerCase() === type.toLowerCase()
        : true;

    const matchesCategory =
      category && category !== CategoryFilterOption[0].name
        ? item.category.toLowerCase() === category.toLowerCase()
        : true;

    const matchesPriceRange = item.price >= minPrice && item.price <= maxPrice;

    return matchesQuery && matchesType && matchesCategory && matchesPriceRange;
  });

  const sortedData = filteredData.sort((a, b) => {
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

export { getProductList };
