import {
  CategoryFilterOption,
  PriceRange,
  QueryParameter,
  TypeFilterOption,
  SortingOptions,
} from "@/enums/enums";
import type { SelectedFilteredData } from "@/interface/interfaces";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FilterOption from "./FilterOption";
import Modal from "./Modal";

const StoreStatusBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFilterOpen, setisFilterOpen] = useState(false);
  const [type, setType] = useState<string>(TypeFilterOption[0]?.name);
  const [category, setCategory] = useState<string>(
    CategoryFilterOption[0]?.name
  );
  const [minPrice, setMinPrice] = useState<number | string>(PriceRange.min[0]);
  const [maxPrice, setMaxPrice] = useState<number | string>(
    PriceRange.max[PriceRange.max.length - 1]
  );
  const [selectedSortingOption, setselectedSortingOption] = useState(
    SortingOptions[0].name
  );

  useEffect(() => {
    if (searchParams) {
      setselectedSortingOption(
        searchParams.get(QueryParameter.SORTING_OPTION) ||
          SortingOptions[0].name
      );
      setType(
        searchParams.get(QueryParameter.TYPE) || TypeFilterOption[0]?.name
      );
      setCategory(
        searchParams.get(QueryParameter.CATEGORY) ||
          CategoryFilterOption[0]?.name
      );
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
    options?: SelectedFilteredData | null | undefined
  ): void => {
    const currentQueryParams = new URLSearchParams(
      window.location.search || ""
    );

    if (
      options?.sortingOption &&
      options?.sortingOption !== SortingOptions[0].name
    ) {
      currentQueryParams.set(
        QueryParameter.SORTING_OPTION,
        options.sortingOption
      );
    } else {
      currentQueryParams.delete(QueryParameter.SORTING_OPTION);
    }
    if (options?.type && options?.type !== TypeFilterOption[0].name) {
      currentQueryParams.set(QueryParameter.TYPE, options.type);
    } else {
      currentQueryParams.delete(QueryParameter.TYPE);
    }

    if (
      options?.category &&
      options?.category !== CategoryFilterOption[0].name
    ) {
      currentQueryParams.set(QueryParameter.CATEGORY, options.category);
    } else {
      currentQueryParams.delete(QueryParameter.CATEGORY);
    }

    if (options?.minPrice && options?.minPrice !== PriceRange.min[0]) {
      currentQueryParams.set(
        QueryParameter.MIN_PRICE,
        options.minPrice.toString()
      );
    } else {
      currentQueryParams.delete(QueryParameter.MIN_PRICE);
    }

    if (
      options?.maxPrice &&
      options?.maxPrice !== PriceRange.max[PriceRange.max?.length - 1]
    ) {
      currentQueryParams.set(
        QueryParameter.MAX_PRICE,
        options.maxPrice.toString()
      );
    } else {
      currentQueryParams.delete(QueryParameter.MAX_PRICE);
    }
    router.push(`/store?${currentQueryParams.toString()}`);
  };
  return (
    <div className="w-full h-max flex text-base gap-2 flex-wrap">
      {SortingOptions?.length ? (
        <div className="relative w-max h-max after:content-['🞃'] after:absolute after:right-4 after:top-1/2 after:transform after:-translate-y-1/2">
          <select
            value={selectedSortingOption}
            onChange={(e) =>
              handleFilterChange({
                sortingOption: e.target.value,
                type:
                  searchParams.get(QueryParameter.TYPE) ||
                  TypeFilterOption[0]?.name,
                category:
                  searchParams.get(QueryParameter.CATEGORY) ||
                  CategoryFilterOption[0]?.name,
                minPrice: searchParams.get(QueryParameter.MIN_PRICE),
                maxPrice:
                  searchParams.get(QueryParameter.MAX_PRICE) ||
                  PriceRange.max[PriceRange.max.length - 1],
              })
            }
            className="pl-4 pr-10 py-2 rounded-lg outline outline-1 outline-custom-black "
          >
            {SortingOptions.map((option) => {
              return (
                <option key={option.id} value={option.name}>
                  Sort by: {option.name}
                </option>
              );
            })}
          </select>
        </div>
      ) : null}
      {type ? (
        <button
          onClick={() => setisFilterOpen(true)}
          className="px-4 py-2 rounded-lg outline outline-1 outline-custom-black"
        >
          Type: {type}
        </button>
      ) : null}
      {category ? (
        <button
          onClick={() => setisFilterOpen(true)}
          className="px-4 py-2 rounded-lg outline outline-1 outline-custom-black"
        >
          Category: {category}
        </button>
      ) : null}
      {minPrice && maxPrice ? (
        <button
          onClick={() => setisFilterOpen(true)}
          className="px-4 py-2 rounded-lg outline outline-1 outline-custom-black"
        >
          Price : &#8377;{minPrice} - &#8377;{maxPrice}
        </button>
      ) : null}
      <Modal
        isOpen={isFilterOpen}
        onClickOutside={() => setisFilterOpen(false)}
        containerClass=""
      >
        <FilterOption
          containerClass=""
          onFilterSubmit={(options) => {
            handleFilterChange(options);
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
  );
};

export default StoreStatusBar;
