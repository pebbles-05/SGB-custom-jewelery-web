import { NavbarOption } from "@/interface/interfaces";
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
    'https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG',
    'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?cs=srgb&dl=daylight-environment-forest-459225.jpg&fm=jpg',
    'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg',
  ],
  name: 'Awesome Product',
  description: {
    category: 'Electronics',
    type: 'Gadget',
    description: 'This is an awesome product that you will love!',
    // Add more fields as necessary
  },
  price: 99.99,
};

export { NavbarOptions, productData };
