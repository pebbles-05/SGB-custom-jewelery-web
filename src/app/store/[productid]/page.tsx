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
import useProduct from "@/helpers/useProduct";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.cjs";
import useCartList from "@/helpers/useCartList";
import type { Product } from "@/interface/interfaces";
import RemoveCartItemPopup from "@/components/RemoveCartItemPopup";
import ModalForm from "@/components/ModalForm";
import useProductList from "@/helpers/useProductList";
import Link from "next/link";

const ProductPage = ({
  params,
}: {
  params: {
    productid: string;
  };
}) => {
  const { getCartList, setCartListById, removeCartItemById } = useCartList();
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track the current image index
  const [product, setproduct] = useState<Product>({});
  const [isCartClicked, setCartClicked] = useState<boolean>(
    getCartList()?.some((item: Product) => item.id === product.id)
  );
  const [isConfirmationModalOpen, setisConfirmationModalOpen] = useState(false);
  const {
    data: productData,
    error: productDataError,
    isLoading: isProductDataLoading,
  } = useProductList();

  useEffect(() => {
    const fetchProduct = async () => {
      const unwrappedParams = await params;
      const fetechedProduct = useProduct(
        productData,
        unwrappedParams?.productid
      );
      if (fetechedProduct) {
        setCartClicked(
          getCartList()?.some((item) => item.id === fetechedProduct.id)
        );
        setproduct(fetechedProduct);
      }
    };
    fetchProduct();
  }, [params, isProductDataLoading]);

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

  const handleCartClick = () => {
    if (isCartClicked) {
      setisConfirmationModalOpen(true);
    } else {
      setCartListById(productData, product?.id);
      setCartClicked(getCartList()?.some((item) => item.id === product?.id));
    }
  };
  const handleSubmit = () => {
    product.quantity = "1";
    setIsMdlOpen(true);
  };

  const [isMdlOpen, setIsMdlOpen] = useState(false);

  const [submissionMessage, setSubmissionMessage] = useState("");
  const handleModalSubmit = (emailData: string) => {
    console.log("Email Data:", emailData);
  };

  if (productDataError) {
    return (
      <div className="w-full h-[calc(100vh-300px)] flex items-center justify-center text-2xl text-custom-black/50">
        Error happened
      </div>
    );
  } else if (isProductDataLoading) {
    return (
      <div className="w-full h-[calc(100vh-300px)] flex items-center justify-center text-2xl text-custom-black/50">
        Loading...
      </div>
    );
  } else {
    return (
      <div className="flex xl:pr-16 px-2 flex-col md:flex-row h-screen overflow-auto relative ">
        <Link
          href="/store"
          className="w-full h-3 absolute left-0 top-0 justify-self-start font-semibold hover:text-2xl md:mt-0 mt-5 text-xl hover:font-bold"
        >
          ← store
        </Link>
        {/* Left Section: Image Swiper */}
        <div
          id="storeImage"
          className="w-full md:w-3/4 h-1/2 md:h-[110vh] bg-custom-bg-light flex flex-col md:justify-normal justify-center  p-4 mt-0 md:mt-10"
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
                direction: "horizontal", // Horizontal scroll on desktop
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
        {/* <div className="w-px h-full bg-gray-200 hidden md:flex "></div> */}
        {/* Right Section: Product Details */}
        <div className="w-full md:w-1/2 space-y-6 md:sticky top-9 md:mt-20 md:ml-10">
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
              <span className="font-semibold">Category:</span>{" "}
              {product?.category}
            </div>
            <div>
              <span className="font-semibold">Type:</span> {product?.type}
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="bg-custom-fg-light text-white py-2 px-4 rounded-lg hover:bg-transparent border-2 hover:text-custom-fg-light border-custom-fg-light transition"
            >
              Buy Now
            </button>
            <button
              onClick={() => handleCartClick()}
              className={`bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:text-custom-white transition flex items-center gap-2 group ${
                isCartClicked ? "hover:bg-red-500 " : "hover:bg-green-500 "
              }`}
            >
              {isCartClicked ? "Remove from Cart" : "Add to Cart"}

              <Icon
                icon={
                  isCartClicked ? "f7:cart-fill-badge-minus" : "iconoir:cart"
                }
                className="md:w-6 md:h-6 w-3 h-3"
              />
            </button>
            <RemoveCartItemPopup
              headerClass="text-xl"
              buttonClass="text-xs"
              isConfirmationModalOpen={isConfirmationModalOpen}
              onClickOutside={() => setisConfirmationModalOpen(false)}
              onCancel={() => setisConfirmationModalOpen(false)}
              onRemove={() => {
                removeCartItemById(product?.id);
                setCartClicked(
                  getCartList()?.some((item) => item.id === product?.id)
                );
                setisConfirmationModalOpen(false);
              }}
            />
          </div>
        </div>

        {/* ImageViewerModal for displaying images */}
        <ImageViewerModal
          images={product?.relatedImages}
          initialIndex={currentImageIndex}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
        <ModalForm
          isOpen={isMdlOpen}
          onClose={() => {
            setIsMdlOpen(false);
            setSubmissionMessage("");
          }}
          products={[product]}
          onSubmit={handleModalSubmit}
          setSubmissionMessage={setSubmissionMessage}
          SubmissionMessage={submissionMessage}
        />
      </div>
    );
  }
};

export default ProductPage;
