import GIF from "gif.js"
import { loadImage } from "./load"
import { addText } from "./text"
import workerUrl from "./worker"

export interface Options {
  text?: string
  resizeToWidth?: number
  abortSignal?: AbortSignal
  step?: number
  delay?: number
}

export async function makeGifBlobUrl(
  frameUrls: string[],
  { text, abortSignal, resizeToWidth, step = 1, delay = 100 }: Options
) {
  const gif = new GIF({ workerScript: workerUrl })

  const imgs = await Promise.all(
    frameUrls.map(async (frameUrl) => {
      const img = await loadImage(frameUrl, resizeToWidth)
      if (text) {
        return addText(img, text)
      } else {
        return img
      }
    })
  )

  let i = 0
  for (const el of imgs) {
    if (i++ % step === 0) gif.addFrame(el, { delay })
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
