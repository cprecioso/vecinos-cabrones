import React from "react"
import { makeGifBlobUrl } from "../api/gif"
import { useQueue } from "./queue-context"

const withRetry = async <T>(times: number, fn: () => Promise<T>) => {
  let error
  while (times--) {
    try {
      return fn()
    } catch (e) {
      error = e
    }
  }
  throw error
}

export const useGif = (frameUrls: string[], load: boolean, text?: string) => {
  const [gifUrl, setGifUrl] = React.useState(undefined as string | undefined)
  const queue = useQueue()

  React.useEffect(() => {
    if (frameUrls) {
      return () => setGifUrl(undefined)
    }
  }, [frameUrls])

  React.useEffect(() => {
    if (gifUrl) {
      return () => URL.revokeObjectURL(gifUrl)
    }
  }, [gifUrl])

  const isLoading = load && !gifUrl

  React.useEffect(() => {
    if (isLoading) {
      const abortController = new AbortController()
      withRetry(3, async () =>
        queue.add(async () => {
          const blobUrl = await makeGifBlobUrl(
            frameUrls,
            text,
            abortController.signal
          )
          setGifUrl(blobUrl)
        })
      ).catch(console.error.bind(console, "Error"))
      return () => abortController.abort()
    }
  }, [isLoading, frameUrls, queue, text])

  return { gifUrl, isLoading }
}
