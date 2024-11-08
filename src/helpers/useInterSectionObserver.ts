import { useState, useEffect, useRef, useCallback } from "react";

const useIntersectionObserver = (config) => {
  const {
    threshold = 0.5, // Default threshold
    onVisible, // Custom function to run when visible
    onLeave, // Optional custom function to run when element leaves view
    refName = "elementRef", // Custom name for ref
    boolName = "isVisible", // Custom name for boolean variable
  } = config;

  const [state, setState] = useState({ [boolName]: false });
  const [hasRun, setHasRun] = useState(false); // Track if onVisible has run during visibility
  const customRef = useRef(null);

  const handleVisible = useCallback(() => {
    if (onVisible && !hasRun) {
      onVisible();
      setHasRun(true);
    }
  }, [onVisible, hasRun]);

  const handleLeave = useCallback(() => {
    if (onLeave) {
      onLeave();
    }
    setHasRun(false); // Reset to allow onVisible to run again when visible
  }, [onLeave]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState((prevState) => ({ ...prevState, [boolName]: true }));
          handleVisible(); // Run onVisible if it hasn’t run during this visibility period
        } else {
          setState((prevState) => ({ ...prevState, [boolName]: false }));
          handleLeave(); // Run onLeave if defined
        }
      },
      { threshold }
    );

    if (customRef.current) {
      observer.observe(customRef.current);
    }

    return () => {
      if (customRef.current) {
        observer.unobserve(customRef.current);
      }
    };
  }, [threshold, boolName, handleVisible, handleLeave]);

  return { [refName]: customRef, [boolName]: state[boolName] };
};

export default useIntersectionObserver;
