// import Link from "next/link";
// import React from "react";

// interface CategoricalCardProps {
//   name: string;
//   bgImage: string;
//   pageLink: string;
//   description: string;
// }

// const CategoricalCard: React.FC<CategoricalCardProps> = ({
//   name,
//   bgImage,
//   pageLink,
//   description,
// }) => {
//   return (
//     <div className="p-4 relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer group flex-shrink-0 w-full aspect-square  flex flex-col gap-8 justify-center items-center">
//       <div
//         className="absolute inset-0  brightness-75  group-hover:blur-sm transition-all duration-300 bg-cover bg-center"
//         style={{ backgroundImage: `url(${bgImage})` }}
//       ></div>
//       <h2 className="md:text-3xl text-xl text-custom-white font-bold z-10 drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)]">
//         {name}
//       </h2>
//       <Link
//         href={pageLink}
//         rel="noopener noreferrer"
//         className="flex justify-center items-center md:text-xl text-sm w-full outline outline-2 outline-transparent hover:outline-current px-4 py-2 rounded-lg hover:bg-transparent hover:text-custom-white bg-custom-white text-custom-black md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 z-10"
//       >
//         Explore
//       </Link>
//     </div>
//   );
// };

// export default CategoricalCard;

// import React from "react";
// interface CategoricalCardProps {
// name: string;
// bgImage: string;
// pageLink: string;
// description: string;
// }
// const CategoricalCard: React.FC<CategoricalCardProps> = ({
//   name,
//   bgImage,
//   pageLink,
//   description,
// }) => {
//   return (
//     <div
//       className="group relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
//       style={{
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300"></div>
//       <div className="absolute bottom-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
//         <h2 className="text-2xl font-semibold">{name}</h2>
//         <p className="mt-2 text-sm">{description}</p>
//         <a
//           href={pageLink}
//           className="inline-block mt-4 px-4 py-2 text-sm font-medium text-black bg-white rounded-full hover:bg-gray-200 transition-all duration-300"
//         >
//           Explore
//         </a>
//       </div>
//     </div>
//   );
// };

// export default CategoricalCard;

import React from "react";

interface CardProps {
  name: string;
  bgImage: string;
  pageLink: string;
  description: string;
}

const Card: React.FC<CardProps> = ({
  name,
  description,
  bgImage,
  pageLink,
}) => {
  return (
    <div className="group relative flex flex-col items-center justify-between overflow-hidden bg-white text-gray-900 shadow-lg rounded-lg transition-shadow duration-300 hover:shadow-2xl cursor-default hover:scale-105 aspect-square">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center transform transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-70 group-hover:opacity-80"></div>

      {/* Content */}
      <div className="relative w-full h-full p-6 flex flex-col justify-end transition-all duration-300 group-hover:justify-between gap-2">
        {/* Title (initially at the bottom left) */}
        <h2 className="text-2xl font-bold text-white  group-hover:mb-0  group-hover:text-gray-200 transform transition-all duration-300 w-1/2 ">
          {name}
        </h2>

        {/* Description and Button (initially hidden and sliding up on hover) */}
        <div className="text-sm text-gray-200 opacity-100   ">
          <p className=" overflow-scroll">{description}</p>
          <a
            href={pageLink}
            className="inline-block mt-4 px-6 py-2 text-sm font-semibold uppercase bg-transparent text-white rounded-full shadow-md hover:bg-white hover:text-black border-2 border-white focus:outline-none focus:ring focus:ring-yellow-400 cursor-pointer"
          >
            Explore
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
