import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageControlsProps {
  currentIndex: number;
  totalImages: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

export function ImageControls({
  currentIndex,
  totalImages,
  onPrevious,
  onNext,
  onSelect,
}: ImageControlsProps) {
  const hasMultipleImages = totalImages > 1;
  if (!hasMultipleImages) return null;

  return (
    <>
      {/* Navigation Arrows */}
      <button
        onClick={onPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>

      {/* Image Counter */}
      <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1.5 text-sm text-white backdrop-blur-sm">
        {currentIndex + 1} / {totalImages}
      </div>

      {/* Thumbnail Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 space-x-2 rounded-full bg-white/80 p-2 backdrop-blur-sm">
        {Array.from({ length: totalImages }, (_, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-black'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
}