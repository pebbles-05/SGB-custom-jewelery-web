import type {
  FilterOption,
  NavbarOption,
  QueryParameter,
} from "@/interface/interfaces";
import { v4 as uuid4 } from "uuid";
const NavbarOptions: NavbarOption[] = [
  {
    id: uuid4(),
    name: "About",
    route: "#about",
  },
  {
    id: uuid4(),
    name: "Customize",
    route: "/customize",
  },
  {
    id: uuid4(),
    name: "Store",
    route: "/store",
  },
];

const TypeFilterOption: FilterOption[] = [
  {
    id: uuid4(),
    name: "All",
  },
  {
    id: uuid4(),
    name: "Clay",
  },
  {
    id: uuid4(),
    name: "Cloth",
  },
  {
    id: uuid4(),
    name: "Oxidised",
  },
];
const CategoryFilterOption: FilterOption[] = [
  {
    id: uuid4(),
    name: "All",
    targetOrderCount: 0,
  },
  {
    id: uuid4(),
    name: "Necklace",
    targetOrderCount: 0,
  },
  {
    id: uuid4(),
    name: "Earring",
    targetOrderCount: 0,
  },
  {
    id: uuid4(),
    name: "Ring",
    targetOrderCount: 0,
  },
  {
    id: uuid4(),
    name: "Anklet",
    targetOrderCount: 0,
  },
  {
    id: uuid4(),
    name: "Set",
    targetOrderCount: 0,
  },
];

const QueryParameter: QueryParameter = {
  SEARCH: "search",
  TYPE: "type",
  CATEGORY: "category",
  MIN_PRICE: "minPrice",
  MAX_PRICE: "maxPrice",
  SORTING_OPTION: "sorting_option",
};
const SortingOptions: FilterOption[] = [
  {
    id: uuid4(),
    name: "Newer",
  },
  {
    id: uuid4(),
    name: "Older",
  },
  {
    id: uuid4(),
    name: "Price Accending",
  },
  {
    id: uuid4(),
    name: "Price Decending",
  },
];
const DefaultParams = {
  ALL: "All",
};

export {
  NavbarOptions,
  TypeFilterOption,
  CategoryFilterOption,
  QueryParameter,
  SortingOptions,
  DefaultParams,
};
