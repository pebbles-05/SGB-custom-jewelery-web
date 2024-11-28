import type { StoreProductBox } from "@/interface/interfaces";
import { Icon } from "@iconify/react/dist/iconify.cjs";
import Image from "next/image";
import Link from "next/link";
import { Cinzel_Decorative } from "@next/font/google";
import { useState } from "react";
import RemoveCartItemPopup from "./RemoveCartItemPopup";
import bestsellerpng from "@/public/bestseller.png";

const cinzelDecorative = Cinzel_Decorative({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const StoreProductBox = ({
  id,
  name,
  price,
  img,
  isCartClicked = false,
  isBestSeller = false,
  onCartAdd,
  onCartRemove,
}: StoreProductBox) => {
  const [isCartIconHovered, setisCartIconHovered] = useState(false);
  const [isConfirmationModalOpen, setisConfirmationModalOpen] = useState(false);
  return (
    <Link
      href={`/store/${id}`}
      target="_blank"
      className="cursor-pointer flex flex-col gap-2 text-lg sm:text-2xl group relative"
      aria-label={`View details of ${name}`}
    >
      <div className="relative rounded-lg overflow-hidden shadow-2xl group">
        {/* Cart Icon */}
        <button
          onClick={(e) => {
            e.preventDefault();
            if (isCartClicked) {
              setisConfirmationModalOpen(true);
            } else {
              onCartAdd(id);
            }
          }}
          onMouseEnter={() => setisCartIconHovered(true)}
          onMouseLeave={() => setisCartIconHovered(false)}
          title={isCartClicked ? "Remove from cart" : "Add to cart"}
          aria-label={isCartClicked ? "Remove from cart" : "Add to cart"}
          className={`absolute bottom-3 right-3 p-2 rounded-full ${
            isCartClicked
              ? "bg-green-500 text-white hover:bg-red-500"
              : "bg-custom-black/30 text-custom-white md:opacity-0 md:group-hover:opacity-100"
          } transition-all duration-300 cursor-pointer z-10 hover:scale-125`}
        >
          <Icon
            icon={
              isCartIconHovered && isCartClicked
                ? "f7:cart-fill-badge-minus"
                : "iconoir:cart"
            }
            className="w-6 h-6"
          />
        </button>
        {isBestSeller && (
          <Image
            loading="lazy"
            src={bestsellerpng}
            alt="best seller"
            width={500}
            height={500}
            className="absolute left-0 top-0 w-20 z-10"
          />
        )}

        {/* Product Image */}
        <Image
          loading="lazy"
          src={img}
          alt={name}
          width={500}
          height={500}
          className="w-full h-auto transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col text-custom-fg-light" title={name}>
        <span
          className={`truncate ${cinzelDecorative.className} text-sm sm:text-lg`}
        >
          {name}
        </span>
        <span className="text-custom-black font-sans text-base sm:text-lg">
          &#8377;{price}
        </span>
      </div>
      <RemoveCartItemPopup
        isConfirmationModalOpen={isConfirmationModalOpen}
        onClickOutside={() => setisConfirmationModalOpen(false)}
        onCancel={() => setisConfirmationModalOpen(false)}
        onRemove={() => {
          onCartRemove(id);
          setisConfirmationModalOpen(false);
        }}
      />
    </Link>
  );
};

export default StoreProductBox;
