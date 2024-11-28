"use client";

import React from "react";
import CategoricalCard from "./CategoricalCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useCategoryList from "@/helpers/useCategoryList";
const Catagory = () => {
  const { data: categoryList, isLoading, error } = useCategoryList();

  useGSAP(() => {
    gsap.fromTo(
      "#hdnggg",
      { opacity: 0, webkitFilter: "blur(15px)", y: 20 },
      {
        scrollTrigger: {
          trigger: "#hdnggg",
          toggleActions: "restart reverse restart reverse",
          start: "top 50% bottom 80%",
        },
        opacity: 1,
        webkitFilter: "blur(0px)",
        y: 0,
        duration: 1,
      }
    );
  });
  if (error) {
    <div className="w-full h-[calc(100vh-300px)] flex items-center justify-center text-2xl text-custom-black/50">
      Error happened
    </div>;
  } else if (isLoading) {
    return (
      <div className="w-full h-[calc(100vh-300px)] flex items-center justify-center text-2xl text-custom-black/50">
        Loading...
      </div>
    );
  } else {
    return (
      <div
        id="hdngdiv"
        className="flex w-screen flex-col items-center justify-center md:gap-14 md:px-16 py-28"
      >
        <span
          id="hdnggg"
          className="text-4xl font-bold text-center mb-12 text-gray-800"
        >
          Browse through the catagories
        </span>
        <div className="grid xl:grid-cols-3 lg:grid-cols-2  grid-cols-1 gap-20  w-4/5">
          {categoryList?.length &&
            categoryList?.map((card) => (
              <CategoricalCard
                key={card.id}
                name={card.name}
                bgImage={card.img}
                description={card.description}
              />
            ))}
        </div>
      </div>
    );
  }
};

export default Catagory;
