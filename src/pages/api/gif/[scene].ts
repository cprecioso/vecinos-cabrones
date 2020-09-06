import {
  Alignment,
  drawBlockLayout,
  layoutBlock,
  Origin,
} from "@cprecioso/canvas-text-layout"
import GIFEncoder from "gifencoder"
import { NextApiHandler } from "next"
import { Canvas, FontLibrary, loadImage } from "skia-canvas"
import { pipeline as _pipeline } from "stream"
import { promisify } from "util"
import { getFrames } from "../../../api/backend/frames"
import { getScene } from "../../../api/backend/scene/fetcher"

interface Params {
  scene: string
  preview?: ""
}

interface GifOptions {
  width: number
  height: number
  quality: number
  step: number
  delay: number
  text: boolean
}

const GIF_OPTIONS: Record<"full" | "preview", GifOptions> = {
  full: {
    width: 500,
    height: 375,
    quality: 10,
    step: 1,
    delay: 100,
    text: true,
  },
  preview: {
    width: 150,
    height: 112,
    quality: 5,
    step: 2,
    delay: 200,
    text: false,
  },
}

const [font] = FontLibrary.use("Asap", [
  "/Users/carlos/Development.localized/vercel-gif/AsapCondensed-Medium.ttf",
])
const pipeline = promisify(_pipeline)

export default (async (req, res) => {
  try {
    const params: Params = req.query as any
    const isPreview = params.preview === ""

    const gifOptions = GIF_OPTIONS[isPreview ? "preview" : "full"]

    const sceneId = Number.parseInt(params.scene, 10)

    if (Number.isNaN(sceneId)) throw new Error("Not a valid scene id")
    const scene = await getScene(sceneId)
    if (!scene) throw new Error("Scene not found")

    const frames = getFrames(scene).filter((_, i) => !(i % gifOptions.step))

    const canvae = (async function* () {
      for (const url of frames) {
        const img = await loadImage(url)

        const canvas = new Canvas(gifOptions.width, gifOptions.height)
        const ctx = canvas.getContext("2d")

        ctx.drawImage(img, 0, 0, gifOptions.width, gifOptions.height)

        if (gifOptions.text) {
          const fontSize = 32.5
          ctx.font = `${font.style} ${font.weight} ${fontSize}px ${font.family}`
          ctx.fillStyle = "white"
          ctx.lineWidth = 4
          ctx.strokeStyle = "black"
          ctx.textAlign = "left"

          const maxWidth = gifOptions.width * 0.9
          const block = layoutBlock(ctx, scene.text, maxWidth, fontSize)

          drawBlockLayout(ctx, block, {
            x: 0,
            containerWidth: gifOptions.width,
            y: gifOptions.height * 0.9,
            origin: Origin.Bottom | Origin.Left,
            horizontalAlignment: Alignment.Middle,
            lineOptions: {
              horizontalAlignment: Alignment.Middle,
              drawFn: (ctx, line, options) => {
                ctx.strokeText(line.text, options.x, options.y)
                ctx.fillText(line.text, options.x, options.y)
              },
            },
          })
        }

        yield ctx
      }
    })()

    const encoder = new GIFEncoder(gifOptions.width, gifOptions.height)
    res.setHeader("Content-Type", "image/gif")
    res.setHeader("Cache-Control", "max-age=31536000, public, immutable")
    await pipeline(
      // @ts-expect-error
      canvae,
      encoder.createWriteStream({
        repeat: 0,
        delay: gifOptions.delay,
        quality: gifOptions.quality,
      }),
      res
    )
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`)
  }
}) as NextApiHandler
