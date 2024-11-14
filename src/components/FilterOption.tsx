import type { FilterOptionComponent } from "@/interface/interfaces";
import React, { useState, useEffect } from "react";
import {
  CategoryFilterOption,
  PriceRange,
  TypeFilterOption,
} from "@/enums/enums";
import { Icon } from "@iconify/react/dist/iconify.js";

const FilterOption = ({
  onFilterSubmit,
  onClear,
  typeFilterOptions = TypeFilterOption,
  categoryFilterOptions = CategoryFilterOption,
  selectedType = TypeFilterOption[0].name,
  selectedCategory = CategoryFilterOption[0].name,
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

  useEffect(() => {
    setSelectedTypeOption(selectedType);
    setSelectedCategoryOption(selectedCategory);
    setSelectedMinPriceOption(selectedMinPrice);
    setSelectedMaxPriceOption(selectedMaxPrice);
  }, [selectedType, selectedCategory, selectedMinPrice, selectedMaxPrice]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const selectedFilteredData = {
      type: selectedTypeOption,
      category: selectedCategoryOption,
      maxPrice: selectedMaxPriceOption,
      minPrice: selectedMinPriceOption,
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
    <form
      onSubmit={handleSubmit}
      className={`p-4 rounded-lg overflow-auto w-96 bg-custom-bg-light text-lg text-custom-black flex flex-col gap-4 ${containerClass}`}
    >
      {/* Type Filter */}
      <div className="flex flex-col gap-2">
        <span className="text-custom-fg-light font-bold">Type: </span>
        <div className="flex flex-wrap gap-2">
          {typeFilterOptions?.length
            ? typeFilterOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex justify-center text-sm items-center w-max flex-wrap gap-2 cursor-pointer px-4 py-2 rounded-lg outline outline-1 outline-custom-black ${selectedTypeOption === option.name ? "bg-custom-black text-custom-bg-light" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedTypeOption === option.name}
                    onChange={() => setSelectedTypeOption(option.name)}
                    className="hidden"
                  />
                  <span
                    className={`custom-checkbox ${selectedTypeOption === option.name ? "selected" : ""}`}
                  >
                    {option.name}
                  </span>
                </label>
              ))
            : null}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-col gap-2">
        <span className="text-custom-fg-light font-bold">Category: </span>
        <div className="flex flex-wrap gap-2">
          {categoryFilterOptions?.length
            ? categoryFilterOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex justify-center text-sm items-center w-max flex-wrap gap-2 cursor-pointer px-4 py-2 rounded-lg outline outline-1 outline-custom-black ${selectedCategoryOption === option.name ? "bg-custom-black text-custom-bg-light" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategoryOption === option.name}
                    onChange={() => setSelectedCategoryOption(option.name)}
                    className="hidden"
                  />
                  <span
                    className={`custom-checkbox ${selectedCategoryOption === option.name ? "selected" : ""}`}
                  >
                    {option.name}
                  </span>
                </label>
              ))
            : null}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="flex flex-col gap-2">
        <span className="text-custom-fg-light font-bold">Price Range: </span>
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
            setSelectedTypeOption(typeFilterOptions[0]?.name);
            setSelectedCategoryOption(categoryFilterOptions[0]?.name);
            setSelectedMinPriceOption(PriceRange.min[0]);
            setSelectedMaxPriceOption(
              PriceRange.max[PriceRange.max.length - 1]
            );
            onFilterSubmit({
              type: typeFilterOptions[0]?.name,
              category: categoryFilterOptions[0]?.name,
              minPrice: PriceRange.min[0],
              maxPrice: PriceRange.max[PriceRange.max.length - 1],
            });
            onClear();
          }}
          className="px-4 py-2 rounded-lg outline outline-1 outline-custom-fg-light bg-transparent text-custom-fg-light w-full"
        >
          Clear
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-custom-fg-light text-custom-bg-light rounded-lg outline outline-1 outline-custom-fg-light w-full"
        >
          Filter
        </button>
      </div>
    </form>
  );
};

export default FilterOption;
