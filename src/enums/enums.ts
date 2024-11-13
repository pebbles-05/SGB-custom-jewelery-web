import type {
  CategoryFilterOption,
  NavbarOption,
  PriceRange,
  QueryParameter,
  TypeFilterOption,
} from "@/interface/interfaces";
import { v4 as uuid4 } from "uuid";
const NavbarOptions: NavbarOption[] = [
  {
    id: uuid4(),
    name: "About",
    route: "/about",
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
const productData = {
  images: [
    "https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG",
    "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?cs=srgb&dl=daylight-environment-forest-459225.jpg&fm=jpg",
    "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg",
  ],
  name: "Awesome Product",
  description: {
    category: "Electronics",
    type: "Gadget",
    description: "This is an awesome product that you will love!",
    // Add more fields as necessary
  },
  price: 99.99,
};

const TypeFilterOption: TypeFilterOption[] = [
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
const CategoryFilterOption: CategoryFilterOption[] = [
  {
    id: uuid4(),
    name: "All",
  },
  {
    id: uuid4(),
    name: "Necklace",
  },
  {
    id: uuid4(),
    name: "Earring",
  },
  {
    id: uuid4(),
    name: "Ring",
  },
  {
    id: uuid4(),
    name: "Anklet",
  },
  {
    id: uuid4(),
    name: "Set",
  },
];
const PriceRange: PriceRange = {
  min: [60, 100, 200, 300, 400, 500],
  max: [100, 200, 300, 400, 500, 600],
};
const QueryParameter: QueryParameter = {
  SEARCH: "search",
  TYPE: "type",
  CATEGORY: "category",
  MIN_PRICE: "minPrice",
  MAX_PRICE: "maxPrice",
};

export {
  NavbarOptions,
  TypeFilterOption,
  CategoryFilterOption,
  productData,
  PriceRange,
  QueryParameter,
};
