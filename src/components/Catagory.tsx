"use client";

import React from "react";
import CategoricalCard from "./CategoricalCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Catagory = () => {
  const cardsData = [
    {
      name: "Nature",
      bgImage: "https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG",
      pageLink: "https://example.com/nature",
    },
    {
      name: "Nature",
      bgImage: "https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG",
      pageLink: "https://example.com/nature",
    },
    {
      name: "Nature",
      bgImage: "https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG",
      pageLink: "https://example.com/nature",
    },
    {
      name: "Nature",
      bgImage: "https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG",
      pageLink: "https://example.com/nature",
    },
    {
      name: "Nature",
      bgImage: "https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG",
      pageLink: "https://example.com/nature",
    },
    {
      name: "Nature",
      bgImage: "https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG",
      pageLink: "https://example.com/nature",
    },
    {
      name: "Nature",
      bgImage: "https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG",
      pageLink: "https://example.com/nature",
    },
    {
      name: "Nature",
      bgImage: "https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG",
      pageLink: "https://example.com/nature",
    },
    {
      name: "Nature",
      bgImage: "https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG",
      pageLink: "https://example.com/nature",
    },
  ];

  useGSAP(() => {
    gsap.fromTo(
      "#hdng",
      {
        opacity: 0,
        x: -500,
      },
      {
        scrollTrigger: {
          trigger: "#hdngdiv",
          toggleActions: "restart reverse restart reverse",
          // start: "top 80%",
          //   end: "bottom 2",
        },
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.2, // No delay between images; all animate together
      }
    );
  });

  return (
    <div id="hdngdiv" className="flex w-screen flex-col items-center justify-center gap-14 px-16 py-28">
      <span id="hdng" className="text-4xl text-custom-fg-light">
        Browse through the catagories
      </span>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-8 w-full">
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
