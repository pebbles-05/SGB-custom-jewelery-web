"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Hero.css";
const ImageSlider = () => {
  gsap.registerPlugin(ScrollTrigger);
  const images = Array.from(
    { length: 5 },
    (_, i) => `/images/image${i + 1}.jpg`
  );
  const imageRefs = useRef([]);

  const getCordsbyPosition = (index: number) => {
    switch (index) {
      case 0:
        return {
          x: -300,
          y: 0,
          rotation: 45,
          targetRotation: 10,
        };
      case 1:
        return {
          x: 0,
          y: 300,
          rotation: 45,
          targetRotation: -5,
        };
      case 2:
        return {
          x: 300,
          y: -300,
          rotation: 45,
          targetRotation: 10,
        };
      case 3:
        return {
          x: 0,
          y: 300,
          rotation: 45,
          targetRotation: -20,
        };
      case 4:
        return {
          x: 300,
          y: 0,
          rotation: 45,
          targetRotation: 20,
        };
      default:
        break;
    }
  };

  // Animate images out (exit animation)
  useGSAP(() => {
    gsap.fromTo(".hdng", {
      opacity: 0,
      x: 40,
    },
    {
      scrollTrigger: {
        trigger: ".hdng",
         toggleActions: "restart reverse restart reverse",
        start: "top 90%",
        //  end: "bottom 50%"
      },
      opacity: 1,
      x: 0,
    });

    gsap.fromTo(
      imageRefs.current,
      {
        opacity: 0,
        x: (index) => getCordsbyPosition(index)?.x,
        y: (index) => getCordsbyPosition(index)?.y,
        rotation: (index) => getCordsbyPosition(index)?.rotation,
      },
      {
        scrollTrigger: {
          trigger: "#productImageDIv",
          toggleActions: "restart reverse restart reverse",
          start: "top 50%",
          end: "bottom 50%",
        },
        opacity: 1,
        x: 0,
        y: 0,
        rotation: (index) => getCordsbyPosition(index)?.targetRotation,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.2, // No delay between images; all animate together
      }
    );
  });

  const getPositionbyIndex = (index) => {
    switch (index) {
      case 0:
        return "top-[20%] left-[12%] w-[17%] rotate-[10deg] shadow-2xl shadow-custom-black";
      case 1:
        return "bottom-[5%] left-[27%] w-[25%] -rotate-[5deg] shadow-2xl shadow-custom-black";
      case 2:
        return "top-[20%] left-[33%] w-[23%] rotate-[10deg] shadow-2xl shadow-custom-black";
      case 3:
        return "top-[20%] left-[60%] w-[17%] -rotate-[20deg] shadow-2xl shadow-custom-black";
      case 4:
        return "top-[30%] right-[5%] w-[20%] rotate-[20deg] shadow-2xl shadow-custom-black";
      case 10:
        return "top-[16%] left-[13%]  rotate-[10deg]ver h-10 w-10";
      case 11:
        return "bottom-[31%] left-[27%]  -rotate-[5deg]ver h-10 w-10";
      case 12:
        return "top-[21%] left-[53%]  rotate-[10deg]ver h-10 w-10";
      case 13:
        return "top-[13%] left-[72%]  -rotate-[20deg]ver h-10 w-10";
      case 14:
        return "top-[33%] right-[5%]  rotate-[20deg]ver h-10 w-10";
      default:
        return "hidden";
    }
  };

  return (
    <>
      <div
        id="productImageDIv"
        className="relative w-full h-screen overflow-hidden p-4 grid grid-cols-4 gap-4 px-16 py-8 bg-custom-bg-light"
      >
        <span className="text-6xl absolute top-[8%] left-[40%] w-[40%] text-custom-fg-light hdng ">Work Gallary</span>
        {images.map((img, index) => (
          <div key={index}>
            <Image
              ref={(el) => (imageRefs.current[index] = el)}
              key={index}
              src={img}
              alt={`Collage Image ${index}`}
              width={500}
              height={500}
              className={`absolute object-cover rounded-xl break-inside-avoid ${getPositionbyIndex(index)}`}
            />
            <Image
              ref={(el) => (imageRefs.current[index + 10] = el)}
              key={index + 10}
              width={500}
              height={500}
              className={`absolute object-cov w-10 ${getPositionbyIndex(index + 10)}`}
              src="assets/paper-clips.svg"
              alt="My Happy SVG"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageSlider;
