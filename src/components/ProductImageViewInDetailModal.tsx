import React, { useState, useRef } from "react";
import Modal from "./Modal";

const ProductImageViewInDetailModal = ({
  imageUrl,
  isOpen = true,
  onClickOutside,
}) => {
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef(null);

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
      containerClass="overflow-hidden"
      isOpen={isOpen}
      onClickOutside={() => onClickOutside()}
    >
      <img
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
      />
    </Modal>
  );
};

export default ProductImageViewInDetailModal;
