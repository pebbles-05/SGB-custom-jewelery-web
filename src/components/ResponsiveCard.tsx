"use client";
import React, { useState, useRef, useEffect } from "react";

const ResponsiveCard = () => {
  const cardRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const fullText =
    "This is a big paragraph that contains a lot of words to demonstrate truncation behavior in a responsive card. Resize the card to see the effect.";
  const truncatedText =
    "This is a big paragraph that contains a lot of words...";

  useEffect(() => {
    const handleResize = () => {
      if (cardRef.current) {
        const cardWidth = cardRef.current.offsetWidth;
        setIsTruncated(cardWidth < 300); // Threshold for truncation
      }
    };

    // Attach resize observer
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="border border-gray-300 rounded-lg p-4 bg-gray-100 shadow-md resize overflow-auto w-[300px] min-w-[150px] max-w-full transition-all"
    >
      <p className="text-gray-700 text-base leading-relaxed">
        {isTruncated ? truncatedText : fullText}
      </p>
    </div>
  );
};

export default ResponsiveCard;
