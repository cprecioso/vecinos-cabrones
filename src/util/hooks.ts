import { useCallback, useState, useSyncExternalStore } from "react";

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

export const useIsClient = useSyncExternalStore.bind(
  null,
  () => () => {},
  () => true,
  () => false,
) as () => boolean;
