import React, { useState, useRef } from "react";
import Modal from "./Modal";
import { ProductImage } from "./ProductImageShowcase/ProductImage";
import { ImageControls } from "./ProductImageShowcase/ImageControls";
import { useImageNavigation } from "./ProductImageShowcase/useImageNavigation";

const ProductImageViewInDetailModal = ({
  imageUrl,
  isOpen = true,
  onClickOutside,
}) => {
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef(null);
  const { currentIndex, nextImage, previousImage, selectImage } =
    useImageNavigation(imageUrl.length);
  const handleWheel = (e) => {
    e.preventDefault();

    const zoomFactor = 0.7;
    const newZoom = Math.max(
      1,
      zoom + (e.deltaY < 0 ? zoomFactor : -zoomFactor)
    );
    setZoom(newZoom);
  };

  return (
    <Modal
      containerClass="overflow-auto"
      isOpen={isOpen}
      onClickOutside={() => onClickOutside()}
    >
      {/* <img
        src={imageUrl}
        alt="Zoomable"
        ref={containerRef}
        onWheel={handleWheel}
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "center", // Always zoom from the center
          transition: "transform 0.1s ease-out",
        }}
        className="w-[60vw]"
      /> */}

      <div>
        <ProductImage
          src={imageUrl[currentIndex]}
          alt={imageUrl[currentIndex]}
          index={currentIndex}
        />
      </div>

      <ImageControls
        currentIndex={currentIndex}
        totalImages={imageUrl.length}
        onPrevious={previousImage}
        onNext={nextImage}
        onSelect={selectImage}
      />
    </Modal>
  );
};

export default ProductImageViewInDetailModal;
