


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
//       className="cursor-pointer flex flex-col gap-2 text-2xl group relative"
//     >
//       <div className="relative rounded-lg overflow-hidden shadow-2xl">
        
//         {/* Cart Icon */}
        // <div
        //   onClick={(e) => {
        //     e.preventDefault(); // Prevent navigation on click
        //     toggleCart();
        //   }}
        //   className={`absolute top-3 right-3 p-2 rounded-full ${
        //     isCartClicked
        //       ? "bg-green-500 text-white"
        //       : "bg-custom-black/30 text-custom-white opacity-0 group-hover:opacity-100"
        //   } transition-all duration-300 cursor-pointer z-10 hover:ring-2 hover:ring-green-500 hover:scale-150`}
        // >
        //   <Icon icon="iconoir:cart" className="w-6 h-6" />
        // </div>

//         {/* Hover Overlay */}
//         <div className="bg-custom-black/30 absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-8 p-4">
//           {/* Comments Button */}
//           <button className="flex justify-center items-center text-xl w-full outline outline-2 outline-transparent hover:outline-current px-4 py-2 rounded-lg hover:bg-transparent hover:text-custom-white bg-custom-white text-custom-black opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex gap-2">
//             Add Comments
//             <Icon icon="iconoir:chat" className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Product Image */}
//         <Image loading="lazy" src={img} alt="" width={500} height={500} />
//       </div>

//       {/* Product Info */}
//       <div className="flex flex-col text-custom-fg-light" title={name}>
//         <span className={`truncate ${cinzelDecorative.className}`}>{name}</span>
//         <span className="text-custom-black font-sans">&#8377;{price}</span>
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

  // Toggle cart icon visibility and color
  const toggleCart = () => setCartClicked(!isCartClicked);

  return (
    <Link
      href={`/store/${id}`}
      target="_blank"
      className="cursor-pointer flex flex-col gap-2 text-lg sm:text-2xl group relative"
    >
      <div className="relative rounded-lg overflow-hidden shadow-2xl">
        {/* Cart Icon */}
        <div
          onClick={(e) => {
            e.preventDefault(); // Prevent navigation on click
            toggleCart();
          }}
          className={`absolute top-3 right-3 p-2 rounded-full ${
            isCartClicked
              ? "bg-green-500 text-white"
              : "bg-custom-black/30 text-custom-white opacity-0 group-hover:opacity-100"
          } transition-all duration-300 cursor-pointer z-10 hover:ring-2 hover:ring-green-500 hover:scale-150`}
        >
          <Icon icon="iconoir:cart" className="w-6 h-6" />
        </div>

        {/* Hover Overlay */}
        

        {/* Product Image */}
        <Image
          loading="lazy"
          src={img}
          alt={name}
          width={500}
          height={500}
          className="w-full h-auto"
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
