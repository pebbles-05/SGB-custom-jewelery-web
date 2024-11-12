"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Hero = () => {
  const imageRef = useRef();
  useGSAP(() => {
    gsap.to(imageRef.current, {
      y: -500, // Adjust the value to control how far the image moves
      ease: "none",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top center", // Adjust start and end to customize when the animation begins
        end: "bottom top",
        scrub: true, // Allows the animation to sync with scroll position
      },
    });
  });
  return (
    <div className=" w-full h-[80vh] overflow-hidden relative flex items-center text-custom-bg-light">
      <div className="text-5xl flex flex-col ml-16 gap-8 justify-start items-start">
        <span className="shiny-text">
          <span
            className="shiny-letter"
            style={{ animationDelay: `${0 * 0.2}s` }}
          >
            শ্রে
          </span>
          <span
            className="shiny-letter"
            style={{ animationDelay: `${1 * 0.2}s` }}
          >
            য়
          </span>
          <span
            className="shiny-letter"
            style={{ animationDelay: `${2 * 0.2}s` }}
          >
            সী
          </span>
          <span
            className="shiny-letter mr-5"
            style={{ animationDelay: `${3 * 0.2}s` }}
          >
            র
          </span>
          <span
            className="shiny-letter"
            style={{ animationDelay: `${4 * 0.2}s` }}
          >
            গ
          </span>
          <span
            className="shiny-letter"
            style={{ animationDelay: `${5 * 0.2}s` }}
          >
            য়
          </span>
          <span
            className="shiny-letter"
            style={{ animationDelay: `${6 * 0.2}s` }}
          >
            না
          </span>
          <span
            className="shiny-letter mr-5"
            style={{ animationDelay: `${7 * 0.2}s` }}
          >
            র
          </span>
          <span
            className="shiny-letter"
            style={{ animationDelay: `${8 * 0.2}s` }}
          >
            বা
          </span>
          <span
            className="shiny-letter"
            style={{ animationDelay: `${9 * 0.2}s` }}
          >
            ক্স
          </span>
        </span>
        {/* <span >শ্রেয়সীর গয়নার বাক্স</span> */}
        {/* <span className="Hero-name">শ্রেয়সীর গয়নার বাক্স</span> */}
        <span className="text-3xl text-custom-bg-light/60">
          "create your own"
        </span>
        <Link
          href="/customize"
          className="text-2xl border border-custom-bg-light px-8 py-4 rounded hover:bg-custom-bg-light hover:text-custom-black"
        >
          Customize
        </Link>
      </div>
      <Image
        ref={imageRef}
        className="absolute inset-y-0 top-0 -z-10 brightness-[0.58]"
        alt=""
        width={3000}
        height={3000}
        src="https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG"
      />
    </div>
  );
};

export default Hero;
