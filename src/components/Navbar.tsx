// "use client";
// import { NavbarOptions, QueryParameter } from "@/enums/enums";
// import type { NavbarOption } from "@/interface/interfaces";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// const Navbar = ({ options = NavbarOptions }: { options?: NavbarOption[] }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const [searchTerm, setSearchTerm] = useState("");
//   const currentQueryParams = new URLSearchParams(window.location.search || "");

//   useEffect(() => {
//     setSearchTerm(searchParams.get(QueryParameter.SEARCH) || "");
//   }, [pathname, searchParams]);

//   const handleFilterChange = (e?: React.FormEvent | null | undefined): void => {
//     e.preventDefault();
//     if (searchTerm) {
//       currentQueryParams.set(QueryParameter.SEARCH, searchTerm);
//     } else {
//       currentQueryParams.delete(QueryParameter.SEARCH);
//     }
//     router.push(`/store?${currentQueryParams.toString()}`);
//   };

//   return (
//     <div className="flex w-full items-center md:px-16 text-xl sticky top-0 inset-y-0 h-20 text-custom-bg-light bg-custom-fg-light z-50">
//       <Link className="md:w-16 md:h-16 w-[300%] h-3/4 mr-8" href="/">
//         <Image
//           width={3000}
//           height={3000}
//           alt="logo"
//           className="md:w-max md:h-max w-[300%] h-3/4 "
//           src="https://ik.imagekit.io/leoblaze969/logo-removebg-preview.png"
//         />
//       </Link>

//       {!pathname?.startsWith("/store") && options?.length ? (
//         options.map((item: NavbarOption) => {
//           return (
//             <Link
//               href={item.route}
//               key={item.id}
//               className="px-4 text-custom-bg-light hover:text-custom-golden hover:underline underline-offset-8"
//             >
//               {item.name}
//             </Link>
//           );
//         })
//       ) : (
//         <div className="flex w-2/3 mx-auto gap-4 items-center">
//           <form
//             onSubmit={handleFilterChange}
//             className="bg-custom-bg-light rounded-lg overflow-hidden text-custom-black flex justify-center items-center  w-full "
//           >
//             <input
//               type="text"
//               onChange={(e) => setSearchTerm(e.target.value)}
//               value={searchTerm}
//               name="searchInput"
//               placeholder="Search for Earrings,Necklace,Rings and more... "
//               className="outline-none w-full bg-transparent px-4 py-2"
//             />
//             {searchTerm ? (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setSearchTerm("");
//                   currentQueryParams.delete(QueryParameter.SEARCH);
//                   router.push(`/store?${currentQueryParams.toString()}`);
//                 }}
//                 className="flex items-center"
//               >
//                 <Icon icon="charm:cross" className="w-8 h-8" />
//               </button>
//             ) : null}
//             <button className="pr-4 pl-2 flex items-center">
//               <Icon icon="healthicons:magnifying-glass" className="w-8 h-8" />
//             </button>
//           </form>
//         </div>
//       )}
//       <Link
//         href="/store/cart/"
//         className="ml-auto w-max h-max hover:text-custom-golden"
//       >
//         <Icon icon="iconoir:cart" className="w-8 h-8" />
//       </Link>
//     </div>
//   );
// };

// export default Navbar;

"use client";
import { NavbarOptions, QueryParameter } from "@/enums/enums";
import { cartEventEmitter } from "@/helpers/useCartEmitter";
import useCartList from "@/helpers/useCartList";
import type { NavbarOption } from "@/interface/interfaces";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = ({ options = NavbarOptions }: { options?: NavbarOption[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentQueryParams = new URLSearchParams(window.location.search || "");
  const { getCartList } = useCartList();
  const [cartItemCount, setCartItemCount] = useState<number>(0);

  useEffect(() => {
    const updateCartList = async () => {
      const cartList = await getCartList();
      const cartListLength = cartList?.length;
      setCartItemCount(cartListLength);
    };
    updateCartList();
    cartEventEmitter.on("cartUpdated", updateCartList);
    return () => {
      cartEventEmitter.off("cartUpdated", updateCartList); // Clean up
    };
  }, [getCartList]);

  useEffect(() => {
    setSearchTerm(searchParams.get(QueryParameter.SEARCH) || "");
  }, [pathname, searchParams]);

  const handleFilterChange = (e?: React.FormEvent | null | undefined): void => {
    e.preventDefault();
    if (searchTerm) {
      currentQueryParams.set(QueryParameter.SEARCH, searchTerm);
    } else {
      currentQueryParams.delete(QueryParameter.SEARCH);
    }
    router.push(`/store?${currentQueryParams.toString()}`);
  };

  return (
    <nav className="flex items-center justify-normal w-full px-4 md:px-16 h-20 text-xl bg-custom-fg-light text-custom-bg-light sticky top-0 z-50">
      <Link href="/" className="w-16 h-16 flex-shrink-0">
        <Image
          width={3000}
          height={3000}
          alt="logo"
          src="https://ik.imagekit.io/leoblaze969/logo-removebg-preview.png"
          className="w-full h-full"
        />
      </Link>
      <div className="flex justify-between items-center w-full">
        <div className="flex w-full">
          {!pathname?.startsWith("/store") && options?.length ? (
            options.map((item: NavbarOption) => (
              <Link
                key={item.id}
                href={item.route}
                className="px-4 hover:text-custom-golden hover:underline underline-offset-8 hidden md:flex "
              >
                {item.name}
              </Link>
            ))
          ) : (
            <form
              onSubmit={handleFilterChange}
              className="flex justify-center items-center w-full max-w-3xl lg:mx-auto mx-5 bg-custom-bg-light rounded-lg "
            >
              <input
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                name="searchInput"
                placeholder="Search for Earrings, Necklace, Rings and more..."
                className="outline-none w-full bg-transparent px-4 py-2 text-black"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    currentQueryParams.delete(QueryParameter.SEARCH);
                    router.push(`/store?${currentQueryParams.toString()}`);
                  }}
                  className="flex items-center text-black"
                >
                  <Icon icon="charm:cross" className="w-8 h-8 text-black" />
                </button>
              )}
              <button className="pr-4 pl-2 flex items-center">
                <Icon
                  icon="healthicons:magnifying-glass"
                  className="w-8 h-8 text-black"
                />
              </button>
            </form>
          )}
        </div>

        <Link
          href="/store/cart/"
          className="ml-auto md:ml-0 text-custom-bg-light hover:text-custom-golden relative group"
        >
          <Icon icon="iconoir:cart" className="w-8 h-8" />
          {cartItemCount && cartItemCount !== 0 ? (
            <div className="absolute w-6 h-6 -top-3 -right-3 rounded-full flex items-center justify-center bg-custom-bg-light group-hover:bg-custom-golden text-custom-fg-light text-sm">
              {cartItemCount > 9 ? "9+" : cartItemCount}
            </div>
          ) : null}
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className={`md:hidden ml-4 ${pathname.startsWith("/store") ? "hidden" : ""}`}
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Icon icon="material-symbols:menu-rounded" className="w-8 h-8" />
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-custom-fg-light text-custom-bg-light flex flex-col items-start space-y-4 px-6 py-4 md:hidden z-40">
          {!pathname?.startsWith("/store") && options?.length
            ? options.map((item: NavbarOption) => (
                <Link
                  key={item.id}
                  href={item.route}
                  className="w-full px-4 py-2 hover:text-custom-golden hover:underline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))
            : null}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

// "use client";
// import { NavbarOptions, QueryParameter } from "@/enums/enums";
// import type { NavbarOption } from "@/interface/interfaces";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// const Navbar = ({ options = NavbarOptions }: { options?: NavbarOption[] }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const currentQueryParams = new URLSearchParams(window.location.search || "");

//   useEffect(() => {
//     setSearchTerm(searchParams.get(QueryParameter.SEARCH) || "");
//   }, [pathname, searchParams]);

//   const handleFilterChange = (e?: React.FormEvent | null | undefined): void => {
//     e.preventDefault();
//     if (searchTerm) {
//       currentQueryParams.set(QueryParameter.SEARCH, searchTerm);
//     } else {
//       currentQueryParams.delete(QueryParameter.SEARCH);
//     }
//     router.push(`/store?${currentQueryParams.toString()}`);
//   };

//   return (
//     <nav className="flex items-center justify-between w-full px-4 md:px-16 h-20 text-xl bg-custom-fg-light text-custom-bg-light sticky top-0 z-50">
//       <Link href="/" className="w-16 h-16 flex-shrink-0">
//         <Image
//           width={3000}
//           height={3000}
//           alt="logo"
//           src="https://ik.imagekit.io/leoblaze969/logo-removebg-preview.png"
//           className="w-full h-full"
//         />
//       </Link>
//       <div className={` md:flex items-center  ${
//           pathname !== "/store" ? "justify-center"  : "hidden"
//         } space-x-4`}>
//             {options.map((item: NavbarOption) => (
//               <Link
//                 key={item.id}
//                 href={item.route}
//                 className="px-4 hover:text-custom-golden hover:underline underline-offset-8"
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </div>
//       <div
//         className={`flex items-center w-full ${
//           pathname === "/store" ? "justify-center"  : "hidden"
//         }`}
//       >

//         {/* Search Bar */}
//         <form
//           onSubmit={handleFilterChange}
//           className="flex items-center w-full max-w-lg bg-custom-bg-light rounded-lg overflow-hidden md:w-auto mx-5 md:mx-0"
//         >
//           <input
//             type="text"
//             onChange={(e) => setSearchTerm(e.target.value)}
//             value={searchTerm}
//             name="searchInput"
//             placeholder="Search for Earrings, Necklace, Rings and more..."
//             className="outline-none w-full bg-transparent px-4 py-2 text-black"
//           />
//           {searchTerm && (
//             <button
//               type="button"
//               onClick={() => {
//                 setSearchTerm("");
//                 currentQueryParams.delete(QueryParameter.SEARCH);
//                 router.push(`/store?${currentQueryParams.toString()}`);
//               }}
//               className="flex items-center text-black"
//             >
//               <Icon icon="charm:cross" className="w-8 h-8 text-black" />
//             </button>
//           )}
//           <button className="pr-4 pl-2 flex items-center">
//             <Icon icon="healthicons:magnifying-glass" className="w-8 h-8 text-black" />
//           </button>
//         </form>

//         {/* Menu Options for Non-Store Pages */}
//         {pathname !== "/store" && (
//           <div className="hidden md:flex items-center space-x-4">
//             {options.map((item: NavbarOption) => (
//               <Link
//                 key={item.id}
//                 href={item.route}
//                 className="px-4 hover:text-custom-golden hover:underline underline-offset-8"
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Cart Icon */}
//       <Link href="/store/cart/" className="ml-auto md:ml-0">
//         <Icon icon="iconoir:cart" className="w-8 h-8 hover:text-custom-golden" />
//       </Link>

//       {/* Mobile Menu Toggle */}
//       {pathname !== "/store" && (
//         <button
//           className="md:hidden ml-4"
//           onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           <Icon icon="material-symbols:menu-rounded" className="w-8 h-8" />
//         </button>
//       )}

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && pathname !== "/store" && (
//         <div className="absolute top-20 left-0 w-full bg-custom-fg-light text-custom-bg-light flex flex-col items-start space-y-4 px-6 py-4 md:hidden z-40">
//           {options.map((item: NavbarOption) => (
//             <Link
//               key={item.id}
//               href={item.route}
//               className="w-full px-4 py-2 hover:text-custom-golden hover:underline"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               {item.name}
//             </Link>
//           ))}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
