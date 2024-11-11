import React from 'react';

interface CategoricalCardProps {
  name: string;
  bgImage: string;
  pageLink: string;
}

const CategoricalCard: React.FC<CategoricalCardProps> = ({ name, bgImage, pageLink }) => {
  return (
    <div className="relative w-72 h-48 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer group">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-300 group-hover:blur-0 blur-lg"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <h2 className="text-2xl font-bold mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:text-custom-black">
          {name}
        </h2>
        <a
          href={pageLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl border hover:border-custom-bg-light px-8 py-4 rounded hover:bg-transparent hover:text-custom-white bg-custom-bg-light text-custom-black transition-transform duration-300 group-hover:scale-110"
        >
          Go to Page
        </a>
      </div>
    </div>
  );
};

export default CategoricalCard;
