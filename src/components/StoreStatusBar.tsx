import { SortingOptions } from "@/enums/enums";
import type { SelectedFilteredData } from "@/interface/interfaces";
import React, { useState } from "react";

const StoreStatusBar = ({
  type,
  category,
  minPrice,
  maxPrice,
  sortingOption = SortingOptions[0].name,
}: SelectedFilteredData & { sortingOption: string }) => {
  const [selectedSortingOption, setselectedSortingOption] =
    useState(sortingOption);
  return (
    <div className="w-full h-max flex text-base gap-2 flex-wrap">
      {SortingOptions?.length ? (
        <div className="relative w-max h-max after:content-['🞃'] after:absolute after:right-4 after:top-1/2 after:transform after:-translate-y-1/2">
          <select
            value={selectedSortingOption}
            onChange={(e) => setselectedSortingOption(e.target.value)}
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
        <div className="px-4 py-2 rounded-lg outline outline-1 outline-custom-black">
          Type: {type}
        </div>
      ) : null}
      {category ? (
        <div className="px-4 py-2 rounded-lg outline outline-1 outline-custom-black">
          Category: {category}
        </div>
      ) : null}
      {minPrice && maxPrice ? (
        <div className="px-4 py-2 rounded-lg outline outline-1 outline-custom-black">
          Price : &#8377;{minPrice} - &#8377;{maxPrice}
        </div>
      ) : null}
    </div>
  );
};

export default StoreStatusBar;
