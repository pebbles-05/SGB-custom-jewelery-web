import { NavbarOptions } from "@/enums/enums";
import { NavbarOption } from "@/interface/interfaces";
import Link from "next/link";
import React from "react";

const Navbar = ({ options = NavbarOptions }: { options?: NavbarOption[] }) => {
  return (
    <div className="flex items-center px-16 text-xl sticky top-0 inset-y-0 h-16 bg-black/60 text-white gap-4 z-50">
      <Link className="mr-4" href="/">
        LOGO
      </Link>
      {options?.length
        ? options.map((item: NavbarOption) => {
            return (
              <Link href={item.route} key={item.id}>
                {item.name}
              </Link>
            );
          })
        : null}
      <div className="ml-auto">Cart</div>
    </div>
  );
};

export default Navbar;
