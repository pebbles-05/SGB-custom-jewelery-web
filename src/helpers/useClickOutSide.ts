import { useEffect, useRef } from "react";

type ClickOutsideHandler = (event: MouseEvent) => void;

const useClickOutside = (handler: ClickOutsideHandler) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Define the click event listener
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click happened outside the referenced element
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event); // Trigger the handler when clicked outside
      }
    };

    // Attach the event listener to the document
    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handler]); // Re-run effect if handler changes

  return ref; // Return the ref so it can be attached to a component
};

export default useClickOutside;
