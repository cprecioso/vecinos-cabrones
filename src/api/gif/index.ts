import GifEncoder from "gif-encoder-2"
import { loadImage } from "./image"
import { addText } from "./text"

export interface Options {
  text?: string
  step?: number
  delay?: number
}

export async function makeGifStream(
  frameUrls: string[],
  { text, step = 1, delay = 100 }: Options
) {
  const surfaces = frameUrls.map(async (frameUrl) => {
    const surface = await loadImage(frameUrl)
    if (text) {
      return addText(surface, text)
    } else {
      return surface
    }
  })

  const firstImage = await surfaces[0]

  const gif = new GifEncoder(
    firstImage.width(),
    firstImage.height(),
    "neuquant",
    true,
    frameUrls.length
  )
  gif.setDelay(delay)

  void (async () => {
    gif.start()
    let i = 0
    for (const surface of surfaces) {
      if (i++ % step === 0) {
        const s = await surface
        const info = s.imageInfo()
        const canvas = s.getCanvas()
        const pixels = canvas.readPixels(0, 0, info)
        gif.addFrame(pixels as any)
      }
    }
    gif.finish()
  })()

  return gif.createReadStream()
}
