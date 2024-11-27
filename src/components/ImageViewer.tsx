import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";

const ImageViewer = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction) => {
    if (direction === "LEFT") {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    } else if (direction === "RIGHT") {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("LEFT"),
    onSwipedRight: () => handleSwipe("RIGHT"),
    trackMouse: true,
  });

  return (
    <div
      className="relative flex flex-row-reverse h-screen w-[90%] gap-20 bg-custom-bg-light"
      {...swipeHandlers}
    >
      {/* Main Image */}
      <div className="flex-grow relative">
        <div className="relative">
          <img
            src={images[currentIndex]}
            alt={`Product ${currentIndex + 1}`}
            className="h-full w-full object-contain transition-all duration-500 ease-in-out hover:scale-110 cursor-zoom-in opacity-100"
            onError={(e) => (e.target.src = "/placeholder-image.jpg")}
          />
        </div>

        <button
          onClick={() => handleSwipe("LEFT")}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          aria-label="Previous Image"
        >
          &#x276E;
        </button>
        <button
          onClick={() => handleSwipe("RIGHT")}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          aria-label="Next Image"
        >
          &#x276F;
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex sm:flex-col flex-row gap-2 justify-center pb-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`w-32 h-32 object-cover rounded-md border-2 cursor-pointer transition-transform duration-200 hover:scale-105 ${
              currentIndex === index ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageViewer;
