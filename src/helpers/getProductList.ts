import type { Product, SelectedFilteredData } from "@/interface/interfaces";
import producData from "@/enums/productData.json";

const getProductList = async (
  options: SelectedFilteredData = {}
): Promise<Product[]> => {
  const {
    search = "",
    type = "",
    category = "",
    minPrice = 0,
    maxPrice = Infinity,
  } = options;

  return producData.filter((item) => {
    const matchesQuery = search
      ? item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      : true;

    const matchesType =
      type && type !== "All"
        ? item.type.toLowerCase() === type.toLowerCase()
        : true;

    const matchesCategory =
      category && category !== "All"
        ? item.category.toLowerCase() === category.toLowerCase()
        : true;

    const matchesPriceRange = item.price >= minPrice && item.price <= maxPrice;

    return matchesQuery && matchesType && matchesCategory && matchesPriceRange;
  });
};

export { getProductList };
