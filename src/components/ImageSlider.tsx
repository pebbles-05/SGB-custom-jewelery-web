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
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import useInterSectionObserver from "@/helpers/useInterSectionObserver";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const ImageSlider = () => {
  gsap.registerPlugin(ScrollTrigger);
  const images = Array.from(
    { length: 5 },
    (_, i) => `/images/image${i + 1}.jpg`
  );
  const [currentSet, setCurrentSet] = useState(0);
  const imageRefs = useRef([]);

  const getCordsbyPosition = (index: number) => {
    switch (index) {
      case 0:
        return {
          x: -300,
          y: 0,
          rotation: 45,
          targetRotation: 10,
        };
      case 1:
        return {
          x: 0,
          y: 300,
          rotation: 45,
          targetRotation: -5,
        };
      case 2:
        return {
          x: 300,
          y: -300,
          rotation: 45,
          targetRotation: 10,
        };
      case 3:
        return {
          x: 0,
          y: 300,
          rotation: 45,
          targetRotation: -20,
        };
      case 4:
        return {
          x: 300,
          y: 0,
          rotation: 45,
          targetRotation: 20,
        };
      default:
        break;
    }
  };

  // Animate images out (exit animation)
  const animateImagesOut = () => {
    gsap.to(imageRefs.current, {
      //scrollTrigger: {
      //  trigger: "#productImageDIv",
      //  toggleActions: "restart reverse restart reverse",
      //  start: "20% top",
      //},
      opacity: 0,
      x: (index) => getCordsbyPosition(index)?.x,
      y: (index) => getCordsbyPosition(index)?.y,
      rotation: (index) => getCordsbyPosition(index)?.rotation,
      duration: 0.5,
      ease: "power2.inOut",
      stagger: 0, // No delay between images; all animate together
      //onComplete: () => {
      //  setCurrentSet((prevSet) => (prevSet + 1) % 2);
      //  animateImagesIn();
      //},
    });
  };

  // Animate images in (entry animation)
  const animateImagesIn = () => {
    gsap.fromTo(
      imageRefs.current,
      {
        //scrollTrigger: {
        //  trigger: "#productImageDIv",
        //  toggleActions: "restart reverse restart reverse",
        //  start: "20% top",
        //},
        opacity: 0,
        x: (index) => getCordsbyPosition(index)?.x,
        y: (index) => getCordsbyPosition(index)?.y,
        rotation: (index) => getCordsbyPosition(index)?.rotation,
      },
      {
        //scrollTrigger: {
        //  trigger: "#productImageDIv",
        //  toggleActions: "restart reverse restart reverse",
        //  start: "20% top",
        //},
        opacity: 1,
        x: 0,
        y: 0,
        rotation: (index) => getCordsbyPosition(index)?.targetRotation,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0, // No delay between images; all animate together
      }
    );
  };

  // Ensure the transition between images happens every 5 seconds
  //useEffect(() => {
  //  const interval = setInterval(animateImagesOut, 5000);
  //  return () => clearInterval(interval);
  //}, []);
  const getPositionbyIndex = (index) => {
    switch (index) {
      case 0:
        return "top-[10%] left-[8%] w-[17%] rotate-[10deg] shadow-2xl shadow-custom-black";
      case 1:
        return "bottom-[10%] left-[27%] w-[25%] -rotate-[5deg] shadow-2xl shadow-custom-black";
      case 2:
        return "top-[10%] left-[33%] w-[23%] rotate-[10deg] shadow-2xl shadow-custom-black";
      case 3:
        return "top-[10%] left-[60%] w-[17%] -rotate-[20deg] shadow-2xl shadow-custom-black";
      case 4:
        return "top-[20%] right-[5%] w-[20%] rotate-[20deg] shadow-2xl shadow-custom-black";
      default:
        return "hidden";
    }
  };
  const { elementRef, isVisible } = useInterSectionObserver({
    threshold: 0.5,
    onVisible: () => {
      animateImagesIn();
      console.log("visible");
    },
    onLeave: () => {
      animateImagesOut();

      console.log("invisible");
    },
    refName: "elementRef", // Name of the ref returned by the hook
    boolName: "isVisible", // Name of the visibility boolean returned by the hook
  });

  return (
    <>
      <button onClick={() => animateImagesIn()}>animatein</button>
      <button onClick={() => animateImagesOut()}>animateout</button>
      <div
        id="productImageDIv"
        className="relative w-full h-[80vh] overflow-hidden p-4 grid grid-cols-4 gap-4 px-16 py-8"
      >
        {images.map((img, index) => (
          <Image
            ref={(el) => (imageRefs.current[index] = el)}
            key={index}
            src={img}
            alt={`Collage Image ${index}`}
            width={500}
            height={500}
            className={`absolute object-cover rounded-xl break-inside-avoid ${getPositionbyIndex(index)}`}
          />
        ))}
      </div>
    </>
  );
};

export default ImageSlider;
