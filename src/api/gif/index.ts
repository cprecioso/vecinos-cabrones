import worker from "file-loader?name=static/[hash].worker.js&publicPath=/_next/!gif.js/dist/gif.worker.js"
import GIF from "gif.js"
import { loadImage } from "./load"
import { addText } from "./text"

export async function makeGifBlobUrl(
  frameUrls: string[],
  text?: string,
  abortSignal?: AbortSignal
) {
  const gif = new GIF({ workerScript: worker })

  const imgs = await Promise.all(
    frameUrls.map(async (frameUrl) => {
      const img = await loadImage(frameUrl)
      if (text) {
        return addText(img, text)
      } else {
        return img
      }
    })
  )

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
