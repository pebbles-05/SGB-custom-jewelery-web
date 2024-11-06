// "use client"
// // import React, { useEffect, useRef } from 'react';
// // import gsap from 'gsap';

// // const ImageCollage = () => {
// //   const images = Array.from({ length: 10 }, (_, i) => `/images/image${i + 1}.jpg`);
// //   const imageRefs = useRef([]);

// //   // Animate images on mount
// //   useEffect(() => {
// //     imageRefs.current.forEach((image, index) => {
// //       gsap.fromTo(image, { opacity: 0, y: 50 }, { duration: 1, opacity: 1, y: 0, delay: index * 0.1 });
// //     });
// //   }, []);

// //   return (
// //     <div className="w-full max-w-5xl mx-auto p-4 columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
// //       {images.map((img, index) => (
// //         <div
// //           key={img}
// //           ref={(el) => (imageRefs.current[index] = el)}
// //           className="relative rounded-lg overflow-hidden shadow-lg bg-gray-100 break-inside-avoid"
// //         >
// //           <img
// //             src={img}
// //             alt={`Collage Image ${index}`}
// //             className="w-full h-auto object-cover rounded-lg"
// //           />
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default ImageCollage;

// "use client";
// import React, { useEffect, useRef, useState } from 'react';
// import gsap from 'gsap';

// const ImageCollage = () => {
//   const images = Array.from({ length: 10 }, (_, i) => `/images/image${i + 1}.jpg`);
//   const [currentSet, setCurrentSet] = useState(0);
//   const imageRefs = useRef([]);

//   // Function to animate images in and out
//   const animateImages = () => {
//     // Animate out current images
//     imageRefs.current.forEach((image, index) => {
//       gsap.to(image, {
//         opacity: 0,
//         y: -500,
//         duration: 1,
//         stagger: {
//           amount: 1.5,
//           grid: [2,1],
//           axis: "y",
//           ease:'circ.inOut',
//           from: "center",
//         },
//         ease: "power2.out",
//         onComplete: () => {
//           if (index === 4) {
//             // Once all current images are out, update to the next set
//             setCurrentSet((prevSet) => (prevSet + 1) % 2);
            
//           }
//           animateIn();
//         },
//       });
//     });
//   };

//   const animateIn = () => {
//     // Animate in the next set of images
//     imageRefs.current.forEach((image, index) => {
//       gsap.fromTo(
//         image,
        
//         { opacity: 0, y: -500 },
//         { opacity: 1, y: 0, duration: 1, delay: index * 0.1, ease: "power2.out" }
//       );
//     });
//   };

//   // Run the animation every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(animateImages, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="w-full max-w-5xl mx-auto p-4 columns-2 md:columns-3 lg:columns-3 gap-4 space-y-4">
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

"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const ImageCollage = () => {
  const images = Array.from({ length: 10 }, (_, i) => `/images/image${i + 1}.jpg`);
  const [currentSet, setCurrentSet] = useState(0);
  const imageRefs = useRef([]);

  // Animate images out (exit animation)
  const animateImagesOut = () => {
    const timeline = gsap.timeline();

    // Loop over each image and create a unique exit animation
    imageRefs.current.forEach((image, index) => {
      timeline.to(image, {
        opacity: 0,
        x: (Math.random() - 0.5) * 200, // Random horizontal movement
        y: (Math.random() - 0.5) * 200, // Random vertical movement
        rotation: Math.random() * 360, // Random rotation for chaos
        // duration: 1 + Math.random() * 0.5, // Random duration for each image
        ease: "power2.inOut",
        // delay: index * 0.1, // Staggered delay for each image
        onComplete: () => {
          if (index === 4 || index === 9) {
            // Once all current images are out, update to the next set
            setCurrentSet((prevSet) => (prevSet + 1) % 2);
            console.log("done");
            
            animateImagesIn();
          }
        },
      });
    });
  };

  // Animate images in (entry animation)
  const animateImagesIn = () => {
    const timeline = gsap.timeline();

    // Loop over each image and create a unique entry animation
    imageRefs.current.forEach((image, index) => {
      // When images enter, we will ensure they come in one-by-one
      timeline.fromTo(
        image,
        {
          opacity: 0,
          x: 300, // Come from the right side off-screen
          y: Math.random() * 100 - 50, // Random vertical movement to add chaos
          rotation: Math.random() * 180, // Random rotation for a unique entry
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          // duration: 1, // Make the animation smooth and quick
          ease: "power2.out",
          // delay: index * 0.1, // Staggered delay for each image
        }
      );
    });
  };

  // Ensure the transition between images happens every 5 seconds
  useEffect(() => {
    const interval = setInterval(animateImagesOut, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {images.slice(currentSet * 5, currentSet * 5 + 5).map((img, index) => (
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
