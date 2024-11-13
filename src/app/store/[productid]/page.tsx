"use client";

import React, { useEffect, useState } from "react";
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
import { getProduct } from "@/helpers/getProduct";
import Image from "next/image";

const ProductPage = ({
  params,
}: {
  params: {
    productid: string;
  };
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track the current image index
  const [product, setproduct] = useState({});

  useEffect(() => {
    const fetchProduct = () => {
      const productData = getProduct(params?.productid);
      setproduct(productData);
      console.log(productData);
    };
    fetchProduct();
  }, [params]);

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
    return (
      (index + product?.relatedImages?.length) % product?.relatedImages?.length
    ); // This ensures it loops back to the start/end
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
          {product?.relatedImages?.map((src, index) => (
            <SwiperSlide key={index}>
              <Image
                src={src}
                width={1000}
                height={1000}
                loading="lazy"
                alt={`Product Image ${index + 1}`}
                className="object-contain w-full h-full drop-shadow-xl rounded-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => openModal(index)}
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
          {product?.relatedImages?.map((image, index) => {
            const loopedIndex = getLoopedIndex(index);
            return (
              <SwiperSlide key={index}>
                <Image
                  src={image}
                  width={500}
                  height={500}
                  loading="lazy"
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
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{product?.name}</h1>
        <div className="mb-4">
          <h2 className="text-3xl font-semibold">Description:</h2>
          <p className="text-gray-700 text-2xl mt-2">{product?.description}</p>
          <div className="mt-2 text-xl">
            <span className="font-semibold text-2xl">Category:</span>{" "}
            {product?.category}
          </div>
          <div className="text-xl">
            <span className="font-semibold text-2xl">Type:</span>{" "}
            {product?.type}
          </div>
        </div>
        <div className="flex-row flex gap-2">
          <div className="font-bold text-3xl">Price: </div>
          <div className="text-lg md:text-2xl font-bold mb-6 pt-1">
            &#8377;{product?.price}
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
        images={product?.relatedImages}
        initialIndex={currentImageIndex}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default ProductPage;
