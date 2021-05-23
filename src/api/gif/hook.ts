import React from "react"
import type { Options } from "."
import { useFrames } from "../backend/frames"
import { Scene } from "../backend/types"
import { addToQueue } from "./queue"

/** OPTIONS NEED TO STAY CONSTANT */
export const useGif = (
  scene: Scene,
  options: Partial<Omit<Options, "abortSignal">>,
  wait = false
) => {
  const frames = useFrames(scene)

  // Keep GIF URL in memory
  const [gifUrl, setGifUrl] = React.useState(undefined as string | undefined)

  // Empty memory if we get another Scene or options
  React.useEffect(() => {
    if (scene.id) {
      return () => setGifUrl(undefined)
    }
  }, [scene.id])

  // Release the Object URL if we unmount or change GIF URL
  React.useEffect(() => {
    if (gifUrl) {
      return () => URL.revokeObjectURL(gifUrl)
    }
  }, [gifUrl])

  const needsToLoad = !wait && !gifUrl
  React.useEffect(() => {
    if (needsToLoad) {
      // Welcome to the amazing world of cancelling promises
      const abortController = new AbortController()

      addToQueue(
        async () => {
          const { makeGifBlobUrl } = await import(/* webpackMode: "lazy" */ ".")
          const blobUrl = await makeGifBlobUrl(frames, {
            ...options,
            abortSignal: abortController.signal,
          })
          setGifUrl(blobUrl)
        },
        3,
        abortController.signal
      ).catch(console.error.bind(console, "Error"))

      return () => abortController.abort()
    }
  }, [needsToLoad])

  return { gifUrl, isLoading: needsToLoad }
}
