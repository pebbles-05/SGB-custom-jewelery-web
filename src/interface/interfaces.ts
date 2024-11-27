interface Product {
  id: string;
  img: string;
  relatedImages: string[];
  name: string;
  description: string;
  price: number;
  type: string;
  category: string;
  order: number;
  availability: boolean;
}
interface NavbarOption {
  id: string;
  name: string;
  route: string;
}
interface StoreProductBox {
  id: string;
  img: string;
  name: string;
  price: number;
  type?: string;
  Category?: string;
  availability?: boolean;
  isCartClicked: boolean;
  onCartAdd?: (id: string) => void;
  onCartRemove?: (id: string) => void;
}
interface Modal {
  children: React.ReactNode;
  containerClass: string;
  isOpen: boolean;
  onClickOutside?: () => void;
}
interface FilterOption {
  id: string;
  name: string;
  targetOrderCount?: number;
}
interface FilterOptionComponent {
  typeFilterOptions?: FilterOption[];
  categoryFilterOptions?: FilterOption[];
  containerClass: string;
  selectedType?: string;
  selectedCategory?: string;
  selectedMinPrice: number;
  selectedMaxPrice: number;
  onFilterSubmit: (selectedFilters: {
    type: string;
    category: string;
    maxPrice: number;
    minPrice: number;
  }) => void;
  onClear: () => void;
}
interface SelectedFilteredData {
  search?: string;
  type: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  sortingOption?: string;
}
interface PriceRange {
  min: number[];
  max: number[];
}
interface QueryParameter {
  SEARCH: string;
  TYPE: string;
  CATEGORY: string;
  MIN_PRICE: string;
  MAX_PRICE: string;
  SORTING_OPTION: string;
}
export type {
  Product,
  NavbarOption,
  StoreProductBox,
  Modal,
  FilterOption,
  FilterOptionComponent,
  SelectedFilteredData,
  PriceRange,
  QueryParameter,
};
