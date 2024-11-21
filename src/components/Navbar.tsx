"use client";
import { NavbarOptions, QueryParameter } from "@/enums/enums";
import type { NavbarOption } from "@/interface/interfaces";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = ({ options = NavbarOptions }: { options?: NavbarOption[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSearchTerm(searchParams.get(QueryParameter.SEARCH) || "");
  }, [pathname, searchParams]);

  const handleFilterChange = (e?: React.FormEvent | null | undefined): void => {
    e.preventDefault();
    const currentQueryParams = new URLSearchParams(
      window.location.search || ""
    );
    if (searchTerm) {
      currentQueryParams.set(QueryParameter.SEARCH, searchTerm);
    } else {
      currentQueryParams.delete(QueryParameter.SEARCH);
    }
    router.push(`/store?${currentQueryParams.toString()}`);
  };

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
        <div className="flex w-2/3 mx-auto gap-4 items-center">
          <form
            onSubmit={handleFilterChange}
            className="bg-custom-bg-light rounded-lg overflow-hidden text-custom-black flex justify-center items-center  w-full pl-4 py-2"
          >
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              name="searchInput"
              placeholder="Search for Earrings,Necklace,Rings and more... "
              className="outline-none w-full bg-transparent"
            />
            <button className="px-4 flex items-center">
              <Icon icon="healthicons:magnifying-glass" className="w-8 h-8" />
            </button>
          </form>
        </div>
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
