import {
  Alignment,
  drawBlockLayout,
  layoutBlock,
  Origin,
} from "@cprecioso/canvas-text-layout"
import font from "./font"

export const addText = async (canvas: HTMLCanvasElement, text: string) => {
  const { height, width } = canvas

  const ctx = canvas.getContext("2d")!

  const fontSize = 32.5
  ctx.font = `${fontSize}px ${await font}`
  ctx.fillStyle = "white"
  ctx.lineWidth = 4
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
        ctx.strokeText(line.text, options.x, options.y)
        ctx.fillText(line.text, options.x, options.y)
      },
    },
  })

  return canvas
}
