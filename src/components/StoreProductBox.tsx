
// import type { StoreProductBox } from "@/interface/interfaces";
// import { Icon } from "@iconify/react/dist/iconify.cjs";
// import Image from "next/image";
// import Link from "next/link";
// import { Cinzel_Decorative } from "@next/font/google";
// import { useState } from "react";

// const cinzelDecorative = Cinzel_Decorative({
//   weight: ["400", "700"],
//   subsets: ["latin"],
// });

// const StoreProductBox = ({ id, name, price, img }: StoreProductBox) => {
//   const [isCartClicked, setCartClicked] = useState(false);

//   // Toggle cart icon visibility and color
//   const toggleCart = () => setCartClicked(!isCartClicked);

//   return (
//     <Link
//       href={`/store/${id}`}
//       target="_blank"
//       className="cursor-pointer flex flex-col gap-2 text-lg sm:text-2xl group relative"
//     >
//       <div className="relative rounded-lg overflow-hidden shadow-2xl">
//         {/* Cart Icon */}
//         <div
//           onClick={(e) => {
//             e.preventDefault(); // Prevent navigation on click
//             toggleCart();
//           }}
//           className={`absolute top-3 right-3 p-2 rounded-full ${
//             isCartClicked
//               ? "bg-green-500 text-white"
//               : "bg-custom-black/30 text-custom-white opacity-0 group-hover:opacity-100"
//           } transition-all duration-300 cursor-pointer z-10  hover:scale-125`}
//         >
//           <Icon icon="iconoir:cart" className="w-6 h-6" />
//         </div>

//         {/* Hover Overlay */}
        

//         {/* Product Image */}
//         <Image
//           loading="lazy"
//           src={img}
//           alt={name}
//           width={500}
//           height={500}
//           className="w-full h-auto"
//         />
//       </div>

//       {/* Product Info */}
//       <div className="flex flex-col text-custom-fg-light" title={name}>
//         <span
//           className={`truncate ${cinzelDecorative.className} text-sm sm:text-lg`}
//         >
//           {name}
//         </span>
//         <span className="text-custom-black font-sans text-base sm:text-lg">
//           &#8377;{price}
//         </span>
//       </div>
//     </Link>
//   );
// };

// export default StoreProductBox;

import type { StoreProductBox } from "@/interface/interfaces";
import { Icon } from "@iconify/react/dist/iconify.cjs";
import Image from "next/image";
import Link from "next/link";
import { Cinzel_Decorative } from "@next/font/google";
import { useState } from "react";

const cinzelDecorative = Cinzel_Decorative({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const StoreProductBox = ({ id, name, price, img }: StoreProductBox) => {
  const [isCartClicked, setCartClicked] = useState(false);
  const [counter, setCounter] = useState(1); // Counter starts at 1

  // Toggle cart and reset counter to 1 if cart is opened
  const toggleCart = () => {
    setCartClicked((prev) => {
      if (!prev) setCounter(1); // Reset counter when enabling
      return !prev;
    });
  };

  const incrementCounter = () => setCounter((prev) => prev + 1);

  const decrementCounter = () => {
    if (counter > 1) {
      setCounter((prev) => prev - 1);
    } else {
      // Hide counter and toggle cart off when decremented to 0
      setCartClicked(false);
      setCounter(1); // Reset counter when hiding
    }
  };

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
            toggleCart();
          }}
          aria-label={isCartClicked ? "Remove from cart" : "Add to cart"}
          className={`absolute top-3 right-3 p-2 rounded-full ${
            isCartClicked
              ? "bg-green-500 text-white"
              : "bg-custom-black/30 text-custom-white opacity-0 group-hover:opacity-100"
          } transition-all duration-300 cursor-pointer z-10 hover:scale-125`}
        >
          <Icon icon="iconoir:cart" className="w-6 h-6" />
        </button>

        {/* Counter (Visible only if cart is clicked) */}
        {isCartClicked && (
          <div className="absolute bottom-3 left-3 flex items-center gap-2  bg-custom-bg-light bg-opacity-20 text-black p-2 rounded-full shadow-md z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                decrementCounter();
              }}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500 text-white text-sm hover:bg-red-600"
            >
              -
            </button>
            <span className="text-sm font-medium">{counter}</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                incrementCounter();
              }}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-green-500 text-white text-sm hover:bg-green-600"
            >
              +
            </button>
          </div>
        )}

        {/* Product Image */}
        <Image
          loading="lazy"
          src={img}
          alt={`Image of ${name}`}
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
    </Link>
  );
};

export default StoreProductBox;
