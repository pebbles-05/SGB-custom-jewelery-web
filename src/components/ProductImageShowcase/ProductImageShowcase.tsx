import React, { useState } from "react";
import { ImageControls } from "./ImageControls";
import { ProductImage } from "./ProductImage";
import { useImageNavigation } from "./useImageNavigation";
import ProductImageViewInDetailModal from "../ProductImageViewInDetailModal";

interface ProductImageShowcaseProps {
  images: string[];
  alt?: string;
}

export function ProductImageShowcase({
  images,
  alt = "Product image",
}: ProductImageShowcaseProps) {
  const { currentIndex, nextImage, previousImage, selectImage } =
    useImageNavigation(images.length);
  const [isImagePreviewModalOpen, setIsImagePreviewModalOpen] = useState(false); // Track modal state
  return (
    <div className="relative mt-10 md:mt-0 h-full w-full">
      <div className="relative h-2/3 mx-auto bg-custom-bg-light overflow-hidden items-start   rounded-lg">
        <div onClick={() => setIsImagePreviewModalOpen(true)}>
          <ProductImage
            src={images[currentIndex]}
            alt={alt}
            index={currentIndex}
          />
        </div>

        <ImageControls
          currentIndex={currentIndex}
          totalImages={images.length}
          onPrevious={previousImage}
          onNext={nextImage}
          onSelect={selectImage}
        />
        <ProductImageViewInDetailModal
          isOpen={isImagePreviewModalOpen}
          onClickOutside={() => setIsImagePreviewModalOpen(false)}
          imageUrl={images}
        />
      </div>
    </div>
  );
}
