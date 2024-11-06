import { NavbarOption } from "@/interface/interfaces";
import { v4 as uuid4 } from "uuid";
const NavbarOptions: NavbarOption[] = [
  {
    id: uuid4(),
    name: "About",
    route: "about",
  },
  {
    id: uuid4(),
    name: "Customize",
    route: "customize",
  },
  {
    id: uuid4(),
    name: "Store",
    route: "store",
  },
];

export { NavbarOptions };
