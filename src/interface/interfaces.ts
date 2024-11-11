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
  catogery?: string;
  availability?: boolean;
}
export type { NavbarOption, StoreProductBox };
