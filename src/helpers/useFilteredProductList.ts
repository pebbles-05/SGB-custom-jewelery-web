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
    const parseCustomDate = (dateStr: string): Date => {
      const [year, day, month] = dateStr.split("/").map(Number); // Split and convert to numbers
      return new Date(`20${year}`, month - 1, day); // Construct the date
    };

    if (sortingOption === SortingOptions[0].name) {
      const dateA = parseCustomDate(a.date);
      const dateB = parseCustomDate(b.date);
      return dateB.getTime() - dateA.getTime(); // Sort descending
    } else if (sortingOption === SortingOptions[1].name) {
      const dateA = parseCustomDate(a.date);
      const dateB = parseCustomDate(b.date);
      return dateA.getTime() - dateB.getTime(); // Sort ascending
    } else if (sortingOption === SortingOptions[2].name) {
      return a.price - b.price; // Sort by price ascending
    } else if (sortingOption === SortingOptions[3].name) {
      return b.price - a.price; // Sort by price descending
    }

    return 0;
  });

  return sortedData;
};

export default useFilteredProductList;
