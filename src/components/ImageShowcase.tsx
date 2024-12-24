"use client";
import React, { useRef, useState, useEffect } from "react";
import ImageModal from "./ImageModal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
interface Image {
  url: string;
  alt: string;
}

const images = Array.from({ length: 5 }, (_, i) => `/images/image${i + 1}.jpg`);

const ImageShowcase: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const handleAutoScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const currentScroll = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const nextScroll = currentScroll + container.clientWidth / 2;

    container.scrollTo({
      left: nextScroll > maxScroll ? 0 : nextScroll,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const intervalId = setInterval(handleAutoScroll, 5000);
    return () => clearInterval(intervalId);
  }, []);
  useGSAP(() => {
    gsap.fromTo(
      "#hdng",
      { opacity: 0, webkitFilter: "blur(15px)", y: 20 },
      {
        scrollTrigger: {
          trigger: "#hdng",
          toggleActions: "restart reverse restart reverse",
          start: "top 50%",
        },
        opacity: 1,
        webkitFilter: "blur(0px)",
        y: 0,
        duration: 1,
      }
    );
  });
  return (
    <>
      <h2
        id="hdng"
        className="text-4xl font-bold mt-10 text-center mb-12 text-gray-800"
      >
        Work Gallery
      </h2>
      <div
        ref={scrollContainerRef}
        className="relative flex overflow-x-auto scrollbar-hide mx-10 mt-20 snap-x snap-mandatory"
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="flex gap-4 p-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-none items-center my-auto w-[80vw] md:w-[45vw] lg:w-[30vw] h-[40vh] snap-center "
            >
              <div className="w-full z-10 group-hover:scale-[1.02] bg-gradient-to-b from-transparent via-transparent to-black/60 opacity-100 group-hover:opacity-0 transition-opacity duration-500"></div>
              <div
                className="w-full h-full relative group cursor-pointer "
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={image}
                  className="w-full h-full object-cover rounded-lg transition-transform  duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
};

export default ImageShowcase;
