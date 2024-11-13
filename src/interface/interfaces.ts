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
  type: string;
  category: string;
  minPrice: number;
  maxPrice: number;
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
}
export type {
  NavbarOption,
  StoreProductBox,
  Modal,
  FilterOption,
  FilterOptionComponent,
  SelectedFilteredData,
  PriceRange,
  QueryParameter,
};
