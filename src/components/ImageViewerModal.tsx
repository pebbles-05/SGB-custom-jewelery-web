// import React, { useState, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Thumbs, Keyboard, Mousewheel, Zoom } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/keyboard';
// import 'swiper/css/mousewheel';
// import 'swiper/css/thumbs';
// import 'swiper/css/zoom';

// interface ImageViewerModalProps {
//   images: string[];
//   initialIndex: number;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
//   images,
//   initialIndex,
//   isOpen,
//   onClose,
// }) => {
//   const [activeIndex, setActiveIndex] = useState(1);

//   const handleOverlayClick = (e: React.MouseEvent) => {
//     if (e.target === e.currentTarget) {
//       onClose(); // Close the modal when clicking outside
//     }
//   };

//   useEffect(() => {
//     // Prevent scrolling when the modal is open
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }

//     return () => {
//       document.body.style.overflow = 'auto'; // Reset scroll when the component is unmounted
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center"
//       onClick={handleOverlayClick} // Close the modal if you click outside
//     >
//       <div className="relative w-full max-w-4xl  rounded-lg overflow-hidden">
//         {/* Main Image Slider */}
//         <Swiper
//           initialSlide={initialIndex}
//           spaceBetween={10}
//           slidesPerView={1}
//           zoom={true}
//           mousewheel={{
//             enabled: true,
//             thresholdDelta:40,
//           }}
//           keyboard={true}
//           effect="slide"
//           loop={true} // Infinite loop
//           onSlideChange={(swiper) => {setActiveIndex(swiper.activeIndex+1);console.log(swiper.activeIndex);

//           }} // Set active image index
//           modules={[Thumbs, Keyboard, Mousewheel, Zoom]}
//           className="w-full h-full"
//         >
//           {images.map((image, index) => (
//             <SwiperSlide key={index}>
//               <div className="swiper-zoom-container">
//                 <img
//                   src={image}
//                   alt={`Image ${index + 1}`}
//                   className={`object-contain w-full h-full ${
//                     index === activeIndex ? 'border-4 border-light-blue-500' : ''
//                   }`} // CHANGED: Added border for active image
//                 />
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* Thumbnail Navigation (Sync with main slider) */}
//         <Swiper
//           spaceBetween={10}
//           slidesPerView={5}
//           freeMode={true}
//           watchSlidesProgress={true}
//           thumbs={{ swiper: '.swiper' }} // Sync the thumbs gallery with main swiper
//           loop={true} // Enable infinite loop on thumbnail gallery
//           className="mt-4"
//         >
//           {images.map((image, index) => (
//             <SwiperSlide key={index}>
//               <img
//                 src={image}
//                 alt={`Thumbnail ${index + 1}`}
//                 className={`object-cover w-full h-full rounded-lg cursor-pointer ${
//                   index === activeIndex ? 'border-4 border-light-blue-500' : ''
//                 }`} // CHANGED: Added border for active thumbnail
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* Caption or Notation to indicate active image */}
//         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white p-2 rounded-md">
//           <span>
//             Image {activeIndex + 1} of {images.length}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageViewerModal;

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Keyboard,
  Mousewheel,
  FreeMode,
  Navigation,
  Thumbs,
  Zoom,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/keyboard";
import "swiper/css/mousewheel";
import "swiper/css/thumbs";
import "swiper/css/zoom";
interface ImageViewerModalProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  images,
  initialIndex,
  isOpen,
  onClose,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close the modal when clicking outside
    }
  };

  useEffect(() => {
    // Prevent scrolling when the modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Reset scroll when the component is unmounted
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center  xs:items-center w-full h-full"
      onClick={handleOverlayClick} // Close the modal if you click outside
    >
      <div
        id="Modalimg"
        className="relative w-full md:max-w-[40%] max-w-[80%] md:max-h-[80%] max-h-[60%] top-[30%] rounded-lg overflow-hidden"
      >
        {/* Main Image Slider */}
        <Swiper
          initialSlide={initialIndex}
          spaceBetween={10}
          slidesPerView={1}
          zoom={true}
          mousewheel={{
            enabled: true,
            thresholdDelta: 40,
          }}
          keyboard={true}
          effect="slide"
          loop={true} // Infinite loop
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Sync active index
          modules={[Thumbs, Keyboard, Mousewheel, Zoom, FreeMode, Navigation]}
          thumbs={{ swiper: thumbsSwiper }} // Sync the thumbs gallery with main swiper
          className="w-full h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="swiper-zoom-container">
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className={`object-contain w-full h-full`} // Added border for active image
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnail Navigation (Sync with main slider) */}
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`object-cover w-full h-full rounded-lg cursor-pointer `} // Added border for active thumbnail
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ImageViewerModal;
