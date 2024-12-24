import React, { useState } from "react";
import ProductImageViewInDetailModal from "@/components/ProductImageViewInDetailModal";

interface ProductImageProps {
  src: string;
  alt: string;
  index: number;
}

export function ProductImage({ src, alt, index }: ProductImageProps) {
  const [isImagePreviewModalOpen, setIsImagePreviewModalOpen] = useState(false); // Track modal state
  //const handleClick = () => {
  //  const newWindow = window.open("", "_blank");
  //  newWindow.document.body.style.margin = "0";
  //  newWindow.document.body.style.backgroundColor = "black";
  //  const img = newWindow.document.createElement("img");
  //  img.src = src; // Replace with your image source
  //  img.style.display = "block";
  //  img.style.margin = "auto";
  //  img.style.width = "100%";
  //  img.style.height = "100%";
  //  img.style.objectFit = "contain"; // Ensures the image is scaled correctly
  //  newWindow.document.body.appendChild(img);
  //};
  return (
    <>
      <img
        src={src}
        loading="lazy"
        alt={`${alt} ${index + 1}`}
        className="h-full max-w-full mx-auto object-contain rounded-xl"
        onClick={() => setIsImagePreviewModalOpen(true)}
      />
      <ProductImageViewInDetailModal
        isOpen={isImagePreviewModalOpen}
        onClickOutside={() => setIsImagePreviewModalOpen(false)}
        imageUrl={src}
      />
    </>
  );
}
