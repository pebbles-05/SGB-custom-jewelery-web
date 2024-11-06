"use client"
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ImageCollage = () => {
  const images = Array.from({ length: 10 }, (_, i) => `/images/image${i + 1}.jpg`);
  const imageRefs = useRef([]);

  // Animate images on mount
  useEffect(() => {
    imageRefs.current.forEach((image, index) => {
      gsap.fromTo(image, { opacity: 0, y: 50 }, { duration: 1, opacity: 1, y: 0, delay: index * 0.1 });
    });
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {images.map((img, index) => (
        <div
          key={img}
          ref={(el) => (imageRefs.current[index] = el)}
          className="relative rounded-lg overflow-hidden shadow-lg bg-gray-100 break-inside-avoid"
        >
          <img
            src={img}
            alt={`Collage Image ${index}`}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageCollage;

// import React, { useEffect, useState, useRef } from 'react';
// import gsap from 'gsap';

// const ImageCollage = () => {
//   const images = Array.from({ length: 10 }, (_, i) => `/images/image${i + 1}.jpg`);
//   const [currentSet, setCurrentSet] = useState(0);
//   const imageRefs = useRef([]);

//   useEffect(() => {
//     // Start the animation loop to transition sets every 5 seconds
//     const interval = setInterval(() => {
//       animateOut();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [currentSet]);

//   const animateOut = () => {
//     // Animate each image to slide out in various directions
//     imageRefs.current.forEach((image, index) => {
//       const direction = index % 2 === 0 ? 100 : -100; // Alternate directions
//       gsap.to(image, {
//         x: direction,
//         y: -direction,
//         opacity: 0,
//         duration: 1,
//         ease: 'power2.out',
//         onComplete: () => {
//           if (index === 4) {
//             setCurrentSet((prevSet) => (prevSet + 1) % 2); // Toggle between sets
//             animateIn();
//           }
//         }
//       });
//     });
//   };

//   const animateIn = () => {
//     // Animate new images to slide into the container from outside
//     imageRefs.current.forEach((image, index) => {
//       const direction = index % 2 === 0 ? -100 : 100; // Alternate directions
//       gsap.fromTo(
//         image,
//         { x: direction, y: direction, opacity: 0 },
//         { x: 0, y: 0, opacity: 1, duration: 1, delay: 0.2 * index, ease: 'power2.out' }
//       );
//     });
//   };

//   return (
//     <div className="w-full max-w-5xl mx-auto p-4 columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
//       {images.slice(currentSet * 5, currentSet * 5 + 5).map((img, index) => (
//         <div
//           key={img}
//           ref={(el) => (imageRefs.current[index] = el)}
//           className="relative rounded-lg overflow-hidden shadow-lg bg-gray-100 break-inside-avoid"
//         >
//           <img
//             src={img}
//             alt={`Collage Image ${index}`}
//             className="w-full h-auto object-cover rounded-lg"
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ImageCollage;
