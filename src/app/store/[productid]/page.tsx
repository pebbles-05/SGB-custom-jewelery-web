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
import { Icon } from "@iconify/react/dist/iconify.cjs";

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
  const [isCartClicked, setCartClicked] = useState(false);

  // Toggle cart icon visibility and color
  const toggleCart = () => setCartClicked(!isCartClicked);
  return (
    <div className="flex xl:pr-16 px-2 flex-col md:flex-row h-screen overflow-auto ">
      {/* Left Section: Image Swiper */}
      <div
        id="storeImage"
        className="w-full md:w-3/4 h-1/2 md:h-[110vh] bg-custom-bg-light flex flex-col md:justify-normal justify-center  p-4 "
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
          className="w-full md:h-5/6 rounded-lg overflow-hidden myswiper2"
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
          className="mySwiper md:h-1/6"
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
      <div className="w-px h-full bg-gray-500 hidden md:flex "></div>
      {/* Right Section: Product Details */}
      <div className="w-full md:w-1/2 space-y-6 md:sticky top-9 mt-5 md:ml-10">
        <h1 className="text-4xl font-bold">{product?.name}</h1>
        <div className="text-2xl font-semibold text-gray-800">
          &#8377;{product?.price}
          {product?.discount && (
            <span className="ml-4 text-xl text-red-600 line-through">
              &#8377;{product?.originalPrice}
            </span>
          )}
        </div>
        <div className="space-y-4">
          <p className="text-gray-700">{product?.description}</p>
          <div>
            <span className="font-semibold">Category:</span> {product?.category}
          </div>
          <div>
            <span className="font-semibold">Type:</span> {product?.type}
          </div>
        </div>
        <div className="flex gap-4">
          <button className="bg-custom-fg-light text-white py-2 px-4 rounded-lg hover:bg-transparent border-2 hover:text-custom-fg-light border-custom-fg-light transition">
            Buy Now
          </button>
          <button 
          onClick={(e) => {
            e.preventDefault(); // Prevent navigation on click
            toggleCart();
          }}
          className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition flex items-center gap-2 group">
            Add to Cart
            <div
          
          className={` p-2 rounded-full ${
            isCartClicked
              ? "bg-green-500 text-white"
              : "bg-custom-black/30 text-custom-white"
          } transition-all duration-300 cursor-pointer z-10 md:hover:ring-2 md:group-hover:ring-green-500 md:group-hover:scale-150 `}
        >
          <Icon icon="iconoir:cart" className="md:w-6 md:h-6 w-3 h-3" />
        </div>
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

