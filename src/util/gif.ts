import worker from "file-loader?name=static/[hash].worker.js&publicPath=/_next/!gif.js/dist/gif.worker.js"
import GIF from "gif.js"
import React from "react"

export default async function makeGifBlobUrl(
  frameUrls: string[],
  abortSignal?: AbortSignal
) {
  const gif = new GIF({ workerScript: worker })

  const imgs = await Promise.all(
    frameUrls.map(async (url) => {
      const res = await fetch(url, { signal: abortSignal })
      const blob = await res.blob()
      const el = document.createElement("img")
      el.src = URL.createObjectURL(blob)
      return el
    })
  )

  for (const el of imgs) {
    gif.addFrame(el, { delay: 200 })
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

export const useGif = (frameUrls: string[], load: boolean) => {
  const [gifUrl, setGifUrl] = React.useState(undefined as string | undefined)
  React.useEffect(() => {
    if (gifUrl) {
      return () => URL.revokeObjectURL(gifUrl)
    }
  }, [gifUrl])

  const isLoading = load && !gifUrl

  React.useEffect(() => {
    if (isLoading) {
      const abortController = new AbortController()
      ;(async () => {
        try {
          const blobUrl = await makeGifBlobUrl(
            frameUrls,
            abortController.signal
          )
          setGifUrl(blobUrl)
        } catch (err) {
          console.error(err)
        }
      })()
      return () => abortController.abort()
    }
  }, [isLoading])

  return { gifUrl, isLoading }
}
