import worker from "file-loader?name=static/[hash].worker.js&publicPath=/_next/!gif.js/dist/gif.worker.js"
import GIF from "gif.js"
import React from "react"

const loadImage = async (url: string) => {
  const img = document.createElement("img")
  try {
    await new Promise((fulfill, reject) => {
      img.onload = fulfill
      img.onerror = reject
      img.crossOrigin = "anonymous"
      img.src = url
    })
  } finally {
    img.onload = null
    img.onerror = null
  }
  return img
}

export default async function makeGifBlobUrl(
  frameUrls: string[],
  abortSignal?: AbortSignal
) {
  const gif = new GIF({ workerScript: worker })

  const imgs = await Promise.all(frameUrls.map(loadImage))

  for (const el of imgs) {
    gif.addFrame(el, { delay: 100 })
  }

  if (abortSignal?.aborted) throw new Error("Aborted")

  try {
    const blob = await new Promise<Blob>((fulfill, reject) => {
      gif.once("finished", (blob) => fulfill(blob))
      gif.once("abort", () => reject())
      gif.render()
    })
    return URL.createObjectURL(blob)
  } finally {
    gif.removeAllListeners()
  }
}

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

export const useGif = (frameUrls: string[], load: boolean) => {
  const [gifUrl, setGifUrl] = React.useState(undefined as string | undefined)
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
      withRetry(3, async () => {
        const blobUrl = await makeGifBlobUrl(frameUrls, abortController.signal)
        setGifUrl(blobUrl)
      }).catch(console.error.bind(console, "Error"))
      return () => abortController.abort()
    }
  }, [isLoading, frameUrls])

  return { gifUrl, isLoading }
}
