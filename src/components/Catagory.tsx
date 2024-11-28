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
      description:
        "Explore our curated sets that blend handmade charm with artistic flair. Designed for those who celebrate individuality, each set is a unique story of creativity and craftsmanship.",
    },
    {
      name: "Necklace",
      bgImage: "https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG",
      pageLink: "/store?category=Necklace",
      description:
        "Discover necklaces that are as unique as you are. From earthy clay pendants to bold oxidized statements, our collection celebrates the beauty of imperfection and the art of handmade jewelry.",
    },
    {
      name: "Earring",
      bgImage: "https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG",
      pageLink: "/store?category=Earring",
      description:
        "Make a statement with earrings that bring a playful yet elegant vibe to your ensemble. Crafted with care and a touch of whimsy, each pair reflects the joy of wearing something truly special and handmade.",
    },
    {
      name: "Ring",
      bgImage: "https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG",
      pageLink: "/store?category=Ring",
      description:
        "Slip on a ring that feels personal, unique, and full of character. Whether it's a simple clay band or a vibrant, customized piece, our rings tell the story of individuality and hand-crafted artistry.",
    },
    {
      name: "Anklet",
      bgImage: "https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG",
      pageLink: "/store?category=Anklet",
      description:
        "Celebrate the rhythm of life with our charming anklets. From delicate threads to intricate clay and beadwork, each piece is designed to add a touch of handcrafted beauty to every step you take.",
    },
  ];

  // const cardsData = [
  //   {
  //     name: "Set",
  //     bgImage: "https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG",
  //     pageLink: "/store?category=Set",
  //   },
  //   {
  //     name: "Necklace",
  //     bgImage: "https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG",
  //     pageLink: "/store?category=Necklace",
  //   },
  //   {
  //     name: "Earring",
  //     bgImage: "https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG",
  //     pageLink: "/store?category=Earring",
  //   },
  //   {
  //     name: "Ring",
  //     bgImage: "https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG",
  //     pageLink: "/store?category=Ring",
  //   },
  //   {
  //     name: "Anklet",
  //     bgImage: "https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG",
  //     pageLink: "/store?category=Anklet",
  //   },
  // ];
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
      <div className="grid xl:grid-cols-3 lg:grid-cols-2  grid-cols-1 gap-20  w-4/5">
        {cardsData.map((card, index) => (
          <CategoricalCard
            key={index}
            name={card.name}
            bgImage={card.bgImage}
            pageLink={card.pageLink}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Catagory;
