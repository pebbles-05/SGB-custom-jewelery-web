// "use client";
// import { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Mousewheel } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import { useGSAP } from "@gsap/react";
// import Catagory from "@/components/Catagory";

// gsap.registerPlugin(ScrollTrigger);

// interface SectionProps {
//   number: string;
//   heading: string;
//   detail: string;
// }

// const sections: SectionProps[] = [
//   {
//     "number": "01",
//     "heading": "Discover It",
//     "detail": "Explore our store for a curated selection of handmade jewelry and crafts. Find ready-made treasures waiting for you."
//   },
//   {
//     "number": "02",
//     "heading": "Dream It",
//     "detail": "Have something unique in mind? Share your ideas for custom designs crafted with clay, cloth, or oxidized materials."
//   },
//   {
//     "number": "03",
//     "heading": "Design It",
//     "detail": "Use our customization tools or let us guide you in creating a one-of-a-kind piece. Add pre-made items or custom designs to your cart."
//   },
//   {
//     "number": "04",
//     "heading": "Create It",
//     "detail": "Finalize your order with delivery details and connect with us via WhatsApp, Instagram, or Facebook for any final adjustments."
//   },
//   {
//     "number": "05",
//     "heading": "Treasure It",
//     "detail": "Receive your handcrafted jewelry—whether from our store or custom-made—ready to be cherished. Thank you for being part of our story."
//   }

// ];

// const HorizontalScrollComponent = () => {
//   const swiperRef = useRef(null);
//   const [index, setindex] = useState();


//   // Function to run GSAP animation for the elements
//   const runGsapAnimation = (swiper) => {
//     // Get the current slide (swiper.activeIndex)
//     const currentSlide = swiper.slides[swiper.activeIndex];
//     setindex(swiper.activeIndex);

//     // Select elements inside the current slide that you want to animate
//     const firstAnimationElement = currentSlide.querySelector(
//       ".first-animation-element"
//     );
//     const secondAnimationElement = currentSlide.querySelector(
//       ".second-animation-element"
//     );
//     const fourthAnimationElement = currentSlide.querySelector(
//       ".fourth-animation-element"
//     );
//     const thirdAnimationElement = currentSlide.querySelector(
//       ".third-animation-element"
//     );

//     // Run GSAP animations
//     gsap.fromTo(
//       firstAnimationElement,
//       { opacity: 0, x: 0, y: -300 },
//       { opacity: 1, x: 0, y: 0, duration: 1 }
//     );
//     gsap.fromTo(
//       secondAnimationElement,
//       { opacity: 0, x: 0, y: "50%" },
//       { opacity: 1, x: 0, y: 0, duration: 1, delay: 0.5 }
//     );
//     gsap.fromTo(
//       fourthAnimationElement,
//       { opacity: 0, x: 0, y: "50%" },
//       { opacity: 1, x: 0, y: 0, duration: 1, delay: 0.5 }
//     );
//     gsap.fromTo(
//       thirdAnimationElement,
//       { opacity: 0, x: 200, y: 0 },
//       { opacity: 1, x: 0, y: 0, duration: 0.5, delay: 0.3 }
//     );
//   };
  

//   return (
//     <>
//       <Swiper
//         ref={swiperRef}
//         direction={"horizontal"}
//         slidesPerView={1}
//         spaceBetween={0}
//         mousewheel={{
//           enabled: true,
//           thresholdDelta: 50,
//           releaseOnEdges: true,
//         }}
//         modules={[Mousewheel]}
//         onSlideChange={(swiper) => runGsapAnimation(swiper)}
//         className="mySwiper w-screen h-[80vh]"
//         id="swiperdiv"
//       >
//         {sections.map((section, i) => (
//           <SwiperSlide key={i} className="w-screen h-[90vh] relative">
//             <div className="flex md:flex-row flex-col">
//               <div className="first-animation-element w-[40%] text-9xl text-custom-fg-light">
//                 {section.number}
//               </div>
//               <div></div>

//               <div className="third-animation-element md:w-[60%] w-[100%] text-2xl text-custom-white bg-custom-sdbar-light h-screen flex justify-center items-center px-8">
//                 <span className="second-animation-element h-max mt-[20%]">
//                   {section.detail}
//                 </span>
//               </div>
//             </div>
//             <div ><h1 className="fourth-animation-element text-custom-black md:text-6xl text-5xl absolute md:top-[20%] md:left-[35%] top-[3%] left-[35%] w-[60%] z-10 transform -translate-x-[60%]">
//               {section.heading}
//             </h1></div>
            
//           </SwiperSlide>
//         ))}
//       </Swiper>
//       {index == 4 ? <Catagory /> : null};
//      </>
//   );
// };

// export default HorizontalScrollComponent;
"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import React from "react";

const stories = [
  {
    number: "01",
    heading: "Discover It",
    detail: "Explore our store for a curated selection of handmade jewelry and crafts. Find ready-made treasures waiting for you.",
    illustration: "/assets/Discover it.webp",
  },
  {
    number: "02",
    heading: "Dream It",
    detail: "Have something unique in mind? Share your ideas for custom designs crafted with clay, cloth, or oxidized materials.",
    illustration: "/assets/Dream it.webp",
  },
  {
    number: "03",
    heading: "Design It",
    detail: "Bring your unique vision to life. Share your ideas directly with us, and we'll work together to create a design crafted with clay, cloth, or oxidized materials. Explore our pre-made creations for inspiration or let your imagination lead the way.",
    illustration: "/assets/Design It.webp",
  },
  {
    number: "04",
    heading: "Create It",
    detail: "Finalize your order with delivery details and connect with us via WhatsApp, Instagram, or Facebook for any final adjustments.",
    illustration: "/assets/Create it.webp",
  },
  {
    number: "05",
    heading: "Treasure It",
    detail: "Receive your handcrafted jewelry—whether from our store or custom-made—ready to be cherished. Thank you for being part of our story.",
    illustration: "/assets/Treasure It.webp",
  },
];


const HorizontalScrollComponent = () => {
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    gsap.fromTo("#hdngg", { opacity:0,'webkitFilter': 'blur(15px)',y:20 }, {
      scrollTrigger: {
        trigger: "#hdngg",
        toggleActions: "restart reverse restart reverse",
        start: "top 50%",
      },
      opacity:1,'webkitFilter': 'blur(0px)',y:0, duration: 1
    });
  });
  return (
    <section className="py-16" >
      <div className="container mx-auto px-4">
        <h2 id="hdngg" className="text-4xl font-bold text-center mb-12 text-gray-800">
          About us
        </h2>
        <div className="grid gap-12 px-16 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, index) => (
            <div
              key={index}
              className="group cursor-pointer bg-custom-fg-light shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
            >
              {/* Illustration with gradient overlay */}
              <div className="relative h-48 bg-gray-200">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 group-hover:opacity-0 transition-opacity duration-300"></div>
                <div className="flex items-center justify-center h-full">
                <img
                src={story.illustration}
                alt={story.heading}
                className="w-full h-48 object-cover"
              />
                </div>
              </div>
              <div className="p-6">
                <span className="block text-xl font-semibold text-white">
                  {story.number}
                </span>
                <h3 className="text-2xl font-bold text-gray-100 mt-2">
                  {story.heading}
                </h3>
                <p className="text-gray-300 mt-4 font-serif">{story.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HorizontalScrollComponent;

