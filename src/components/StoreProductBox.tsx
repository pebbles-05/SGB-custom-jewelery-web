import type { StoreProductBox } from "@/interface/interfaces";
import { Icon } from "@iconify/react/dist/iconify.cjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const StoreProductBox = ({ id, name, price, img }: StoreProductBox) => {
  return (
    <Link
      href={`/store/${id}`}
      className="cursor-pointer flex flex-col text-2xl group"
    >
      <div className="relative rounded-lg overflow-hidden">
        <div className="bg-custom-black/30 absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-8 p-4">
          <Link
            href={`/store/${id}`}
            className="flex justify-center items-center text-xl w-full outline outline-2 outline-transparent hover:outline-current px-4 py-2 rounded-lg hover:bg-transparent hover:text-custom-white bg-custom-white text-custom-black opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
          >
            Buy Now
          </Link>
          <Link
            href={`/store/${id}`}
            className="flex justify-center items-center text-xl w-full outline outline-2 outline-transparent hover:outline-current px-4 py-2 rounded-lg hover:bg-transparent hover:text-custom-white bg-custom-white text-custom-black opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex gap-2"
          >
            Add to
            <Icon icon="iconoir:cart" className="w-4 h-4" />
          </Link>
        </div>
        <Image loading="lazy" src={img} alt="" width={500} height={500} />
      </div>
      <span className="text-custom-fg-light truncate" title={name}>
        {name}
      </span>
      <span>&#8377;{price}</span>
    </Link>
  );
};

export default StoreProductBox;
