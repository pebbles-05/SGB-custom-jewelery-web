"use client"




import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
  number: string;
  heading: string;
  detail: string;
}

const sections: SectionProps[] = [
  { number: "01", heading: "Talk About It", detail: "Discuss design ideas, options, budget, with me - your guide to the custom experience.Or browse in our store area to select your Ornaments." },
  { number: "02", heading: "Get It Designed", detail: "Provide your idea for the handmade jewelry or crafts with oxidised or other materials ( eg. Clay, cloth) from the Customize button at the top. Or select our pre made designs from the store and add them to cart." },
  { number: "03", heading: "See It Come To Life", detail: "Place your order by contacting via place order button using your Number( for contact) address ( for delivery )  and any choice of your social media ( Whatsapp , Facebook , Instagram) for further consult and discussion " },
  { number: "04", heading: "Treasure It", detail: "Receive your custom piece, as it is a precious one as you are to us, Thank You." },
];

const HorizontalScrollComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const container = containerRef.current;
      const sections = gsap.utils.toArray(".section");

      // Horizontal scrolling with snapping
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${container!.offsetWidth}`,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: 0.3,
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            const newIndex = Math.round(self.progress * (sections.length - 1));
            setActiveSectionIndex(newIndex);
          },
        },
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup GSAP context on component unmount
  }, []);

  useEffect(() => {
    sections.forEach((_, i) => {
      const sidebar = document.getElementById(`sidebar-${i + 1}`);
      if (i === activeSectionIndex) {
        gsap.to(sidebar, { x: 0, opacity: 1, duration: 0.01 });
      } else {
        gsap.to(sidebar, { x: "-100%", opacity: 0, duration: 0.01 });
      }
    });
  }, [activeSectionIndex]);

  return (
    <div className="overflow-hidden" ref={containerRef}>
      <div className="flex h-screen w-[400vw]">
        {sections.map((section, i) => (
          <div
            key={i}
            className="section flex w-screen items-center justify-center relative bg-custom-bg-light text-custom-black"
          >
            {/* Left Sidebar */}
            <div
              id={`sidebar-${i + 1}`}
              className="absolute left-0 w-2/3 h-full flex items-center p-8 bg-custom-sdbar-light shadow-lg transform -translate-x-full opacity-0 transition-all duration-500"
            >
              <div className="text-2xl absolute top-1/2 ml-8 left-0 w-2/3">{section.detail}</div>
            </div>

            {/* Right Content */}
            <div className="w-1/3 flex flex-col items-center">
              <div className="text-9xl text-custom-fg-light font-bold opacity-100 absolute top-1/4 left-w/3 transform -translate-x-1/2">
                {section.number}
              </div>
              <h2 className="absolute left-2/3 text-5xl font-bold mb-8">{section.heading}</h2>
              {/* <p className="text-xl px-16 text-center">{section.detail}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScrollComponent;
