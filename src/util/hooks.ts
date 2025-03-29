import { useCallback, useState } from "react";

export const useIsImageLoaded = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return { isLoaded, handleLoad };
};

export const useHovering = () => {
  const [isHovering, setIsHovering] = useState(false);
  const onEnter = useCallback(() => setIsHovering(true), []);
  const onLeave = useCallback(() => setIsHovering(false), []);

  return { isHovering, onEnter, onLeave };
};
