import type { FilterOptionComponent } from "@/interface/interfaces";
import React, { useState, useEffect } from "react";
import {
  DefaultParams,
  PriceRange,
  QueryParameter,
  SortingOptions,
} from "@/enums/enums";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSearchParams } from "next/navigation";

const FilterOption = ({
  onFilterSubmit,
  onClear,
  categoryFilterOptions = [],
  typeFilterOptions = [],
  selectedType = DefaultParams.ALL,
  priceRange = PriceRange,
  selectedCategory = DefaultParams.ALL,
  selectedMinPrice = PriceRange.min[0],
  selectedMaxPrice = PriceRange.max[PriceRange.max.length - 1],
  containerClass,
}: FilterOptionComponent): React.JSX.Element => {
  const [selectedTypeOption, setSelectedTypeOption] = useState(selectedType);
  const [selectedCategoryOption, setSelectedCategoryOption] =
    useState(selectedCategory);
  const [selectedMinPriceOption, setSelectedMinPriceOption] =
    useState(selectedMinPrice);
  const [selectedMaxPriceOption, setSelectedMaxPriceOption] =
    useState(selectedMaxPrice);
  const searchParams = useSearchParams();

  useEffect(() => {
    setSelectedTypeOption(selectedType);
    setSelectedCategoryOption(selectedCategory);
    setSelectedMinPriceOption(selectedMinPrice);
    setSelectedMaxPriceOption(selectedMaxPrice);
  }, [selectedType, selectedCategory, selectedMinPrice, selectedMaxPrice]);

  const handleSubmit = () => {
    const selectedFilteredData = {
      type: selectedTypeOption,
      category: selectedCategoryOption,
      maxPrice: selectedMaxPriceOption,
      minPrice: selectedMinPriceOption,
      sortingOption:
        searchParams?.get(QueryParameter.SORTING_OPTION) ||
        SortingOptions[0]?.name,
    };

    onFilterSubmit(selectedFilteredData);
  };

  const handleMinPriceChange = (value: number) => {
    setSelectedMinPriceOption(value);
    // Adjust max price if the selected min price is greater than max price
    if (value > selectedMaxPriceOption) {
      setSelectedMaxPriceOption(
        PriceRange.max.find((price) => price >= value) || value
      );
    }
  };

  const handleMaxPriceChange = (value: number) => {
    setSelectedMaxPriceOption(value);
    // Adjust min price if the selected max price is less than min price
    if (value < selectedMinPriceOption) {
      setSelectedMinPriceOption(
        PriceRange.min.find((price) => price <= value) || value
      );
    }
  };

  return (
    <div
      className={`p-4 rounded-lg overflow-auto w-96 bg-custom-bg-light text-lg text-custom-black flex flex-col gap-4 ${containerClass}`}
    >
      {typeFilterOptions || categoryFilterOptions || priceRange ? (
        <>
          {typeFilterOptions?.length ? (
            <div className="flex flex-col gap-2">
              <span className="text-custom-fg-light font-bold">Type: </span>
              <div className="flex flex-wrap gap-2">
                <div
                  onClick={() => setSelectedCategoryOption(DefaultParams.ALL)}
                  className={`flex justify-center text-sm items-center w-max flex-wrap gap-2 cursor-pointer px-4 py-2 rounded-lg outline outline-1 outline-custom-black ${selectedTypeOption === DefaultParams.ALL ? "bg-custom-black text-custom-bg-light" : ""}`}
                >
                  {DefaultParams.ALL}
                </div>
                {typeFilterOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => setSelectedTypeOption(option.name)}
                    className={`flex justify-center text-sm items-center w-max flex-wrap gap-2 cursor-pointer px-4 py-2 rounded-lg outline outline-1 outline-custom-black ${selectedTypeOption === option.name ? "bg-custom-black text-custom-bg-light" : ""}`}
                  >
                    {option.name}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Category Filter */}
          {categoryFilterOptions?.length ? (
            <div className="flex flex-col gap-2">
              <span className="text-custom-fg-light font-bold">Category: </span>
              <div className="flex flex-wrap gap-2">
                <div
                  onClick={() => setSelectedCategoryOption(DefaultParams.ALL)}
                  className={`flex justify-center text-sm items-center w-max flex-wrap gap-2 cursor-pointer px-4 py-2 rounded-lg outline outline-1 outline-custom-black ${selectedCategoryOption === DefaultParams.ALL ? "bg-custom-black text-custom-bg-light" : ""}`}
                >
                  {DefaultParams.ALL}
                </div>
                {categoryFilterOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => setSelectedCategoryOption(option.name)}
                    className={`flex justify-center text-sm items-center w-max flex-wrap gap-2 cursor-pointer px-4 py-2 rounded-lg outline outline-1 outline-custom-black ${selectedCategoryOption === option.name ? "bg-custom-black text-custom-bg-light" : ""}`}
                  >
                    {option.name}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Price Range Filter */}
          <div className="flex flex-col gap-2">
            <span className="text-custom-fg-light font-bold">
              Price Range:{" "}
            </span>
            <div className="flex gap-4 w-full text-sm items-center">
              <select
                value={selectedMinPriceOption}
                onChange={(e) => handleMinPriceChange(Number(e.target.value))}
                className="cursor-pointer bg-custom-bg-light text-custom-black rounded-lg outline outline-1 outline-custom-black px-4 py-2 w-full"
              >
                {PriceRange.min.map((price) => (
                  <option
                    key={price}
                    value={price}
                    disabled={price >= selectedMaxPriceOption}
                  >
                    Min: &#8377;{price}
                  </option>
                ))}
              </select>
              <Icon
                icon="mi:switch"
                className="w-6 h-6 flex-shrink-0 cursor-default"
              />
              <select
                value={selectedMaxPriceOption}
                onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
                className="cursor-pointer bg-custom-bg-light text-custom-black rounded-lg outline outline-1 outline-custom-black px-4 py-2 w-full"
              >
                {PriceRange.max.map((price) => (
                  <option
                    key={price}
                    value={price}
                    disabled={price <= selectedMinPriceOption}
                  >
                    Max: &#8377;{price}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 w-full">
            <button
              type="button"
              onClick={() => {
                onFilterSubmit({
                  type: "",
                  category: "",
                  minPrice: 0,
                  maxPrice: 0,
                  sortigOption: "",
                });
                onClear();
              }}
              className="px-4 py-2 rounded-lg outline outline-1 outline-custom-fg-light bg-transparent text-custom-fg-light w-full"
            >
              Clear
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 bg-custom-fg-light text-custom-bg-light rounded-lg outline outline-1 outline-custom-fg-light w-full"
            >
              Filter
            </button>
          </div>
        </>
      ) : (
        <span className="text-custom-black/50">No option Available</span>
      )}
    </div>
  );
};

export default FilterOption;
