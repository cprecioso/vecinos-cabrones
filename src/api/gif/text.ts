import {
  Alignment,
  drawBlockLayout,
  layoutBlock,
  Origin,
} from "@cprecioso/canvas-text-layout"
import fontUrl from "file-loader?name=static/[hash].[ext]&publicPath=/_next/!./anhqv-font.ttf"

const font = (async () => {
  try {
    const font = new FontFace("anhqv", `url(${fontUrl})`)
    await font.load()
    document.fonts.add(font)
    return font.family
  } catch (err) {
    console.log(err)
    return "sans-serif"
  }
})()

export const addText = async (img: HTMLImageElement, text: string) => {
  const { naturalHeight: height, naturalWidth: width } = img

  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext("2d")!
  ctx.drawImage(img, 0, 0)

  const fontSize = 30
  ctx.font = `bold ${fontSize}px ${await font}`
  ctx.fillStyle = "white"
  ctx.lineWidth = 1.5
  ctx.strokeStyle = "black"
  ctx.textAlign = "left"

  const maxWidth = width * 0.9
  const block = layoutBlock(ctx, text, maxWidth, fontSize)

  drawBlockLayout(ctx, block, {
    x: 0,
    containerWidth: width,
    y: height * 0.9,
    origin: Origin.Bottom | Origin.Left,
    horizontalAlignment: Alignment.Middle,
    lineOptions: {
      horizontalAlignment: Alignment.Middle,
      drawFn: (ctx, line, options) => {
        ctx.fillText(line.text, options.x, options.y)
        ctx.strokeText(line.text, options.x, options.y)
      },
    },
  })

  return canvas
}
