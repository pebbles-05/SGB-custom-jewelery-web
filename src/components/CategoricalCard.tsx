import Link from "next/link";
import React from "react";

interface CategoricalCardProps {
  name: string;
  bgImage: string;
  pageLink: string;
}

const CategoricalCard: React.FC<CategoricalCardProps> = ({
  name,
  bgImage,
  pageLink,
}) => {
  return (
    <div className="p-4 relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer group flex-shrink-0 w-full aspect-square  flex flex-col gap-8 justify-center items-center">
      <div
        className="absolute inset-0  brightness-75  group-hover:blur-sm transition-all duration-300 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <h2 className="text-3xl text-custom-white font-bold z-10 drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)]">
        {name}
      </h2>
      <Link
        href={pageLink}
        rel="noopener noreferrer"
        className="flex justify-center items-center text-xl w-full outline outline-2 outline-transparent hover:outline-current px-4 py-2 rounded-lg hover:bg-transparent hover:text-custom-white bg-custom-white text-custom-black opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
      >
        Explore
      </Link>
    </div>
  );
};

export default CategoricalCard;
