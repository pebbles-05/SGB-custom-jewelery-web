import React, { useState } from 'react';
import { ImageControls } from './ImageControls';
import { ProductImage } from './ProductImage';
import { useImageNavigation } from './useImageNavigation';

interface ProductImageShowcaseProps {
  images: string[];
  alt?: string;
}

export function ProductImageShowcase({ images, alt = "Product image" }: ProductImageShowcaseProps) {
  const {
    currentIndex,
    nextImage,
    previousImage,
    selectImage
  } = useImageNavigation(images.length);

  return (
    <div className="relative h-full w-full">
      <div className="relative h-full w-full bg-gray-50">
        <ProductImage
          src={images[currentIndex]}
          alt={alt}
          index={currentIndex}
        />
        
        <ImageControls
          currentIndex={currentIndex}
          totalImages={images.length}
          onPrevious={previousImage}
          onNext={nextImage}
          onSelect={selectImage}
        />
      </div>
    </div>
  );
}