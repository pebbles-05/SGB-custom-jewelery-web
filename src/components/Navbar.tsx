"use client";
import {
  CategoryFilterOption,
  NavbarOptions,
  PriceRange,
  QueryParameter,
  TypeFilterOption,
} from "@/enums/enums";
import type {
  NavbarOption,
  SelectedFilteredData,
} from "@/interface/interfaces";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FilterOption from "./FilterOption";
import Modal from "./Modal";

const Navbar = ({ options = NavbarOptions }: { options?: NavbarOption[] }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFilterOpen, setisFilterOpen] = useState(false);
  const [type, setType] = useState(TypeFilterOption[0]?.name);
  const [category, setCategory] = useState(CategoryFilterOption[0]?.name);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(PriceRange.min[0]);
  const [maxPrice, setMaxPrice] = useState(
    PriceRange.max[PriceRange.max.length - 1]
  );

  useEffect(() => {
    if (searchParams) {
      setType(
        searchParams.get(QueryParameter.TYPE) || TypeFilterOption[0]?.name
      );
      setCategory(
        searchParams.get(QueryParameter.CATEGORY) ||
          CategoryFilterOption[0]?.name
      );
      setSearchTerm(searchParams.get(QueryParameter.SEARCH) || "");
      setMinPrice(
        searchParams.get(QueryParameter.MIN_PRICE) || PriceRange.min[0]
      );
      setMaxPrice(
        searchParams.get(QueryParameter.MAX_PRICE) ||
          PriceRange.max[PriceRange.max.length - 1]
      );
    }
  }, [pathname, searchParams]);

  const handleFilterChange = (
    e?: React.FormEvent | null | undefined,
    options?: SelectedFilteredData | null | undefined
  ): void => {
    if (e) {
      e.preventDefault();
    }
    const queryParams = new URLSearchParams();
    if (searchTerm) queryParams.set(QueryParameter.SEARCH, searchTerm);
    if (options) {
      queryParams.set(QueryParameter.TYPE, options?.type);
      queryParams.set(QueryParameter.CATEGORY, options?.category);
      queryParams.set(QueryParameter.MIN_PRICE, options?.minPrice.toString());
      queryParams.set(QueryParameter.MAX_PRICE, options?.maxPrice.toString());
    } else {
      if (type) queryParams.set(QueryParameter.TYPE, type);
      if (category) queryParams.set(QueryParameter.CATEGORY, category);
      if (minPrice)
        queryParams.set(QueryParameter.MIN_PRICE, minPrice.toString());
      if (maxPrice)
        queryParams.set(QueryParameter.MAX_PRICE, maxPrice.toString());
    }

    router.push(`/store?${queryParams.toString()}`);
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
          {!pathname?.startsWith("/store/") ? (
            <div
              onClick={() => setisFilterOpen(true)}
              className="hover:text-custom-golden cursor-pointer"
            >
              <Icon icon="mage:filter" className="w-8 h-8" />
              <Modal
                isOpen={isFilterOpen}
                onClickOutside={() => setisFilterOpen(false)}
                containerClass=""
              >
                <FilterOption
                  onFilterSubmit={(options) => {
                    handleFilterChange(null, options);
                    setisFilterOpen(false);
                  }}
                  onClear={() => {
                    setisFilterOpen(false);
                  }}
                  selectedType={type}
                  selectedCategory={category}
                  selectedMaxPrice={maxPrice}
                  selectedMinPrice={minPrice}
                />
              </Modal>
            </div>
          ) : null}
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
