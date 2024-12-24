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
import { ProductImageShowcase } from "@/components/ProductImageShowcase/ProductImageShowcase";

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
  const [isCartClicked, setIsCartClicked] = useState<boolean>(false);
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
        setproduct(fetechedProduct);
      }
    };
    fetchProduct();
  }, [params, isProductDataLoading]);

  const fetchIsCartItem = async () => {
    const cartList = await getCartList();
    const isProductInCart = cartList?.some((item) => item?.id === product?.id);
    setIsCartClicked(isProductInCart);
  };
  useEffect(() => {
    fetchIsCartItem();
  }, [getCartList, product]);

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

  const handleCartClick = async () => {
    if (isCartClicked) {
      setisConfirmationModalOpen(true);
    } else {
      await setCartListById(productData, product?.id);
      fetchIsCartItem();
    }
  };
  const handleRemoveFromCart = async (id: string) => {
    if (product) {
      await removeCartItemById(product.id);
      const cartList = await getCartList();
      const isProductInCart = cartList?.some(
        (item) => item?.id === product?.id
      );
      setIsCartClicked(isProductInCart);
      setisConfirmationModalOpen(false);
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

  if (productDataError || Object.keys(product).length === 0) {
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
      <div className="flex xl:pr-16 px-2 flex-col md:flex-row max-h-screen overflow-auto relative ">
        <div className="h-3 w-full pl-6 pt-4 absolute left-0 top-0 justify-self-start">
          <Link
            href="/store"
            className=" h-3 w-10  font-semibold hover:text-2xl md:mt-0 mt-5 text-xl hover:font-bold"
          >
            ← store
          </Link>
        </div>
        {/* Left Section: Image Swiper */}
        <div
          id="storeImage"
          className="w-full md:w-3/4 h-full md:h-[110vh] bg-custom-bg-light flex flex-col md:justify-normal justify-center  p-4 mt-0 md:mt-10"
        >
          <ProductImageShowcase images={product?.relatedImages} />
        </div>
        {/* <div className="w-px h-full bg-gray-200 hidden md:flex "></div> */}
        {/* Right Section: Product Details */}
        <div className="w-full md:w-1/2 space-y-6 md:sticky top-9 md:mt-20 md:ml-10 max-h-screen">
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
             className={`bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:text-custom-white transition flex items-center gap-2 group ${
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
              onRemove={handleRemoveFromCart}
            />
          </div>
        </div>

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
