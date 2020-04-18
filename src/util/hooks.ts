import React from "react"

export const useIsImageLoaded = () => {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const handleLoad = React.useCallback(() => {
    setIsLoaded(true)
  }, [])

  return { isLoaded, handleLoad }
}

export const useHovering = () => {
  const [isHovering, setIsHovering] = React.useState(false)
  const onEnter = React.useCallback(() => setIsHovering(true), [])
  const onLeave = React.useCallback(() => setIsHovering(false), [])

  return { isHovering, onEnter, onLeave }
}
