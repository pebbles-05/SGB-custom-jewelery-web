"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Keyboard,
  Mousewheel,
  FreeMode,
  Navigation,
  Thumbs,
  Zoom,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/keyboard";
import "swiper/css/mousewheel";
import ImageViewerModal from "@/components/ImageViewerModal"; // Import the ImageViewerModal component
// import "@/components/prdct.css"
import { productData } from "@/enums/enums";

interface Description {
  category: string;
  type: string;
  description: string;
  [key: string]: any;
}

interface ProductProps {
  images: string[];
  name: string;
  description: Description;
  price: number;
}

const ProductPage: React.FC<ProductProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track the current image index
  const images = productData.images;
  const name = productData.name;
  const description = productData.description;
  const price = productData.price;
  // Open the modal when an image is clicked
  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload(false);
  };

  // Handle Swiper slide change (for thumbnail navigation)
  const onSlideChange = (swiper: any) => {
    setCurrentImageIndex(swiper.activeIndex);
  };

  // Handle looping of thumbnails and current image index manually
  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Function to handle looped thumbnail index
  const getLoopedIndex = (index: number) => {
    return (index + images.length) % images.length; // This ensures it loops back to the start/end
  };
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  return (
    <div className="flex xl:px-16 px-2 flex-col md:flex-row h-screen overflow-auto md:py-8 ">
      {/* Left Section: Image Swiper */}
      <div
        id="storeImage"
        className="w-full md:w-1/2 h-1/2 md:h-full bg-custom-bg-light flex flex-col md:justify-normal justify-center  p-4"
      >
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          direction="vertical"
          loop={true} // Enable loop to make the slider infinite
          breakpoints={{
            0: {
              direction: "horizontal", // Horizontal scroll on mobile
              slidesPerView: 1,
            },
            768: {
              direction: "vertical", // Vertical scroll on desktop
              slidesPerView: 1,
            },
          }}
          spaceBetween={10}
          mousewheel={{
            enabled: true,
            thresholdDelta: 30,
            releaseOnEdges: true,
          }}
          keyboard={{
            enabled: true,
          }}
          modules={[Keyboard, Mousewheel, Thumbs, FreeMode, Navigation]}
          className="w-full md:h-3/4 rounded-lg overflow-hidden myswiper2"
          onSlideChange={onSlideChange} // Update index on slide change
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Product Image ${index + 1}`}
                className="object-contain w-full h-full drop-shadow-xl rounded-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => openModal(index)} // Trigger modal on click
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnail Navigation (below the swiper) */}
        <Swiper
          onSwiper={setThumbsSwiper}
          zoom={true}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs, Zoom]}
          className="mySwiper"
        >
          {images.map((image, index) => {
            const loopedIndex = getLoopedIndex(index); // Loop the thumbnail index
            return (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`thumbnail ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Right Section: Product Details */}
      <div className="w-full md:w-1/2 flex flex-col  p-6 md:p-8 md:sticky md:justify-normal justify-center md:top-0 gap-y-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{name}</h1>
        <div className="mb-4">
          <h2 className="text-3xl font-semibold">Description:</h2>
          <p className="text-gray-700 text-2xl mt-2">
            {description.description}
          </p>
          <div className="mt-2 text-xl">
            <span className="font-semibold text-2xl">Category:</span>{" "}
            {description.category}
          </div>
          <div className="text-xl">
            <span className="font-semibold text-2xl">Type:</span>{" "}
            {description.type}
          </div>
          {/* Render additional description fields if available */}
          {Object.keys(description).map((key) => {
            if (key !== "description" && key !== "category" && key !== "type") {
              return (
                <div key={key}>
                  <span className="font-semibold">
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </span>{" "}
                  {description[key]}
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className="flex-row flex gap-2">
          <div className="font-bold text-3xl">Price :</div>
          <div className="text-lg md:text-2xl font-bold mb-6 pt-1">
            ${price.toFixed(2)}
          </div>
        </div>
        <div className="flex gap-x-3">
          <button className="flex md:w-[30%] justify-center items-center text-xl  outline outline-2 outline-transparent hover:outline-current px-4 py-2 rounded-lg   bg-custom-sdbar-light text-custom-black  duration-300 z-10 transition-transform transform hover:scale-105 active:scale-95">
            Buy Now
          </button>
          <button className="flex md:w-[30%] justify-center items-center text-xl  outline outline-2 outline-transparent hover:outline-current px-4 py-2 rounded-lg   bg-custom-sdbar-light text-custom-black  duration-300 z-10 transition-transform transform hover:scale-105 active:scale-95">
            Add to Cart
          </button>
        </div>
      </div>

      {/* ImageViewerModal for displaying images */}
      <ImageViewerModal
        images={images}
        initialIndex={currentImageIndex}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default ProductPage;
