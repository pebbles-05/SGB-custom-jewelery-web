import { NavbarOptions } from "@/enums/enums";
import { NavbarOption } from "@/interface/interfaces";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = ({ options = NavbarOptions }: { options?: NavbarOption[] }) => {
  return (
    <div className="flex items-center px-16 text-xl sticky top-0 inset-y-0 h-20 text-custom-bg-light bg-custom-fg-light z-50">
      <Link className="w-16 h-16 mr-8" href="/">
        <Image
          width={500}
          height={500}
          alt="logo"
          className="w-max h-max "
          src="https://ik.imagekit.io/leoblaze969/logo-removebg-preview.png"
        />
      </Link>
      {options?.length
        ? options.map((item: NavbarOption) => {
            return (
              <Link
                href={item.route}
                key={item.id}
                className="px-4 text-custom-bg-light hover:text-custom-golden hover:underline underline-offset-8"
              >
                {item.name}
              </Link>
            );
          })
        : null}
      <Link
        href="/store/cart/"
        className="ml-auto w-max h-max hover:text-custom-golden"
      >
        <Icon icon="iconoir:cart" className="w-8 h-8" />
      </Link>
    </div>
  );
};

export default Navbar;
