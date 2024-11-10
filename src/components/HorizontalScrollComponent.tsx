"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
  number: string;
  heading: string;
  detail: string;
}

const sections: SectionProps[] = [
  {
    number: "01",
    heading: "Talk About It",
    detail:
      "Discuss design ideas, options, budget, with me - your guide to the custom experience.Or browse in our store area to select your Ornaments.",
  },
  {
    number: "02",
    heading: "Get It Designed",
    detail:
      "Provide your idea for the handmade jewelry or crafts with oxidised or other materials ( eg. Clay, cloth) from the Customize button at the top. Or select our pre made designs from the store and add them to cart.",
  },
  {
    number: "03",
    heading: "See It Come To Life",
    detail:
      "Place your order by contacting via place order button using your Number( for contact) address ( for delivery )  and any choice of your social media ( Whatsapp , Facebook , Instagram) for further consult and discussion ",
  },
  {
    number: "04",
    heading: "Treasure It",
    detail:
      "Receive your custom piece, as it is a precious one as you are to us, Thank You.",
  },
];

const HorizontalScrollComponent = () => {
  const swiperRef = useRef(null);
  const enableMousewheel = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.mousewheel.enable();
    }
  };

  const disableMousewheel = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.mousewheel.disable();
    }
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(
    null
  );

  //useEffect(() => {
  //  let ctx = gsap.context(() => {
  //    const container = containerRef.current;
  //    const sections = gsap.utils.toArray(".section");
  //
  //    // Horizontal scrolling with snapping
  //    gsap.to(sections, {
  //      xPercent: -100 * (sections.length - 1),
  //      ease: "none",
  //      scrollTrigger: {
  //        trigger: container,
  //        start: "top top",
  //        end: () => `+=${container!.offsetWidth}`,
  //        pin: true,
  //        scrub: 1,
  //        snap: {
  //          snapTo: 1 / (sections.length - 1),
  //          duration: 0.3,
  //          ease: "power1.inOut",
  //        },
  //        onUpdate: (self) => {
  //          const newIndex = Math.round(self.progress * (sections.length - 1));
  //          setActiveSectionIndex(newIndex);
  //        },
  //      },
  //    });
  //  }, containerRef);
  //
  //  return () => ctx.revert(); // Cleanup GSAP context on component unmount
  //}, []);

  //useEffect(() => {
  //  sections.forEach((_, i) => {
  //    const sidebar = document.getElementById(`sidebar-${i + 1}`);
  //    if (i === activeSectionIndex) {
  //      gsap.to(sidebar, { x: 0, opacity: 1, duration: 0.5 });
  //    } else {
  //      gsap.to(sidebar, { x: "-100%", opacity: 0, duration: 0.5 });
  //    }
  //  });
  //}, [activeSectionIndex]);

  // Function to run GSAP animation for the elements
  const runGsapAnimation = (swiper) => {
    // Get the current slide (swiper.activeIndex)
    const currentSlide = swiper.slides[swiper.activeIndex];

    // Select elements inside the current slide that you want to animate
    const firstAnimationElement = currentSlide.querySelector(
      ".first-animation-element"
    );
    const secondAnimationElement = currentSlide.querySelector(
      ".second-animation-element"
    );
    const thirdAnimationElement = currentSlide.querySelector(
      ".third-animation-element"
    );

    // Run GSAP animations
    gsap.fromTo(
      firstAnimationElement,
      { opacity: 0, x: 0, y: -300 },
      { opacity: 1, x: 0, y: 0, duration: 1 }
    );
    gsap.fromTo(
      secondAnimationElement,
      { opacity: 0, x: 0, y: "50%" },
      { opacity: 1, x: 0, y: 0, duration: 1, delay: 0.5 }
    );
    gsap.fromTo(
      thirdAnimationElement,
      { opacity: 0, x: 200, y: 0 },
      { opacity: 1, x: 0, y: 0, duration: 0.5, delay: 0.3 }
    );
  };
  useGSAP(() => {
    // Get the current slide (swiper.activeIndex)
    const swiper = swiperRef?.current?.swiper;

    const currentSlide = swiper.slides[swiper.activeIndex];

    // Select elements inside the current slide that you want to animate
    const firstAnimationElement = currentSlide.querySelector(
      ".first-animation-element"
    );
    const secondAnimationElement = currentSlide.querySelector(
      ".second-animation-element"
    );
    const thirdAnimationElement = currentSlide.querySelector(
      ".third-animation-element"
    );

    // Run GSAP animations
    gsap.fromTo(
      firstAnimationElement,
      { opacity: 0, x: 0, y: -300 },
      {
        //scrollTrigger: {
        //  trigger: "#swiperdiv",
        //  toggleActions: "restart reverse restart reverse",
        //  start: "top 50%",
        //  end: "bottom 50%",
        //},
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1,
      }
    );
    gsap.fromTo(
      secondAnimationElement,
      { opacity: 0, x: 0, y: "50%" },
      {
        //scrollTrigger: {
        //  trigger: "#swiperdiv",
        //  toggleActions: "restart reverse restart reverse",
        //  start: "top 50%",
        //  end: "bottom 50%",
        //},
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1,
        delay: 0.5,
      }
    );
    gsap.fromTo(
      thirdAnimationElement,
      { opacity: 0, x: 200, y: 0 },
      {
        //scrollTrigger: {
        //  trigger: "#swiperdiv",
        //  toggleActions: "restart reverse restart reverse",
        //  start: "top 50%",
        //  end: "bottom 50%",
        //},
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.5,
        delay: 0.3,
      }
    );
  });

  //useEffect(() => {
  //  // Run the GSAP animation when the component is first mounted
  //  if (swiperRef.current) {
  //    runGsapAnimation(swiperref.current.swiper);
  //  }
  //}, []);

  return (
    <Swiper
      ref={swiperRef}
      direction={"horizontal"}
      slidesPerView={1}
      spaceBetween={0}
      mousewheel={{
        enabled: true,
        thresholdDelta: 50,
        releaseOnEdges: true,
      }}
      modules={[Mousewheel]}
      onSlideChange={(swiper) => runGsapAnimation(swiper)}
      className="mySwiper w-screen h-screen"
      id="swiperdiv"
    >
      {sections.map((section, i) => (
        <SwiperSlide key={i} className="w-screen h-screen relative">
          <div className="flex flex-row">
            <div className="first-animation-element w-[40%] text-9xl text-custom-fg-light">
              {section.number}
            </div>
            <div className="third-animation-element w-[60%] text-2xl text-custom-white bg-custom-sdbar-light h-screen flex justify-center items-center px-8">
              <span className="second-animation-element h-max mt-[20%]">
                {section.detail}
              </span>
            </div>
          </div>

          <h1 className="second-animation-element text-custom-black text-6xl absolute top-[20%] left-[40%] transform -translate-x-[60%]">
            {section.heading}
          </h1>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HorizontalScrollComponent;
