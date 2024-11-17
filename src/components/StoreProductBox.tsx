import type { StoreProductBox } from "@/interface/interfaces";
import { Icon } from "@iconify/react/dist/iconify.cjs";
import Image from "next/image";
import Link from "next/link";
import { Cinzel_Decorative } from '@next/font/google';

const cinzelDecorative = Cinzel_Decorative({
  weight: ['400', '700'], // Choose the font weights you need
  subsets: ['latin'],     // Include subsets (default is 'latin')
});
const StoreProductBox = ({ id, name, price, img }: StoreProductBox) => {
  return (
    <Link
      href={`/store/${id}`}
      target="_blank"
      className="cursor-pointer flex flex-col gap-2 text-2xl group"
    >
      <div className="relative  rounded-lg overflow-hidden shadow-2xl">
        <div className="bg-custom-black/30 absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-8 p-4">
          <button className="flex justify-center items-center text-xl w-full outline outline-2 outline-transparent hover:outline-current px-4 py-2 rounded-lg hover:bg-transparent hover:text-custom-white bg-custom-white text-custom-black opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
            Buy Now
          </button>
          <button className="flex justify-center items-center text-xl w-full outline outline-2 outline-transparent hover:outline-current px-4 py-2 rounded-lg hover:bg-transparent hover:text-custom-white bg-custom-white text-custom-black opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex gap-2">
            Add to
            <Icon icon="iconoir:cart" className="w-4 h-4" />
          </button>
        </div>
        <Image loading="lazy" src={img} alt="" width={500} height={500} />
      </div>
      <div className="flex flex-col text-custom-fg-light" title={name}>
        <span className={`truncate ${cinzelDecorative.className}`}>{name}</span>
        <span className="text-custom-black font-sans">&#8377;{price}</span>
      </div>
    </Link>
  );
};

export default StoreProductBox;
