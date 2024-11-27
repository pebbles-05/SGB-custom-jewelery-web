"use client";

import React from "react";
import CategoricalCard from "./CategoricalCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const Catagory = () => {
  const cardsData = [
    {
      name: "Set",
      bgImage: "https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG",
      pageLink: "/store?category=Set",
    },
    {
      name: "Necklace",
      bgImage: "https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG",
      pageLink: "/store?category=Necklace",
    },
    {
      name: "Earring",
      bgImage: "https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG",
      pageLink: "/store?category=Earring",
    },
    {
      name: "Ring",
      bgImage: "https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG",
      pageLink: "/store?category=Ring",
    },
    {
      name: "Anklet",
      bgImage: "https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG",
      pageLink: "/store?category=Anklet",
    },
  ];
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
      <div className="grid md:grid-cols-3 grid-cols-2 gap-20  w-4/5">
        {cardsData.map((card, index) => (
          <CategoricalCard
            key={index}
            name={card.name}
            bgImage={card.bgImage}
            pageLink={card.pageLink}
          />
        ))}
      </div>
    </div>
  );
};

export default Catagory;
