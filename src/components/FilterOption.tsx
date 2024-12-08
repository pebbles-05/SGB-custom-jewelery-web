import React, { useState, useEffect } from "react";
import { DefaultParams, QueryParameter, SortingOptions } from "@/enums/enums";
import { useSearchParams } from "next/navigation";

const FilterOption = ({
  onFilterSubmit,
  onClear,
  categoryFilterOptions = [],
  typeFilterOptions = [],
  selectedType = DefaultParams.ALL,
  minPrice,
  maxPrice,
  selectedCategory = DefaultParams.ALL,
  selectedMinPrice = minPrice,
  selectedMaxPrice = maxPrice,
  containerClass = "",
}) => {
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

  const handleMinPriceChange = (value) => {
    setSelectedMinPriceOption(value);
    if (value > selectedMaxPriceOption) {
      setSelectedMaxPriceOption(value);
    }
  };

  const handleMaxPriceChange = (value) => {
    setSelectedMaxPriceOption(value);
    if (value < selectedMinPriceOption) {
      setSelectedMinPriceOption(value);
    }
  };

  return (
    <div
      className={`p-4 rounded-lg overflow-auto w-96 bg-custom-bg-light text-lg text-custom-black flex flex-col gap-4 ${containerClass}`}
    >
      {typeFilterOptions || categoryFilterOptions || (minPrice && maxPrice) ? (
        <>
          {/* Type Filter */}
          {typeFilterOptions?.length ? (
            <div className="flex flex-col gap-2">
              <span className="text-custom-fg-light font-bold">Type: </span>
              <div className="flex flex-wrap gap-2">
                <div
                  onClick={() => setSelectedTypeOption(DefaultParams.ALL)}
                  className={`cursor-pointer px-4 py-2 rounded-lg outline outline-1 outline-custom-black ${
                    selectedTypeOption === DefaultParams.ALL
                      ? "bg-custom-black text-custom-bg-light"
                      : ""
                  }`}
                >
                  {DefaultParams.ALL}
                </div>
                {typeFilterOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => setSelectedTypeOption(option.name)}
                    className={`cursor-pointer px-4 py-2 rounded-lg outline outline-1 outline-custom-black ${
                      selectedTypeOption === option.name
                        ? "bg-custom-black text-custom-bg-light"
                        : ""
                    }`}
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
                  className={`cursor-pointer px-4 py-2 rounded-lg outline outline-1 outline-custom-black ${
                    selectedCategoryOption === DefaultParams.ALL
                      ? "bg-custom-black text-custom-bg-light"
                      : ""
                  }`}
                >
                  {DefaultParams.ALL}
                </div>
                {categoryFilterOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => setSelectedCategoryOption(option.name)}
                    className={`cursor-pointer px-4 py-2 rounded-lg outline outline-1 outline-custom-black ${
                      selectedCategoryOption === option.name
                        ? "bg-custom-black text-custom-bg-light"
                        : ""
                    }`}
                  >
                    {option.name}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Price Range Filter */}
          {maxPrice && minPrice ? (
            <div className="flex flex-col gap-2 filter-price-range">
              <span className="text-custom-fg-light font-bold">
                Price Range:
              </span>
              <div className="relative flex items-center w-full">
                {/* Slider Track */}
                <div className="absolute h-2 w-full bg-gray-300 rounded-full" />
                <div
                  className="absolute h-2 bg-black rounded-full"
                  style={{
                    left: `${
                      ((selectedMinPriceOption - minPrice) /
                        (maxPrice - minPrice)) *
                      100
                    }%`,
                    right: `${
                      100 -
                      ((selectedMaxPriceOption - minPrice) /
                        (maxPrice - minPrice)) *
                        100
                    }%`,
                  }}
                />
                {/* Max Slider */}
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={selectedMaxPriceOption}
                  onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
                  className="absolute appearance-none w-full h-2 bg-transparent pointer-events-none z-20 cursor-pointer"
                />
                {/* Min Slider */}
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={selectedMinPriceOption}
                  onChange={(e) => handleMinPriceChange(Number(e.target.value))}
                  className="absolute appearance-none w-full h-2 bg-transparent pointer-events-none z-10 cursor-pointer"
                />
              </div>
              <div className="flex justify-between w-full text-sm mt-2">
                <span>Min: ₹{selectedMinPriceOption}</span>
                <span>Max: ₹{selectedMaxPriceOption}</span>
              </div>
            </div>
          ) : null}

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
