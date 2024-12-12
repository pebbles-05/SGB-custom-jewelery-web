import { useState } from 'react';

export function useImageNavigation(totalImages: number) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  };

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const selectImage = (index: number) => {
    setCurrentIndex(index);
  };

  return {
    currentIndex,
    nextImage,
    previousImage,
    selectImage,
  };
}