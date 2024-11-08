import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="w-full h-[80vh] overflow-hidden relative flex items-center text-custom-bg-light">
      <div className="text-5xl flex flex-col ml-16 gap-8 justify-start items-start">
        <span>শ্রেয়সীর গয়নার বাক্স</span>
        <span className="text-3xl text-custom-bg-light/60">
          "create your own"
        </span>
        <Link
          href="/customize"
          className="text-2xl border border-custom-bg-light px-8 py-4 rounded"
        >
          Customize
        </Link>
      </div>
      <Image
        className="absolute inset-y-0 top-0 bottom-[20%] -z-10 brightness-[0.68]"
        alt=""
        width={3000}
        height={3000}
        src="https://ik.imagekit.io/leoblaze969/hero-updated-better.JPG"
      />
    </div>
  );
};

export default Hero;
