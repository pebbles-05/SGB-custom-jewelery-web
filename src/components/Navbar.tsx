"use client";
import { NavbarOptions } from "@/enums/enums";
import { NavbarOption } from "@/interface/interfaces";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = ({ options = NavbarOptions }: { options?: NavbarOption[] }) => {
  const pathname = usePathname();
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

      {!pathname?.startsWith("/store") && options?.length ? (
        options.map((item: NavbarOption) => {
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
      ) : (
        <form
          action=""
          className="relative bg-custom-bg-light rounded-lg overflow-hidden text-custom-black flex justify-center items-center mx-auto w-2/3 px-4 py-2"
        >
          <input
            type="text"
            placeholder="Search for Earrings,Necklace,Rings and more... "
            className="outline-none w-full bg-transparent"
          />
          <button className="absolute right-0 px-4 inset-y-0 flex items-center">
            <Icon icon="healthicons:magnifying-glass" className="w-8 h-8" />
          </button>
        </form>
      )}
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
