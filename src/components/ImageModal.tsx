import React from "react";
import { X } from "lucide-react";

interface ImageModalProps {
  image: {
    url: string;
    alt: string;
  } | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        aria-label="Close modal"
      >
        <X size={32} />
      </button>
      <img
        src={image}
        alt={image}
        className="max-h-[90vh] max-w-[90vw] object-contain"
      />
    </div>
  );
};

export default ImageModal;
