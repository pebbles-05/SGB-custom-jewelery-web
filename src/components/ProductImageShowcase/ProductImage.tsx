import React from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  index: number;
}

export function ProductImage({ src, alt, index }: ProductImageProps) {
  return (
    <img
      src={src}
      alt={`${alt} ${index + 1}`}
      className="h-full w-full object-cover object-center"
    />
  );
}