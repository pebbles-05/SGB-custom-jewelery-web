import { QueryParameter, SortingOptions, DefaultParams } from "@/enums/enums";
import type {
  FilterOption as categoryOption,
  SelectedFilteredData,
} from "@/interface/interfaces";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FilterOption from "./FilterOption";
import Modal from "./Modal";
import useTypeList from "@/helpers/useTypeList";

const StoreStatusBar = ({
  categoryList = [],
  maxPriceLimit,
  minPriceLimit,
}: {
  categoryList: categoryOption[];
  maxPriceLimit: number;
  minPriceLimit: number;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFilterOpen, setisFilterOpen] = useState(false);
  const [type, setType] = useState<string>(DefaultParams.ALL);
  const [category, setCategory] = useState<string>(DefaultParams.ALL);
  const [minPrice, setMinPrice] = useState<number | string>(minPriceLimit);
  const [maxPrice, setMaxPrice] = useState<number | string>(maxPriceLimit);
  const [selectedSortingOption, setselectedSortingOption] = useState(
    SortingOptions[0].name
  );
  const { data: typeList } = useTypeList();
  useEffect(() => {
    if (searchParams) {
      setselectedSortingOption(
        searchParams.get(QueryParameter.SORTING_OPTION) ||
          SortingOptions[0].name
      );
      setType(searchParams.get(QueryParameter.TYPE) || DefaultParams.ALL);
      setCategory(
        searchParams.get(QueryParameter.CATEGORY) || DefaultParams.ALL
      );
      setMinPrice(searchParams.get(QueryParameter.MIN_PRICE) || minPriceLimit);
      setMaxPrice(searchParams.get(QueryParameter.MAX_PRICE) || maxPriceLimit);
    }
  }, [pathname, searchParams, minPriceLimit, maxPriceLimit]);

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
    if (options?.type && options?.type !== DefaultParams.ALL) {
      currentQueryParams.set(QueryParameter.TYPE, options.type);
    } else {
      currentQueryParams.delete(QueryParameter.TYPE);
    }

    if (options?.category && options?.category !== DefaultParams.ALL) {
      currentQueryParams.set(QueryParameter.CATEGORY, options.category);
    } else {
      currentQueryParams.delete(QueryParameter.CATEGORY);
    }
    if (options?.minPrice === 0 && options?.maxPrice === 0) {
      currentQueryParams.delete(QueryParameter.MAX_PRICE);
      currentQueryParams.delete(QueryParameter.MIN_PRICE);
    } else if (minPriceLimit && maxPriceLimit) {
      currentQueryParams.set(
        QueryParameter.MIN_PRICE,
        options.minPrice.toString() || minPriceLimit
      );
      currentQueryParams.set(
        QueryParameter.MAX_PRICE,
        options.maxPrice.toString() || maxPriceLimit
      );
    }
    router.push(`/store?${currentQueryParams.toString()}`);
  };
  return (
    <div className="w-full h-max flex text-base gap-2 flex-wrap">
      {SortingOptions?.length ? (
        <select
          value={selectedSortingOption}
          onChange={(e) =>
            handleFilterChange({
              sortingOption: e.target.value,
              type: searchParams.get(QueryParameter.TYPE) || DefaultParams.ALL,
              category:
                searchParams.get(QueryParameter.CATEGORY) || DefaultParams.ALL,
              minPrice: searchParams.get(QueryParameter.MIN_PRICE) || minPrice,
              maxPrice: searchParams.get(QueryParameter.MAX_PRICE) || maxPrice,
            })
          }
          className="cursor-pointer relative w-max h-max rounded-lg outline outline-1 outline-custom-black py-2 px-4"
        >
          {SortingOptions.map((option) => {
            return (
              <option key={option.id} value={option.name}>
                Sort by: {option.name}
              </option>
            );
          })}
        </select>
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
          categoryFilterOptions={categoryList}
          typeFilterOptions={typeList}
          onFilterSubmit={(options) => {
            handleFilterChange(options);
            setisFilterOpen(false);
          }}
          onClear={() => {
            setisFilterOpen(false);
          }}
          selectedType={type}
          selectedCategory={category}
          maxPrice={maxPriceLimit}
          minPrice={minPriceLimit}
          selectedMaxPrice={maxPrice}
          selectedMinPrice={minPrice}
        />
      </Modal>
    </div>
  );
};

export default StoreStatusBar;
